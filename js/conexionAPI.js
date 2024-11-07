async function listarProductos() {
    const conexion = await fetch("http://localhost:3001/productos");

    const conexionConvertida = conexion.json(); //la funcion es convertida en un objeto json

    //console.log(conexionConvertida);
    return conexionConvertida 
}

async function enviarProducto (nombre,precio,imagen){
    //enviarProducto función asíncrona, pero en este caso realiza una petición POST para enviar un nuevo producto al servidor
    const conexion = await fetch("http://localhost:3001/productos",{
        method:"POST",
        headers:{"Content-type":"aplication/json"},//indica que el cuerpo de la solicitud será un JSON
        body:JSON.stringify
        //body: JSON.stringify(...) convierte los datos (nombre, precio, imagen) en una cadena JSON para enviarlos al servidor
        ({
            nombre:nombre,
            precio:precio,
            imagen:imagen
        }) 
    })
    const conexionConvertida = conexion.json();

    return conexionConvertida;
}

async function eliminarProducto(id) {
    const conexion = await fetch(`http://localhost:3001/productos/${id}`, {
        method: "DELETE"
    });
    return conexion;
}

export const conexionAPI = {
    listarProductos, 
    enviarProducto, 
    eliminarProducto
};
//listarProductos();