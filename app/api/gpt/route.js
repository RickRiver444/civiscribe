import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("🔍 PROMPT RECIBIDO:", prompt); // Log para verificar el contenido recibido

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return Response.json({ text: completion.choices[0].message.content });

  } catch (err) {
    console.error("❌ ERROR GPT:", err); // Log del error en la consola de Vercel
    return new Response(JSON.stringify({ error: "Error al generar respuesta" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
