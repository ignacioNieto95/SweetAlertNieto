class Guitarra{
    constructor(marca, modelo, año, precio, codigo, imagen, enCarrito){
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
        this.precio = precio;
        this.codigo = codigo;
        this.imagen = imagen;
        this.enCarrito = enCarrito;
    }

    mostrarDatos(){
        return ("Marca: " + this.marca + "\n | Modelo: " + this.modelo + "\n | Año: " + this.año + "\n | Precio: $" + this.precio + " | Codigo: " + this.codigo);
    }
}


const guitarra1 = new Guitarra("Gibson", "LesPaul", 1984, 1000, 1, "imagenes/lespaul.jpg", 0);
const guitarra2 = new Guitarra("Gibson", "SG", 1978, 1200, 2, "imagenes/sg.jpg", 0);
const guitarra3 = new Guitarra("Fender", "Telecaster", 1965, 1900, 3, "imagenes/telecaster.jpg", 0);
const guitarra4 = new Guitarra("Gibson", "Flying V", 1983, 1300, 4, "imagenes/flyingv.jpg", 0);
const guitarra5 = new Guitarra("Fender", "Stratocaster", 1992, 1200, 5, "imagenes/strato2.jpg", 0);
const guitarra6 = new Guitarra("Gibson", "Hollowbody 335", 1961, 3000, 6, "imagenes/hollowbody.jpg", 0);
const guitarra7 = new Guitarra("Gibson", "LP 57", 1965, 3100, 7, "imagenes/lp57.jpg", 0 );
const guitarra8 = new Guitarra("Gretsch", "G6136t", 1980, 2500, 8, "imagenes/g6136t.jpg", 0);

const listaGuitarras = [guitarra1, guitarra2, guitarra3, guitarra4, guitarra5, guitarra6, guitarra7, guitarra8];


let contenedorPrincipal = document.getElementById('contenedorPrincipal');

const subTitulo = document.createElement("h2");
subTitulo.id = "subtitulo";
subTitulo.append("Las guitarras de tus sueños, en un solo lugar");
const textoNombre = document.createElement("h3");
textoNombre.id = "lugar";
textoNombre.append("Buenos Aires - Argentina");
let contenedorTitulo = document.createElement("div");
contenedorTitulo.id = "contenedor-titulo";
contenedorTitulo.append(subTitulo, textoNombre);
contenedorPrincipal.appendChild(contenedorTitulo);

const nosotros = document.createElement("div");
nosotros.id = "contenedor-nosotros";
const textoNosotros = document.createElement("p");
textoNosotros.id = "texto-nosotros";
textoNosotros.append("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus eos ipsam mollitia! Mollitia iure sed illum atque provident placeat alias eveniet modi voluptates! Suscipit possimus sequi nemo, veniam laborum iusto! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus eos ipsam mollitia! Mollitia iure sed illum atque provident placeat alias eveniet modi voluptates! Suscipit possimus sequi nemo, veniam laborum iusto!");
nosotros.appendChild(textoNosotros);
contenedorPrincipal.appendChild(nosotros);

const nuestrosModelos = document.createElement("h3");
nuestrosModelos.id = "subtitulo";
nuestrosModelos.append("Nuestos modelos");
contenedorPrincipal.appendChild(nuestrosModelos);

const contenedorGuitarras = document.createElement("div");
contenedorGuitarras.id = "contenedor-guitarras";

for(guitarra of listaGuitarras){

    const contenedorProducto = document.createElement("div");
    contenedorProducto.id = "contenedor-producto";

    const card = document.createElement("div");
    card.className = "guitar-card";
    const imagenGuitarra = document.createElement("img");
    imagenGuitarra.src = guitarra.imagen;
    card.appendChild(imagenGuitarra);
    const datos = document.createElement("div");
    datos.id = "datos-guitarra";
    const textoDatos = document.createElement("p");
    textoDatos.append(guitarra.mostrarDatos());
    datos.appendChild(textoDatos);
    card.appendChild(datos);
    const botonComprar = document.createElement("button");
    botonComprar.className = "btn-comprar";
    botonComprar.append("Comprar");
    contenedorProducto.appendChild(card);
    contenedorProducto.appendChild(botonComprar);
    contenedorGuitarras.appendChild(contenedorProducto);
    
}

contenedorPrincipal.appendChild(contenedorGuitarras);

