
// Clase Producto

class Producto {

    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    mostrarPrecio() {
        return `$${this.precio.toLocaleString("es-CO")}`;
    }
}


// Array inicial de productos

const productosIniciales = [
    new Producto(1, "Detergente", 12000, 20),
    new Producto(2, "Desinfectante", 15000, 15),
    new Producto(3, "Limpiavidrios", 10000, 10)
];


// Array de productos

let productos = [];


// Selección de elementos del DOM

const formulario = document.querySelector("#formulario-producto");

const inputNombre = document.querySelector("#nombre");

const inputPrecio = document.querySelector("#precio");

const inputStock = document.querySelector("#stock");

const contenedorProductos = document.querySelector("#contenedor-productos");

const buscador = document.querySelector("#buscador");

const mensaje = document.querySelector("#mensaje");


// Control del temporizador de mensajes

let temporizadorMensaje;


// Función para mostrar mensajes

function mostrarMensaje(texto, tipo) {

    clearTimeout(temporizadorMensaje);

    mensaje.innerHTML = `
        <div class="${tipo}">
            ${texto}
        </div>
    `;

    temporizadorMensaje = setTimeout(() => {
        mensaje.innerHTML = "";
    }, 3000);
}


// Temporizador: mostrar información unos segundos después de ingresar

setTimeout(() => {

    mostrarMensaje(
        "Recordatorio: revisa los niveles de stock para mantener tus productos actualizados.",
        "mensaje-info"
    );

}, 5000);


// Función para obtener productos mediante una Promise

function obtenerProductos() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            try {

                // Recuperar los datos del localStorage

                const productosGuardados = JSON.parse(
                    localStorage.getItem("productos") ?? "null"
                ) ?? productosIniciales;


                // Convertir los objetos recuperados en instancias de Producto

                const productosRecuperados = productosGuardados.map(
                    ({ id, nombre, precio, stock }) =>
                        new Producto(id, nombre, precio, stock)
                );


                // Resolver la promesa con los productos

                resolve(productosRecuperados);

            } catch (error) {

                // Rechazar la promesa si ocurre un error

                reject(error);

            }

        }, 1500);

    });

}


// Función para guardar productos en localStorage

function guardarProductos() {

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}


// Función para renderizar productos

function renderizarProductos(listaProductos) {

    contenedorProductos.innerHTML = "";

    if (listaProductos.length === 0) {

        contenedorProductos.innerHTML = `
            <div class="sin-productos">
                <p>No se encontraron productos.</p>
            </div>
        `;

        return;
    }


    listaProductos.forEach((producto) => {

        contenedorProductos.innerHTML += `
            <div class="producto">

                <h3>${producto.nombre}</h3>

                <p>
                    <strong>Precio:</strong>
                    ${producto.mostrarPrecio()}
                </p>

                <p>
                    <strong>Stock:</strong>
                    ${producto.stock}
                </p>

                <button
                    class="btn-eliminar"
                    data-id="${producto.id}"
                >
                    Eliminar
                </button>

            </div>
        `;
    });

}


// Función asincrónica para cargar los productos

async function iniciarSimulador() {

    try {

        // Mostrar mensaje de carga

        mostrarMensaje(
            "Cargando productos...",
            "mensaje-info"
        );


        // Esperar la respuesta de la Promise

        productos = await obtenerProductos();


        // Mostrar los productos en pantalla

        renderizarProductos(productos);


        // Confirmar la carga

        mostrarMensaje(
            `${productos.length} productos cargados correctamente.`,
            "mensaje-exito"
        );


    } catch (error) {

        // Capturar y mostrar errores

        console.error("Error al cargar los productos:", error);

        mostrarMensaje(
            "No se pudieron cargar los productos. Intenta nuevamente.",
            "mensaje-error"
        );


    } finally {

        // Este bloque se ejecuta siempre

        console.log("Proceso de carga de productos finalizado.");

    }

}


// Iniciar el simulador

iniciarSimulador();


// Evento del formulario para agregar productos

formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    try {

        const nombre = inputNombre.value.trim();

        const precio = Number(inputPrecio.value);

        const stock = Number(inputStock.value);


        // Validar los campos

        if (nombre === "" || precio <= 0 || stock < 0) {

            mostrarMensaje(
                "Por favor, completa todos los campos correctamente.",
                "mensaje-error"
            );

            return;
        }


        // Generar un nuevo ID

        const nuevoId = productos.length > 0
            ? Math.max(...productos.map(producto => producto.id)) + 1
            : 1;


        // Crear el nuevo producto

        const nuevoProducto = new Producto(
            nuevoId,
            nombre,
            precio,
            stock
        );


        // Agregar producto al array

        productos.push(nuevoProducto);


        // Guardar los cambios

        guardarProductos();


        // Actualizar la pantalla

        renderizarProductos(productos);


        // Mostrar mensaje de confirmación

        mostrarMensaje(
            `El producto "${nombre}" fue agregado correctamente.`,
            "mensaje-exito"
        );


        // Limpiar formulario

        formulario.reset();

    } catch (error) {

        console.error("Error al agregar el producto:", error);

        mostrarMensaje(
            "No se pudo agregar el producto. Intenta nuevamente.",
            "mensaje-error"
        );

    } finally {

        console.log("Operación de agregar producto finalizada.");

    }

});


// Evento para eliminar productos

contenedorProductos.addEventListener("click", (evento) => {

    if (evento.target.classList.contains("btn-eliminar")) {

        try {

            const idProducto = Number(
                evento.target.dataset.id
            );


            // Buscar el producto

            const producto = productos.find(
                producto => producto.id === idProducto
            );


            // Verificar que el producto exista

            if (!producto) {

                throw new Error("El producto no existe.");

            }


            // Eliminar producto del array

            productos = productos.filter(
                producto => producto.id !== idProducto
            );


            // Guardar los cambios

            guardarProductos();


            // Actualizar la pantalla

            renderizarProductos(productos);


            // Mostrar mensaje de confirmación

            mostrarMensaje(
                `El producto "${producto?.nombre ?? "Producto"}" fue eliminado.`,
                "mensaje-exito"
            );

        } catch (error) {

            console.error("Error al eliminar el producto:", error);

            mostrarMensaje(
                "No se pudo procesar la operación. Intenta nuevamente.",
                "mensaje-error"
            );

        } finally {

            console.log("Operación de eliminación finalizada.");

        }

    }

});


// Evento de teclado para buscar productos

buscador.addEventListener("input", () => {

    const textoBuscado = buscador.value
        .toLowerCase()
        .trim();


    const productosFiltrados = productos.filter(
        producto =>
            producto.nombre
                .toLowerCase()
                .includes(textoBuscado)
    );


    renderizarProductos(productosFiltrados);

});
