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

- Lomo Saltado ($12)
- Arroz con Pollo ($10)
- Ají de Gallina ($11)
- Ceviche Clásico ($15)
- Chicha Morada ($3)

Funciones:

- Recomendar platos.
- Recomendar bebidas.
- Informar precios.
- Sugerir combos.
- Informar horarios.

Horario:
Lunes a Domingo
11:00 AM - 10:00 PM

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