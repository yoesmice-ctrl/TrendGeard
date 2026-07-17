import { URL_BASE } from "./firebase.js";


//===============================
// ELEMENTOS DOM
//===============================

const tabla = document.getElementById("tablaClientes");

const totalClientes = document.getElementById("totalClientes");
const totalVentas = document.getElementById("totalVentas");
const clientesGold = document.getElementById("clientesGold");

const buscar = document.getElementById("buscar");

const mayorCompra = document.getElementById("mayorCompra");
const productoTop = document.getElementById("productoTop");
const ciudadTop = document.getElementById("ciudadTop");
const promedioCompra = document.getElementById("promedioCompra");


let clientes = [];

let graficaMembresias = null;
let graficaCiudades = null;




//===============================
// CARGAR FIREBASE
//===============================


async function cargarClientes(){


    try{


        const respuesta =
        await fetch(`${URL_BASE}/customers.json`);



        const datos =
        await respuesta.json();



        if(!datos){

            console.log("No existen clientes");

            return;

        }



        clientes =
        Object.entries(datos).map(([id,cliente])=>({

            id,

            ...cliente

        }));




        mostrarClientes(clientes);

        actualizarTarjetas();

        actualizarEstadisticas();

        crearGraficaMembresias();

        crearGraficaCiudades();



    }catch(error){


        console.error(
            "Error Firebase:",
            error
        );


    }


}






//===============================
// TABLA
//===============================


function mostrarClientes(lista){


    if(!tabla) return;



    tabla.innerHTML="";



    lista.forEach(cliente=>{


        tabla.innerHTML += `

        <tr>

        <td>${cliente.id}</td>

        <td>${cliente.name || "-"}</td>

        <td>${cliente.city || "-"}</td>

        <td>${cliente.productPurchased || "-"}</td>

        <td>
        $${Number(cliente.amountSpent || 0)
        .toLocaleString()}
        </td>

        <td>${cliente.membershipStatus || "-"}</td>

        </tr>

        `;



    });



}







//===============================
// CARDS
//===============================


function actualizarTarjetas(){


    if(totalClientes){

        totalClientes.textContent =
        clientes.length;

    }




    const ventas = clientes.reduce(
        (total,cliente)=>

        total +
        Number(cliente.amountSpent || 0)

    ,0);



    if(totalVentas){

        totalVentas.textContent =
        "$"+ventas.toLocaleString();

    }




    const gold =
    clientes.filter(cliente=>

    cliente.membershipStatus==="Gold"

    ).length;



    if(clientesGold){

        clientesGold.textContent =
        gold;

    }


}








//===============================
// BUSCADOR
//===============================


if(buscar){


buscar.addEventListener(
"keyup",
()=>{


const texto =
buscar.value.toLowerCase();



const filtrados =
clientes.filter(cliente=>{


return (

(cliente.name || "")
.toLowerCase()
.includes(texto)


||

(cliente.city || "")
.toLowerCase()
.includes(texto)


||

(cliente.productPurchased || "")
.toLowerCase()
.includes(texto)


);


});



mostrarClientes(filtrados);



});


}








//===============================
// ESTADISTICAS
//===============================


function actualizarEstadisticas(){


if(clientes.length===0)
return;



const mayor =
clientes.reduce(
(max,cliente)=>{


return Number(cliente.amountSpent || 0)
>
Number(max.amountSpent || 0)

?

cliente

:

max;



},
clientes[0]
);



if(mayorCompra){

mayorCompra.textContent =
"$"+
Number(mayor.amountSpent || 0)
.toLocaleString();

}




const productos={};



clientes.forEach(cliente=>{


let producto =
cliente.productPurchased || "Sin producto";


productos[producto] =
(productos[producto] || 0)+1;



});



const productoGanador =
Object.entries(productos)
.sort((a,b)=>b[1]-a[1])[0];



if(productoTop){

productoTop.textContent =
productoGanador
?
productoGanador[0]
:
"-";

}





const ciudades={};



clientes.forEach(cliente=>{


let ciudad =
cliente.city || "Sin ciudad";


ciudades[ciudad]=
(ciudades[ciudad] || 0)+1;



});



const ciudadGanadora =
Object.entries(ciudades)
.sort((a,b)=>b[1]-a[1])[0];



if(ciudadTop){

ciudadTop.textContent =
ciudadGanadora
?
ciudadGanadora[0]
:
"-";

}




const suma =
clientes.reduce(
(total,cliente)=>

total+
Number(cliente.amountSpent || 0)

,0);



if(promedioCompra){

promedioCompra.textContent =
"$"+
Math.round(
suma/clientes.length
)
.toLocaleString();


}


}







//===============================
// GRAFICA MEMBRESIAS
//===============================


function crearGraficaMembresias(){


const canvas =
document.getElementById(
"graficaMembresias"
);



if(!canvas) return;



const datos={

Bronze:0,

Silver:0,

Gold:0,

Platinum:0

};



clientes.forEach(cliente=>{


if(datos[cliente.membershipStatus]!==undefined)

datos[cliente.membershipStatus]++;


});




if(graficaMembresias){

graficaMembresias.destroy();

}



graficaMembresias =
new Chart(canvas,{


type:"doughnut",


data:{


labels:Object.keys(datos),


datasets:[{

data:Object.values(datos),


backgroundColor:[

"#cd7f32",

"#c0c0c0",

"#ffd700",

"#3b82f6"

]


}]


}


});



}








//===============================
// GRAFICA CIUDADES
//===============================


function crearGraficaCiudades(){


const canvas =
document.getElementById(
"graficaCiudades"
);



if(!canvas) return;



const ciudades={};



clientes.forEach(cliente=>{


let ciudad =
cliente.city || "Sin ciudad";


ciudades[ciudad]=

(ciudades[ciudad] || 0)

+

Number(cliente.amountSpent || 0);



});



if(graficaCiudades){

graficaCiudades.destroy();

}



graficaCiudades =
new Chart(canvas,{


type:"bar",


data:{


labels:Object.keys(ciudades),


datasets:[{


label:"Ventas ($)",


data:Object.values(ciudades),


backgroundColor:"#2563eb"


}]


},


options:{


responsive:true,


scales:{


y:{


beginAtZero:true


}


}


}


});



}








//===============================
// ORDENAMIENTO
//===============================


function ordenar(campo){


clientes.sort((a,b)=>{


if(campo==="amountSpent"){

return Number(b[campo]||0)
-
Number(a[campo]||0);

}



return String(a[campo]||"")
.localeCompare(
String(b[campo]||"")
);



});



mostrarClientes(clientes);



}



const botonesOrden=[

["ordenNombre","name"],

["ordenCiudad","city"],

["ordenProducto","productPurchased"],

["ordenValor","amountSpent"],

["ordenMembresia","membershipStatus"]

];



botonesOrden.forEach(([id,campo])=>{


const boton =
document.getElementById(id);



if(boton){


boton.addEventListener(
"click",
()=>ordenar(campo)
);


}


});









//===============================
// MENU
//===============================


const opcionesMenu =
document.querySelectorAll(
".sidebar li"
);



const secciones =
[
"inicio",
"clientes",
"reportes",
"configuracion",
"informacion"
];



function ocultarSecciones(){


secciones.forEach(id=>{


const sec =
document.getElementById(id);


if(sec){

sec.style.display="none";

}


});


}





opcionesMenu.forEach(opcion=>{


opcion.addEventListener(
"click",
()=>{


const seleccion =
opcion.dataset.section;



opcionesMenu.forEach(item=>

item.classList.remove("active")

);



opcion.classList.add("active");





if(
secciones.includes(seleccion)
){


ocultarSecciones();



document
.getElementById(seleccion)
.style.display="block";


}



if(seleccion==="oscuro"){


document.body
.classList.toggle("dark");


}



if(seleccion==="exportar"){


exportarCSV();


}



});


});







//===============================
// EXPORTAR CSV
//===============================


function exportarCSV(){


let csv =

"Nombre,Ciudad,Producto,Valor,Membresia\n";



clientes.forEach(cliente=>{


csv +=

`"${cliente.name || ""}",`+

`"${cliente.city || ""}",`+

`"${cliente.productPurchased || ""}",`+

`${cliente.amountSpent || 0},`+

`"${cliente.membershipStatus || ""}"\n`;



});



const blob =
new Blob(
[csv],
{
type:"text/csv"
}
);



const url =
URL.createObjectURL(blob);



const enlace =
document.createElement("a");


enlace.href=url;


enlace.download=
"clientes_trendgear.csv";


enlace.click();


}







//===============================
// INICIAR
//===============================


cargarClientes();