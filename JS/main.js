let productos = [
    'detergente',
    'desinfectante',
    'limpiavidrios'
];

console.log('Lista original:');
console.log(productos);


// 1. PUSH
// Agrego un producto al final de la lista

productos.push('blanqueador');

console.log('Agrego blanqueador (con push):');
console.log(productos);


// 2. POP
// Elimino el último producto de la lista

productos.pop();

console.log('Elimino el último producto:');
console.log(productos);


// 3. UNSHIFT
// Agrego un producto al inicio de la lista

productos.unshift('ambientador');

console.log('Agrego ambientador al inicio (con unshift):');
console.log(productos);


// 4. SHIFT
// Elimino el primer producto de la lista

productos.shift();

console.log('Elimino el primer producto (con shift):');
console.log(productos);


// 5. ACCESO Y MODIFICACIÓN POR ÍNDICE
// Modifico el producto que se encuentra en la posición 1

productos[1] = 'jabon liquido';

console.log('Modifico el producto en el índice 1:');
console.log(productos);


// 6. FOR...OF
// Recorremos todos los productos de la lista

console.log('Productos disponibles (for-of):');

for (let producto of productos) {
    console.log(producto);
}


// 7. INCLUDES
// Producto existe

let productoBuscado = 'detergente';

if (productos.includes(productoBuscado)) {
    console.log('El producto ' + productoBuscado + ' está disponible.');
} else {
    console.log('El producto ' + productoBuscado + ' no está disponible.');
}


// 8. INDEXOF
// Posición de un producto

let posicion = productos.indexOf('REMOVEDOR');

if (posicion !== -1) {
    console.log('REMOVEDOR se encuentra en la posición ' + posicion);
} else {
    console.log('REMOVEDOR no se encuentra en la lista.');
}