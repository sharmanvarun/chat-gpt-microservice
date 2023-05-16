// Number: 2
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = 4002;

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const { choices } = response.data;
    const reply = choices[0].message.content.trim();

    res.json({ reply });
  } catch (error) {
    console.error('Error:', error.message); // error 429 is given when you make api calls more than the assigned quota
    res.status(500).json({ message: 'sports' }); // It will give error 429 but we will show a message to show how the microservice acrchitecture will work 
  }
});

app.listen(port, () => {
  console.log(`Microservice listening at http://localhost:${port}`);
});
