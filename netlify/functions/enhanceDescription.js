const fetch = require('node-fetch');

exports.handler = async function(event) {
  const { title, address, description } = JSON.parse(event.body || '{}');
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `Write a professional, engaging real estate listing based on:\nTitle: ${title}\nAddress: ${address}\nDescription: ${description}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  const result = data.choices?.[0]?.message?.content || "Could not generate response.";
  return {
    statusCode: 200,
    body: JSON.stringify({ result })
  };
};
