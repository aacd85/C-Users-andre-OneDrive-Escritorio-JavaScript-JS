// FUNCIÓN 1 - Promedio

function calcularPromedio(nota1, nota2, nota3) {
    return (nota1 + nota2 + nota3) / 3;
}


// FUNCIÓN 2 - Función flecha

const verificarEstado = (promedio) => {
    return promedio >= 5 ? "Aprobó" : "Reprobó";
};


// FUNCIÓN 3 - Resultado

function mostrarResultado(nombre, promedio, estado) {
    let mensaje =
        "Estudiante: " + nombre +
        "\nPromedio: " + promedio.toFixed(2) +
        "\nEstado: " + estado;

    console.log(mensaje);
    alert(mensaje);
}


// Programa principal

// Entrada de datos
let cantidad = parseInt(prompt("¿Cuántos estudiantes desea registrar?"));

// Ciclo de iteración
for (let i = 1; i <= cantidad; i++) {

    let nombre = prompt("Ingrese el nombre del estudiante " + i);

    let nota1 = parseFloat(prompt("Ingrese la nota 1"));
    let nota2 = parseFloat(prompt("Ingrese la nota 2"));
    let nota3 = parseFloat(prompt("Ingrese la nota 3"));

    // Procesamiento
    let promedio = calcularPromedio(nota1, nota2, nota3);

    let estado = verificarEstado(promedio);

    // Salida
    mostrarResultado(nombre, promedio, estado);
}

alert("No hay más estudiantes.");
console.log("Fin de las notas.");