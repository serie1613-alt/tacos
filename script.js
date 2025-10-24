// Carrito de compras
let cart = [];

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Función para agregar items al carrito
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartCount();
    
    // Mostrar notificación
    Swal.fire({
        title: '¡Agregado al carrito!',
        text: `${name} ha sido agregado a tu carrito`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
}

// Función para mostrar el carrito
function showCart() {
    if (cart.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'No hay productos en tu carrito',
            icon: 'info'
        });
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let cartHTML = '<div class="space-y-4">';
    cart.forEach(item => {
        cartHTML += `
            <div class="flex justify-between items-center">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)} MXN</span>
            </div>
        `;
    });
    cartHTML += `
        <div class="border-t pt-4 mt-4">
            <div class="flex justify-between items-center font-bold">
                <span>Total:</span>
                <span>$${total.toFixed(2)} MXN</span>
            </div>
        </div>
    </div>`;

    Swal.fire({
        title: 'Tu Carrito',
        html: cartHTML,
        showCancelButton: true,
        confirmButtonText: 'Realizar Pedido',
        cancelButtonText: 'Cerrar',
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#EF4444'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡Pedido Realizado!',
                text: 'Gracias por tu compra',
                icon: 'success'
            });
            cart = [];
            updateCartCount();
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Botones de agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            addToCart(name, price);
        });
    });

    // Botón del carrito
    document.getElementById('cartButton').addEventListener('click', showCart);
});