const productos = [

{
nombre:"Laptop Gamer",
precio:899,
imagen:"https://picsum.photos/400/250?1"
},

{
nombre:"Teclado Mecánico",
precio:89,
imagen:"https://picsum.photos/400/250?2"
},

{
nombre:"Mouse RGB",
precio:39,
imagen:"https://picsum.photos/400/250?3"
}

];

const contenedor =
document.getElementById("productos");

productos.forEach(producto=>{

contenedor.innerHTML += `
<div class="card">

<img src="${producto.imagen}">

<div class="info">

<h3>${producto.nombre}</h3>

<p class="precio">
$${producto.precio}
</p>

</div>

</div>
`;

});

const chatMessages =
document.getElementById("chatMessages");

function agregar(texto,tipo){

const div =
document.createElement("div");

div.className =
`message ${tipo}`;

div.innerText =
texto;

chatMessages.appendChild(div);

chatMessages.scrollTop =
chatMessages.scrollHeight;
}

async function enviar(){

const input =
document.getElementById("msg");

const mensaje =
input.value.trim();

if(!mensaje) return;

agregar(mensaje,"user");

input.value="";

const res =
await fetch("/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:mensaje
})

});

const data =
await res.json();

agregar(data.response,"bot");
}

document
.getElementById("msg")
.addEventListener(
"keypress",
e=>{

if(e.key==="Enter")
enviar();

});