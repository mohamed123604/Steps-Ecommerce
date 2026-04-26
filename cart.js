function getCart() {
    return JSON.parse(localStorage.getItem('stepsCart')) || [];
}


function saveCart(cart) {
    localStorage.setItem('stepsCart', JSON.stringify(cart));
}
 


function addToCart(product) {
    let cart = getCart();
    let existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;                    
    } else {
        cart.push({ ...product, qty: 1 });    
    }

    saveCart(cart);
    updateCartBadge();     
    showToast(product.name);  
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
}

function changeQty(id, delta) {
    let cart = getCart();
    let item = cart.find(i => i.id === id);

    if (!item) return;        
    item.qty += delta;

    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);  
    }

    saveCart(cart);
}


function updateCartBadge() {
    let cart = getCart();
    let totalQty = cart.reduce((acc, item) => acc + item.qty, 0);

    let badge = document.getElementById('cart-badge');
    if (!badge) return;   

    badge.textContent = totalQty;

    if (totalQty === 0) {
        badge.classList.add('hidden');
    } else {
        badge.classList.remove('hidden');
    }
}

function showToast(productName) {
    let toast = document.createElement('div');

    toast.className = [
        'fixed', 'bottom-6', 'right-6', 'z-[200]',
        'bg-black', 'text-white', 'border', 'border-white/20',
        'px-5', 'py-3', 'rounded-lg', 'text-sm', 'font-semibold',
        'flex', 'items-center', 'gap-3',
        'shadow-2xl',
        'transition-all', 'duration-500',
        'translate-y-0', 'opacity-100'
    ].join(' ');

    toast.innerHTML = `
        <span class="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center shrink-0">
            <i class="fa fa-check text-black text-[10px]"></i>
        </span>
        <span><strong>${productName}</strong> added to cart</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}
updateCartBadge();