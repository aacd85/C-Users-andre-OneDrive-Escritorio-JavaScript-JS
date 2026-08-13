// Clase Producto
class Producto {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    // Método para vender productos
    vender(cantidad) {
        if (cantidad <= 0) {
            return "La cantidad debe ser mayor a 0.";
        }

        if (cantidad <= this.stock) {
            this.stock -= cantidad;

            return `Venta realizada.
Producto: ${this.nombre}
Cantidad vendida: ${cantidad}
Stock disponible: ${this.stock}`;
        } else {
            return `No hay suficiente stock de ${this.nombre}.
Stock disponible: ${this.stock}`;
        }
    }

    // Mostrar información del producto
    mostrarInformacion() {
        return `ID: ${this.id}
Producto: ${this.nombre}
Precio: $${this.precio}
Stock: ${this.stock}`;
    }
}


// Creo tres productos usando new

let detergente = new Producto(
    1,
    "Detergente",
    12000,
    20
);

let desinfectante = new Producto(
    2,
    "Desinfectante",
    15000,
    15
);

let limpiavidrios = new Producto(
    3,
    "Limpiavidrios",
    10000,
    10
);


// Guardo los productos en un array

let productos = [
    detergente,
    desinfectante,
    limpiavidrios
];


// Mostrar los productos disponibles

console.log("PRODUCTOS DISPONIBLES");

for (let producto of productos) {
    console.log(producto.mostrarInformacion());
}


// Interacción con el usuario

let nombreProducto = prompt(
    "¿Qué producto deseas comprar?\n\n" +
    "1. Detergente\n" +
    "2. Desinfectante\n" +
    "3. Limpiavidrios"
);


let productoSeleccionado;

if (nombreProducto === "1") {
    productoSeleccionado = detergente;
} else if (nombreProducto === "2") {
    productoSeleccionado = desinfectante;
} else if (nombreProducto === "3") {
    productoSeleccionado = limpiavidrios;
} else {
    alert("Opción no válida.");
}


// Si seleccionó un producto, preguntamos la cantidad

if (productoSeleccionado) {

    let cantidad = Number(
        prompt(
            `Has seleccionado ${productoSeleccionado.nombre}.\n\n` +
            `Precio: $${productoSeleccionado.precio}\n` +
            `Stock disponible: ${productoSeleccionado.stock}\n\n` +
            "¿Cuántas unidades deseas comprar?"
        )
    );


    let confirmar = confirm(
        `¿Confirmas la compra de ${cantidad} ${productoSeleccionado.nombre}?`
    );


    if (confirmar) {

        let resultado = productoSeleccionado.vender(cantidad);

        alert(resultado);

        console.log(resultado);

        console.log("Estado actualizado del producto:");
        console.log(productoSeleccionado);

    } else {

        alert("Compra cancelada.");
        console.log("El usuario canceló la compra.");

    }
}