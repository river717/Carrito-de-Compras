let products = [];
let cart = [];


// Función para obtener productos desde una API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products'); // URL de la API
                products = await response.json();
                renderProducts();
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                const productList = document.getElementById('product-list');
                productList.innerHTML = '<p>Error al cargar los productos. Inténtalo de nuevo más tarde.</p>';
            }
        }
        
        function renderProducts() {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-card');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <p>Precio: $${product.price}</p>x
                    <button onclick="addToCart(${product.id})">Agregar al carrito</button>
                `;
                productList.appendChild(productElement);
            });
        }
        
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
             const cartItem = cart.find(item => item.id === productId);
        
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
        
            renderCart();
        }
        
        function renderCart() {
            const cartContent = document.getElementById('cart-content');
            cartContent.innerHTML = '';
            let total = 0;
        
            cart.forEach(item => {
                const totalItemPrice = item.price * item.quantity;
                total += totalItemPrice;
                const cartItemElement = document.createElement('div');
                cartItemElement.innerHTML = `
                    <div>
                        <h4>${item.title}</h4>
                        <p>Cantidad: ${item.quantity}</p>
                        <p>Total: $${totalItemPrice}</p>
                        <button onclick="removeFromCart(${item.id})">Eliminar</button>
                    </div>
                `;
                cartContent.appendChild(cartItemElement);
            });
        
            cartContent.innerHTML += `<h3>Total General: $${total}</h3>`;
        }
        
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            renderCart();
        }
        
       function generateInvoice() {
            const invoiceElement = document.getElementById('invoice');
            invoiceElement.innerHTML = '';
            let total = 0;
        
            cart.forEach(item => {
                const totalItemPrice = item.price * item.quantity;
                total += totalItemPrice;
                invoiceElement.innerHTML += `
                    <p>${item.title} - ${item.quantity} x $${item.price} = $${totalItemPrice}</p>
                `;
            });
        
            const iva = total * 0.13; // IVA
            const totalWithTax = total + iva;
        
            invoiceElement.innerHTML += `
                <h3>Total: $${total}</h3>
                <h3>IVA (13%): $${iva.toFixed(2)}</h3>
                <h2>Total con impuesto: $${totalWithTax.toFixed(2)}</h2>
            `;
        
            cart = [];
            renderCart();
        }
        
        function continueShopping() {
            document.getElementById('invoice').innerHTML = '';
            renderProducts();
        }
        
        // Función para alternar la visibilidad del carrito
        /*function toggleCart() {
            const cart = document.getElementById('shopping-cart');
            cart.classList.toggle('visible');
        }   */     
            
        // Inicializa la lista de productos al cargar la página
        window.onload = fetchProducts;
        
