import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector("[data-formulario]")

async function crearProducto(evento) {

    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;
    // Esperamos el último ID para incrementarlo
    const ultimoID = await conseguirUltimoID();//primero se genera una constante con este valor para poder utilizarlo despues
    const nuevoID = ultimoID + 1; //Aqui se genera nuestro nuevo ID

    await conexionAPI.enviarProducto(nombre, precio, imagen);

    window.location.href = "../pages/envioExitoso.html";
}

async function conseguirUltimoID() {
    // Realizamos la solicitud GET sin un cuerpo de solicitud
    const conexion = await fetch("http://localhost:3001/productos", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    // Convertimos la respuesta a JSON
    const productos = await conexion.json();
    // Obtenemos el último producto en la lista y su ID
    const ultimoProducto = productos[productos.length - 1];
    const ultimoID = ultimoProducto ? ultimoProducto.id : 0; // Si no hay productos, el ID será 0

    return ultimoID;
}

formulario.addEventListener("submit", evento => crearProducto(evento));