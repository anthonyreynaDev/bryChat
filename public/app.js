const productos = [

{
nombre:"Lomo Saltado",
precio:12,
imagen:"images/lomo.jpg"
},

{
nombre:"Arroz con Pollo",
precio:10,
imagen:"images/arroz.jpg"
},

{
nombre:"Ceviche Clásico",
precio:15,
imagen:"images/ceviche.jpg"
},

{
nombre:"Ají de Gallina",
precio:11,
imagen:"images/aji.jpg"
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
agregar(
"¡Bienvenido a Sabor Peruano! 🍽️ ¿Qué plato te gustaría conocer?",
"bot"
);

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

const chatToggle =
document.getElementById("chatToggle");

const chatbox =
document.getElementById("chatbox");

console.log("Botón:", chatToggle);
console.log("Chat:", chatbox);
chatToggle.addEventListener("click",()=>{

  console.log("CLICK DETECTADO");

  chatbox.classList.toggle("hidden");

  if(chatbox.classList.contains("hidden")){
    chatToggle.innerHTML = "💬";
  }else{
    chatToggle.innerHTML = "✖";
  }

});