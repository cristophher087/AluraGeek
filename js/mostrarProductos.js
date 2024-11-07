import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-productos]")

function crearCard(nombre, precio, imagen, id) {
    const producto = document.createElement("li");
    producto.className = "product-card";
    producto.innerHTML = `<img src="${imagen}" alt="Stormtrooper">
    <p class="product-name">${nombre}</p>
    <p class="product-price">${precio}</p>
    <button class="delete-btn">🗑️</button>`;

    // Seleccionar el botón de eliminación y agregar el evento de clic
    const deleteButton = producto.querySelector(".delete-btn");
    deleteButton.addEventListener("click", async () => {
        await conexionAPI.eliminarProducto(id); // Llamada para eliminar producto en la API
        producto.remove(); // Eliminar el elemento del DOM
    });

    return producto;
}

async function listarProductos() {
    try {
        const listAPI = await conexionAPI.listarProductos();

        listAPI.forEach(producto => lista.appendChild(crearCard(producto.nombre, producto.precio, producto.imagen, producto.id)));  
    } catch {
        listAPI.innerHTML=`<h2 class = "mensaje_titulo">Ha ocurrido un problema con la conexion :c </h2>`;
    }
    
    
}

listarProductos()