let producto = "";

while (producto !== "salir") {

    producto = prompt(
        "¿Qué producto desea consultar? Ingrese su nombre para conocer sus funciones.\n" +
        "Escriba 'salir' para finalizar."
    );

    producto = producto.toLowerCase();

    if (producto === "lavaloza") {
        console.log("El Lavaloza elimina la grasa y cuida las manos.");
    } else if (producto === "detergente") {
        console.log("El Detergente es ideal para lavar ropa.");
    } else if (producto === "desengrasante") {
        console.log("El Desengrasante elimina grasa pesada.");
    } else if (producto === "salir") {
        console.log("No hay más productos.");
    } else {
        console.log("Ese producto no existe.");
    }
}