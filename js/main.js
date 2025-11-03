/**************************VARIABLES**************************/
const productos = document.createDocumentFragment();
const tableContainer = document.querySelector("#tableContainer")
const miFormulario = document.querySelector("#miFormulario")


// const arrayLocal = [
//     {
//         id: "manzana",
//         nombre: "manzana",
//         contador: 2
//     },
//     {
//         id:"pera",
//         nombre: "pera",
//         contador: 5
//     }
// ]

// localStorage.setItem("productos", JSON.stringify(arrayLocal));


/**************************EVENTOS**************************/
miFormulario.addEventListener("submit",(ev) =>{
    ev.preventDefault();//evitar eventos predefinidos
    agregarProducto(ev.target['producto'].value);
})

document.addEventListener('click', (ev) => {
    // ev.preventDefault();
    if (ev.target.matches('.btn')) {
        //console.log(ev.target.id)
        quitarProducto(ev.target.id)
    
    }
})


/**************************FUNCIONES**************************/

/**
 * función para añadir un producto a la lista de la compra
 * @param {array} arrayLocal array con los objetos de los productos
 * @param {String} arrayLocal.elemento.nombre nombre del producto
 * @param {Number} arrayLocal.elemento.contador número de productos
 * 
 */

const agregarProducto = (producto) =>{
    // si el producto está correctamente escrito
    if(validarProducto(producto)){
        console.log('agregar producto')
        const arrayLocal =JSON.parse(localStorage.getItem("productos")) || []
        const index = arrayLocal.findIndex((elemento)=> elemento.nombre == producto.toLowerCase()) 
        console.log(index);       
        if(index != -1){
            // si está ese producto, subir el contador
            arrayLocal[index].contador += 1
                        
        }else {
            //si no está, crear un contador y agregar el producto
            const nuevoProducto ={
                id: producto.toLowerCase(),
                nombre: producto.toLowerCase(),
                contador: 1
            }
            arrayLocal.push(nuevoProducto);
            console.log(arrayLocal);
        }
        localStorage.setItem("productos", JSON.stringify(arrayLocal));
        pintarTabla();
    } else {
        alert("El producto debe ser de tipo texto");
    }
    
}
/**
 * Funcion para verificar que una variable e
 * @param {undefined} producto
 * @return {boolean} 
 */
const validarProducto = (producto) =>{
    if(typeof(producto)== 'string')return true;
    else return false;
}

/**
 * Pintar la tabla recogiendo los valores desde el localStorage
 * @return {undefined}
 */
const pintarTabla = () => {
    // Vaciamos contenido anterior
    tableContainer.innerHTML="";
    //Obtener los productos
    const productos = JSON.parse(localStorage.getItem('productos')) || []
    if (productos.length == 0){
        tableContainer.style.display = "none"
    }else{
        tableContainer.style.display = ""
        //Crear tabla
        const tabla = document.createElement('TABLE')
        //Añadir cabezal
        tabla.append(pintarCabezalTabla());

        //Recorrer los objetos
        productos.forEach(element => {   
            //Añadir fila por elemento
            tabla.append(pintarCuerpoTabla(element))       
        })
        //Añadir la tabla al document
        tableContainer.append(tabla);
    }

};


/**
 * Devuelve la fila encabezado de la tabla
 * @return {document.tr} 
 */
const pintarCabezalTabla = () => {
    const fila1 = document.createElement("TR")
    const celdaNombre = document.createElement("TH")
    celdaNombre.textContent = "Nombre del producto"
    const celdaCantidad = document.createElement("TH")
    celdaCantidad.textContent = "Cantidad"
    const celdaEliminar = document.createElement("TH")
    celdaEliminar.textContent = ""
    fila1.append(celdaNombre,celdaCantidad,celdaEliminar)
    return fila1
}

/**
 * Devuelve una fila con nombre del producto, cantidad y el boton de eliminar pasandole como parametro un objeto de tipo product
 * @param {Object} element
 * @return {document.tr}
 */
const pintarCuerpoTabla = (element) =>{
    //Fila
    const filaNueva = document.createElement("TR")
    
    //Celdas
    const celdaNom = document.createElement("TD")
    celdaNom.textContent = element.nombre
    const celdaCan = document.createElement("TD")
    celdaCan.textContent = element.contador
    const celdaEli = document.createElement("TD")
    const btn = document.createElement("BUTTON")
    btn.textContent = 'Eliminar'
    btn.classList.add("btn")
    btn.id = element.nombre
    celdaEli.append(btn);
    
    filaNueva.append(celdaNom,celdaCan,celdaEli)
    return filaNueva
}




/**
 * Elimina / Decrementa el elemento con el id que se pasa como parametro
 * @param {string} identificador id del producto que queremos eliminar / decrementar 
 */
const quitarProducto = (identificador) => {
    // hacer un evento que detecte el id del boton eliminar,
    // ese botón eliminar tedría que tener un id con el nombre de la fruta
    // si se le da al boton eliminar hay que modificar el array,
    let arrayLocal = JSON.parse(localStorage.getItem('productos')) || []
    
    // cogemos el indice del array donde se encuentra elemento con el id = identificador
    const index = arrayLocal.findIndex(element=> element.id == identificador)
    console.log(index)
    // y restarle una unidad al producto.
    arrayLocal[index]['contador']--;
    if (arrayLocal[index].contador === 0) {
        // si la cantidad es cero, hay que eliminar ese objeto
        arrayLocal.splice(index,1);
    }      
    
    localStorage.setItem("productos", JSON.stringify(arrayLocal));
    pintarTabla();


    
}

/**************************INVOCACIONES**************************/
pintarTabla();