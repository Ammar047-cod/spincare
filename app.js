/* ============================================================
   SpinCare.pk — App Logic
   Images embedded via images.js — zero path dependency
   ============================================================ */

const PRODUCTS = [
  {
    id: 1, name: 'PosturePro Elite', tag: 'Office Comfort', badge: 'Best Seller',
    price: 3499, oldPrice: 4500, color: '#6b7ea8', reviews: 428,
    description: 'Designed for 8+ hours of office use. Memory foam padding, breathable outer fabric and skin-friendly mesh lining.',
    features: ['1-inch memory foam padding','Breathable outer fabric','Skin-friendly mesh lining','All-day support (8+ hrs)','Adjustable straps'],
    get image(){ return IMAGES['p1_thumb']; },
    get detailImages(){ return [IMAGES['p1_detail1'],IMAGES['p1_detail2'],IMAGES['p1_detail3']]; }
  },
  {
    id: 2, name: 'AthleticX Pro', tag: 'Sport Performance', badge: 'New',
    price: 4299, oldPrice: 5500, color: '#c0392b', reviews: 214,
    description: 'Shoulder retraction, lumbar support and core activation — for weightlifting, running, cycling and yoga.',
    features: ['Shoulder retraction system','Lumbar support zone','Core activation panel','For weightlifting, running & yoga','Sport-grade fabric'],
    get image(){ return IMAGES['p2_thumb']; },
    get detailImages(){ return [IMAGES['p2_detail1'],IMAGES['p2_detail2'],IMAGES['p2_detail3']]; }
  },
  {
    id: 3, name: 'SlimFit Corrector', tag: 'Invisible Fit', badge: null,
    price: 2799, oldPrice: null, color: '#4a4a4a', reviews: 312,
    description: 'Ultra-slim dark mesh brace worn under clothing. Breathable, lightweight, skin-friendly — invisible under a dress shirt.',
    features: ['Invisible under clothing','Breathable lightweight mesh','Skin-friendly material','Posture correction','Ideal for office professionals'],
    get image(){ return IMAGES['p3_thumb']; },
    get detailImages(){ return [IMAGES['p3_detail1'],IMAGES['p3_detail2'],IMAGES['p3_detail3']]; }
  },
  {
    id: 4, name: "Women's ComfortFit", tag: "Women's Edition", badge: null,
    price: 2999, oldPrice: 3800, color: '#c9a87c', reviews: 189,
    description: 'Nude/beige breathable mesh brace designed for women. Disappears under any outfit while correcting posture all day.',
    features: ["Women's ergonomic design",'Nude/beige — hidden under clothes','Breathable lightweight mesh','Skin-friendly & soft','Adjustable for all body types'],
    get image(){ return IMAGES['p4_thumb']; },
    get detailImages(){ return [IMAGES['p4_detail1'],IMAGES['p4_detail2'],IMAGES['p4_detail3']]; }
  },
  {
    id: 5, name: 'SmartPosture AI', tag: 'Smart Tech', badge: 'Premium',
    price: 7999, oldPrice: 10000, color: '#1a1a2e', reviews: 97,
    description: 'Real-time posture detection with app connectivity, high-precision motion chip and USB-C rechargeable battery.',
    features: ['Real-time posture detection','High-precision motion chip','USB-C rechargeable (2-hr battery)','Removable sensor module','App-connected tracking'],
    get image(){ return IMAGES['p5_thumb']; },
    get detailImages(){ return [IMAGES['p5_detail1'],IMAGES['p5_detail2'],IMAGES['p5_detail3']]; }
  },
  {
    id: 6, name: 'LumbarPro Belt', tag: 'Lower Back', badge: null,
    price: 3199, oldPrice: 4000, color: '#2c3e50', reviews: 275,
    description: 'Medical-grade lumbar support with 5:1 pulley system. Dynamic compression with even pressure distribution.',
    features: ['5:1 pulley system','Dynamic compression','Even pressure distribution','S/M/L/XL (28"–48")','Great for standing desks'],
    get image(){ return IMAGES['p6_thumb']; },
    get detailImages(){ return [IMAGES['p6_detail1'],IMAGES['p6_detail2'],IMAGES['p6_detail3']]; }
  }
];

function getCart(){ return JSON.parse(localStorage.getItem('pp_cart')||'[]'); }
function saveCart(c){ localStorage.setItem('pp_cart',JSON.stringify(c)); }

function addToCart(product, qty=1){
  const cart = getCart();
  const existing = cart.find(i=>i.id===product.id && i.size===product.size);
  if(existing){ existing.qty=(existing.qty||1)+qty; }
  else{ cart.push({id:product.id,name:product.name,price:product.price,color:product.color,tag:product.tag,size:product.size||'M',qty,image:product.image}); }
  saveCart(cart); updateCartCount();
}

function updateCartCount(){
  const total = getCart().reduce((s,i)=>s+(i.qty||1),0);
  document.querySelectorAll('#cartCount').forEach(el=>{ el.textContent=total; el.classList.add('bump'); setTimeout(()=>el.classList.remove('bump'),200); });
}

function openCart(){ renderCartItems(); document.getElementById('cartOverlay')?.classList.add('open'); document.getElementById('cartSidebar')?.classList.add('open'); document.body.style.overflow='hidden'; }
function closeCart(){ document.getElementById('cartOverlay')?.classList.remove('open'); document.getElementById('cartSidebar')?.classList.remove('open'); document.body.style.overflow=''; }

function renderCartItems(){
  const cart=getCart(); const container=document.getElementById('cartItems'); const footer=document.getElementById('cartFooter');
  if(!container) return;
  if(cart.length===0){
    container.innerHTML=`<div class="cart-empty"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><p>Your cart is empty</p></div>`;
    if(footer) footer.style.display='none'; return;
  }
  let total=0;
  container.innerHTML=cart.map((item,idx)=>{ const lt=item.price*(item.qty||1); total+=lt;
    return `<div class="cart-item"><div class="ci-img" style="background:#f5f0ea;border-radius:8px;overflow:hidden;width:60px;height:60px;flex-shrink:0;"><img src="${item.image||''}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;"/></div><div class="ci-info"><p class="ci-name">${item.name}</p><p class="ci-size">Size: ${item.size||'M'} × ${item.qty||1}</p><p class="ci-price">Rs. ${lt.toLocaleString()}</p></div><button class="ci-remove" onclick="removeFromCart(${idx})">✕</button></div>`;
  }).join('');
  if(footer){ footer.style.display='block'; document.getElementById('cartTotal').textContent=`Rs. ${total.toLocaleString()}`; }
}

function removeFromCart(index){ const cart=getCart(); cart.splice(index,1); saveCart(cart); updateCartCount(); renderCartItems(); }
function checkoutFromCart(){ closeCart(); window.location.href='checkout.html'; }

function renderProducts(){
  const grid=document.getElementById('productsGrid'); if(!grid) return;
  grid.innerHTML=PRODUCTS.map(p=>`
    <div class="product-card" onclick="window.location.href='product.html?id=${p.id}'">
      ${p.badge?`<span class="badge-hot">${p.badge}</span>`:''}
      <div class="pc-image"><div class="pc-img-inner"><img src="${p.image}" alt="${p.name}" /></div></div>
      <div class="pc-body">
        <div class="pc-top"><span class="product-tag" style="background:${p.color}20;color:${p.color}">${p.tag}</span><span class="pc-rating">★★★★★ <span>(${p.reviews})</span></span></div>
        <h3 class="pc-name">${p.name}</h3><p class="pc-desc">${p.description}</p>
      </div>
      <div class="pc-footer">
        <div class="pc-price"><strong>Rs. ${p.price.toLocaleString()}</strong>${p.oldPrice?`<s>Rs. ${p.oldPrice.toLocaleString()}</s>`:''}</div>
        <div class="pc-actions"><button class="pc-buy" onclick="event.stopPropagation();buyNow(${p.id})">Buy Now</button><button class="pc-cart" onclick="event.stopPropagation();quickAddToCart(${p.id})">+ Cart</button></div>
      </div>
    </div>`).join('');
}

function buyNow(id){
  const p=PRODUCTS.find(p=>p.id===id);
  localStorage.setItem('buyNowItems',JSON.stringify([{id:p.id,name:p.name,price:p.price,image:p.image,size:'M',qty:1}]));
  window.location.href='checkout.html?mode=buynow';
}

function quickAddToCart(id){ const p=PRODUCTS.find(p=>p.id===id); addToCart({...p,size:'M'},1); showToast(`${p.name} added to cart!`); }

function showToast(msg){
  let t=document.getElementById('globalToast');
  if(!t){ t=document.createElement('div'); t.id='globalToast'; t.style.cssText='position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--cream);padding:0.75rem 1.5rem;border-radius:100px;font-size:0.85rem;font-weight:500;z-index:9999;opacity:0;transition:opacity 0.3s;pointer-events:none;white-space:nowrap'; document.body.appendChild(t); }
  t.textContent=msg; t.style.opacity='1'; clearTimeout(t._timeout); t._timeout=setTimeout(()=>t.style.opacity='0',2500);
}

window.addEventListener('scroll',()=>{ const nav=document.getElementById('navbar'); if(nav) nav.classList.toggle('scrolled',window.scrollY>40); });
function toggleMenu(){ document.getElementById('navLinks')?.classList.toggle('open'); }
function sendOrderEmail(o){ console.log('Order:',o); }
window.addEventListener('DOMContentLoaded',()=>{ updateCartCount(); renderProducts(); });
