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
        
       /* function renderProducts() {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('col-md-3', 'mb-4'); 
        
                productElement.innerHTML = `
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text"><strong>Precio: $${product.price}</strong></p>
                            <button class="btn btn-custom mt-auto" onclick="addToCart(${product.id})">Agregar al carrito</button>
                        </div>
                    </div>
                `;        
                productList.appendChild(productElement);
            });
        }

        // Función para filtrar productos por título
            function searchProducts() {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            console.log('Término de búsqueda:', searchTerm);//prueba
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm)
            ); 
            console.log('Productos filtrados:', filteredProducts); // prueba los productos filtrados
            renderProducts(filteredProducts);
            }   

           // Añadir el evento de clic al botón de búsqueda
        document.getElementById('search').addEventListener('click', searchProducts);

            // Llamada inicial para obtener productos cuando se carga la página
            fetchProducts();
            */

            function renderProducts(filteredProducts = products) {
                const productList = document.getElementById('product-list');
                productList.innerHTML = ''; // Limpiar la lista de productos
                
                if (filteredProducts.length === 0) {
                    productList.innerHTML = '<p>No se encontraron productos.</p>'; // Mensaje si no hay productos que coincidan con la búsqueda
                    return;
                }
            
                filteredProducts.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('col-md-3', 'mb-4');
            
                    productElement.innerHTML = `
                        <div class="card h-100">
                            <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text"><strong>Precio: $${product.price}</strong></p>
                                <button class="btn btn-custom mt-auto" onclick="addToCart(${product.id})">Agregar al carrito</button>
                            </div>
                        </div>
                    `;
                    productList.appendChild(productElement);
                });
            }
            
            // Función para filtrar productos por título
            function searchProducts() {
                const searchTerm = document.getElementById('search-input').value.toLowerCase();
                console.log('Término de búsqueda:', searchTerm); // Verifica el término de búsqueda
            
                const filteredProducts = products.filter(product => 
                    product.title.toLowerCase().includes(searchTerm)
                );
                console.log('Productos filtrados:', filteredProducts); // Verifica los productos filtrados
            
                renderProducts(filteredProducts); // Renderizar productos filtrados
            }
            
            // Añadir el evento de clic al botón de búsqueda
            document.getElementById('search').addEventListener('click', searchProducts);
            
            // Llamada inicial para obtener productos cuando se carga la página
            fetchProducts();

// 55 - 101
        
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
        
        /*funcion para generar la factura*/
        function generateInvoice() {
            const invoiceContent = document.getElementById('invoiceContent');
            invoiceContent.innerHTML = '';  // Limpiar el contenido anterior
            let total = 0;
        
            let invoiceHTML = `
                <h4>Detalle de la compra</h4>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Cantidad</th>
                            <th>Producto</th>
                            <th>Precio Unitario</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
        
            cart.forEach(item => {
                const totalItemPrice = item.price * item.quantity;
                total += totalItemPrice;
                invoiceHTML += `
                    <tr>
                        <td>${item.quantity}</td>
                        <td>${item.title}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>$${totalItemPrice.toFixed(2)}</td>
                    </tr>
                `;
            });
        
            const iva = total * 0.13; // IVA del 13%
            const totalWithTax = total + iva;
        
            invoiceHTML += `
                    </tbody>
                </table>
                <hr>
                <div class="d-flex justify-content-between border-bottom pb-2">
                    <h5>Total antes de IVA:</h5>
                    <h5>$${total.toFixed(2)}</h5>
                </div>
                <div class="d-flex justify-content-between border-bottom pb-2">
                    <h5>IVA (13%):</h5>
                    <h5>$${iva.toFixed(2)}</h5>
                </div>
                <div class="d-flex justify-content-between border-bottom pb-2">
                    <h4>Total con impuesto:</h4>
                    <h4>$${totalWithTax.toFixed(2)}</h4>
                </div>
            `;
        
            // Asigna el HTML generado al contenedor del modal
            invoiceContent.innerHTML = invoiceHTML;
            // Mostrar el modal de la factura
            const invoiceModal = new bootstrap.Modal(document.getElementById('invoiceModal'));
            invoiceModal.show();
        }       
        function pagar() {
            // Limpiar el carrito
            cart = [];
            
            // Volver a renderizar el carrito para mostrar que está vacío
            renderCart();
            // Mostrar un mensaje de confirmación o realizar otras acciones adicionales
            alert("Gracias por su compra. El carrito ha sido limpiados.");
        }
        
        






        
        /*esta funcion no esta haciendo nada
        function continueShopping() {
            document.getElementById('generateInvoice').innerHTML = '';
            renderProducts();
        }
        /*
        // Función para alternar la visibilidad del carrito
        /*function toggleCart() {
            const cart = document.getElementById('shopping-cart');
            cart.classList.toggle('visible');
        }   */     
            
        // Inicializa la lista de productos al cargar la página
        window.onload = fetchProducts;
        
