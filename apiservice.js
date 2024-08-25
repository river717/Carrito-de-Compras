//Cargar contenido en el DOM
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');

    // Función para obtener los productos de la API
    async function fetchProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();

            // Renderizar los productos de la api en la interfaz
            products.forEach(product => {

                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>$${product.price}</p>
                `;
                productsContainer.appendChild(productCard);
            });
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }
    fetchProducts();
});