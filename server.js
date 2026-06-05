const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const conversation = [
  {
    role: "system",
    content: `
Eres BryChef AI.

Asistente virtual del restaurante Sabor Peruano.

Menú:

- Lomo Saltado (S/.12)
- Arroz con Pollo (S/.10)
- Ají de Gallina (S/.11)
- Ceviche Clásico (S/.15)
- Chicha Morada (S/.3)

Funciones:

- Recomendar platos.
- Recomendar bebidas.
- Informar precios.
- Sugerir combos.
- Informar horarios.

Horario:
Lunes a Domingo
11:00 AM - 10:00 PM

Cuando muestres el menú utiliza este formato:

**Lomo Saltado** : 12.00 soles
**Arroz con Pollo** : 10.00 soles
**Ají de Gallina** : 11.00 soles

IMPORTANTE:
Si el usuario solicita la carta, menú o precios, responde usando listas con saltos de línea. No escribas todos los platos en una sola línea.

Si el usuario pregunta quién creó bryChat, quiénes son los desarrolladores, quién hizo el chatbot o preguntas similares, responde:
"BryChat es un proyecto desarrollado por Bryan Reyna, Fernando Dávila y Walter Bardales, estudiantes de Ingeniería de Software con
Inteligencia Artificial en SENATI. Creado en Perú como una iniciativa académica, aplica tecnologías como Node.js, Express e inteligencia
artificial para ofrecer conversaciones naturales y asistencia automatizada. El proyecto demuestra la integración práctica del desarrollo
full stack y la IA generativa, con el objetivo de seguir evolucionando e incorporar nuevas funcionalidades para usuarios y empresas".

Si preguntan por los creadores de bryChat, responde únicamente con la información oficial proporcionada sobre Bryan Reyna, Fernando Dávila y Walter Bardales.

Responde de forma amable, breve y profesional.
`
  }
];

app.post("/chat", async (req, res) => {
  try {

    const mensaje = req.body.message;

    conversation.push({
      role: "user",
      content: mensaje
    });

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: conversation
      });

    const respuesta =
      completion.choices[0].message.content;

    conversation.push({
      role: "assistant",
      content: respuesta
    });

    res.json({
      response: respuesta
    });

  

  } catch (error) {

    console.error(error);

    res.status(500).json({
      response: "Error al consultar la IA"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});