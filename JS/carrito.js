const carrito = [];
let carritoCompras = document.getElementById("carritoCompras");
let botonesComprar = document.getElementsByClassName("btn-comprar");

for(let i=0; i < botonesComprar.length; i++){

    botonesComprar[i].addEventListener("click", () => {
        cantidadProductos(listaGuitarras[i]);
        calcularPrecioTotal(listaGuitarras[i]);
        Swal.fire(
            'Perfecto!',
            'Producto agregado al carrito',
            'success'
          )       
    })
}

/*Coloca la cantidad de productos en el carrito de la barra de navegacion*/
function remanenteCantidadProductos(){

    let productosAlmacenados = Number(localStorage.getItem("cantidadProductos"));
    if (productosAlmacenados !== 0){
        document.querySelector("#carrito span").textContent = productosAlmacenados;
    }

}

/*Cuenta los productos en el carrito*/
function cantidadProductos(producto){
    
    let productosAlmacenados = Number(localStorage.getItem("cantidadProductos"));
    if (productosAlmacenados !== 0) {
        localStorage.setItem("cantidadProductos", productosAlmacenados + 1);
        document.querySelector("#carrito span").textContent = productosAlmacenados + 1;
    } 
    else{
        localStorage.setItem("cantidadProductos", 1);
        document.querySelector("#carrito span").textContent = 1;
    }
    
    guardarEnLocalStorage(producto);

} 


function guardarEnLocalStorage(producto){

    let productosEnCarrito = localStorage.getItem("productosEnCarrito");
    productosEnCarrito = JSON.parse(productosEnCarrito);
    
    if (productosEnCarrito != null){

        if(productosEnCarrito[producto.modelo] == undefined){
            productosEnCarrito = {
                ...productosEnCarrito,
                [producto.modelo]: producto
            }
        }
        productosEnCarrito[producto.modelo].enCarrito += 1;

    }
    else{
        producto.enCarrito = 1;
        productosEnCarrito = {
            [producto.modelo]: producto
        }
    }
    
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
    
}

/*Calculo del costo total de los items en carrito*/
function calcularPrecioTotal(producto){

    let precioAcumulado = Number(localStorage.getItem("precioTotal"));
    if (precioAcumulado == null){
        localStorage.setItem("precioTotal", producto.precio);
    }
    else{
        localStorage.setItem("precioTotal", precioAcumulado + producto.precio);
    }
    
}


remanenteCantidadProductos();

let contenedorPrincipalCarrito = document.getElementById("contenedorPrincipalCarrito");
const tituloCarrito = document.createElement("h2");
tituloCarrito.id = "titulo-carrito";
tituloCarrito.append("Carrito de compras");
const subtituloCarrito = document.createElement("h3");
subtituloCarrito.id = "subtitulo-carrito";
subtituloCarrito.append("Productos en el carrito de compras");
contenedorPrincipalCarrito.append(tituloCarrito, subtituloCarrito);
const contenedorProductos = document.createElement("div");

generarCarrito();



function generarCarrito(){

    let productos = localStorage.getItem("productosEnCarrito");
    let objetoProductos = JSON.parse(productos);
    let listaProductos = Object.values(objetoProductos);
    //console.log(listaProductos);
    let precioTotal = 0;

    for(producto of listaProductos){

        let productoIndividual = document.createElement("div");
        productoIndividual.className = "producto-individual";
        let botonBorrar = document.createElement("button");
        botonBorrar.className = "boton-borrar";
        botonBorrar.append("X");
        productoIndividual.append(botonBorrar);
        let imgCarrito = document.createElement("img");
        imgCarrito.className = "img-carrito";
        imgCarrito.src = producto.imagen;
        productoIndividual.append(imgCarrito);
        let idProducto = document.createElement("div");
        idProducto.id = "id-producto"
        idProducto.append(producto["codigo"]);
        productoIndividual.append(idProducto);
        productoIndividual.append(producto["marca"] + " " + producto["modelo"] + " " + "|| " + "Cantidad: " + producto["enCarrito"] + " ||" + " Precio unitario: $" + producto["precio"] + " ||" + " Precio total: $" +  (producto["precio"]*producto["enCarrito"]));
        contenedorPrincipalCarrito.append(productoIndividual);
        precioTotal += (producto["precio"]*producto["enCarrito"]);


    }


    let contenedorTotal = document.createElement("div");
    contenedorTotal.id = "contenedor-total";
    contenedorTotal.append("Total: " + "$" + precioTotal);
    let botonPagar = document.createElement("button");
    botonPagar.id = "boton-pagar";
    botonPagar.append("Realizar Pago");
    contenedorTotal.append(botonPagar);
    let botonVaciar = document.createElement("button");
    botonVaciar.id = "boton-vaciar";
    botonVaciar.append("Vaciar carrito");
    contenedorTotal.append(botonVaciar);
    contenedorPrincipalCarrito.append(contenedorTotal);

    botonVaciar.addEventListener("click", () => {
        localStorage.clear();
        refrescarCarrito();
        let carritoVacio = document.createElement("div");
        carritoVacio.id = "carrito-vacio";
        carritoVacio.append("No hay items en el carrito");
        contenedorPrincipalCarrito.append(carritoVacio);
    })

    
    function refrescarCarrito(){
        
        contenedorPrincipalCarrito.innerHTML = "";
        contenedorPrincipalCarrito.append(tituloCarrito, subtituloCarrito);
        document.querySelector("#carrito span").textContent = 0;

    }

    
}


let productos = localStorage.getItem("productosEnCarrito");
let objetoProductos = JSON.parse(productos);
let listaProductos = Object.values(objetoProductos);
console.log(listaProductos);
let botonesBorrar = document.getElementsByClassName("boton-borrar");
let codigoProdEliminar = 0;
let productosSinEliminado = [];
for(let i=0; i<listaProductos.length; i++){

    botonesBorrar[i].addEventListener("click", () => {
        codigoProdEliminar = listaProductos[i].codigo;
        console.log(codigoProdEliminar); 
        for(producto of listaProductos){
            if(producto.codigo !== codigoProdEliminar){
                productosSinEliminado.push(producto);
            }
        }
        console.log(productosSinEliminado);
        localStorage.setItem("productosEnCarrito", JSON.stringify(productosSinEliminado));
        localStorage.setItem("cantidadProductos", productosSinEliminado.length);
        document.querySelector("#carrito span").textContent = productosSinEliminado.length;
        let precioAcumulado = 0;
        for(item of productosSinEliminado){
            precioAcumulado += item.precio;
        }
        localStorage.setItem("precioTotal", precioAcumulado);

    })
    

}






