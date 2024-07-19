// El código inicializa el carrito desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.getElementById('cart-counter');
    let count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCounter.textContent = count;
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const confirmBtn = document.querySelector('.confirm-btn');

    // Los botones de clase .cart-btn permiten añadir productos al carrito y muestran una alerta de confirmación
    const cartBtns = document.querySelectorAll('.cart-btn');
    cartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            alert('Producto añadido al carrito');
            e.preventDefault();
            const productName = btn.getAttribute('data-name');
            const productPrice = parseFloat(btn.getAttribute('data-price'));
            addToCart(productName, productPrice);
        });
    });

    // Muestra una alerta de compra realizada, envía los datos al servidor, limpia el carrito y redirige a la página de pago
    confirmBtn?.addEventListener('click', async () => {
        if (cart.length > 0) {
            try {
                const response = await fetch('registrar_compra.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cart)
                });
                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    // Generar detalles de pago
                    const amount = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
                    const cipCode = generateCIPCode();
                    const deadline = generateDeadline();
                    // Redirigir a la nueva página de pago
                    window.location.href = `pago.html?cip=${cipCode}&amount=${amount}&deadline=${encodeURIComponent(deadline)}`;
                    // Limpiar carrito
                    localStorage.removeItem('cart');
                    updateCartDisplay();
                } else {
                    alert(result.error);
                }
            } catch (error) {
                alert('Error al conectar con el servidor');
            }
        } else {
            alert('El carrito está vacío');
        }
    });

    // Agrega productos al carrito y actualiza localStorage
    function addToCart(name, price) {
        const product = cart.find(item => item.name === name);
        if (product) {
            product.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        count++;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartCount', count);
        cartCounter.textContent = count;
        updateCartDisplay();
    }

    // Aumenta la cantidad de un producto en el carrito
    function increaseQuantity(name) {
        const product = cart.find(item => item.name === name);
        if (product) {
            product.quantity++;
            count++;
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('cartCount', count);
            cartCounter.textContent = count;
            updateCartDisplay();
        }
    }

    // Disminuye la cantidad de un producto en el carrito
    function decreaseQuantity(name) {
        const product = cart.find(item => item.name === name);
        if (product && product.quantity > 1) {
            product.quantity--;
            count--;
        } else {
            removeFromCart(name);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartCount', count);
        cartCounter.textContent = count;
        updateCartDisplay();
    }

    // Elimina un producto del carrito
    function removeFromCart(name) {
        const productIndex = cart.findIndex(item => item.name === name);
        if (productIndex !== -1) {
            count -= cart[productIndex].quantity;
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('cartCount', count);
            cartCounter.textContent = count;
            updateCartDisplay();
        }
    }

    // Actualiza visualmente el contenido del carrito en la interfaz
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h4>${item.name} x${item.quantity}</h4>
                <span>s/${itemTotal.toFixed(2)}</span>
                <button class="increase-btn" data-name="${item.name}">+</button>
                <button class="decrease-btn" data-name="${item.name}">-</button>
                <button class="remove-btn" data-name="${item.name}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        totalPriceElement.textContent = `s/${total.toFixed(2)}`;

        // Añadir eventos a los botones de aumento, disminución y eliminación
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productName = btn.getAttribute('data-name');
                increaseQuantity(productName);
            });
        });

        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productName = btn.getAttribute('data-name');
                decreaseQuantity(productName);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productName = btn.getAttribute('data-name');
                removeFromCart(productName);
            });
        });
    }

    // Generar un código CIP aleatorio
    function generateCIPCode() {
        return Math.floor(100000000 + Math.random() * 900000000).toString();
    }

    // Generar una fecha límite para el pago
    function generateDeadline() {
        const now = new Date();
        now.setDate(now.getDate() + 7);
        const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return now.toLocaleDateString('es-ES', options);
    }

    updateCartDisplay();
});
