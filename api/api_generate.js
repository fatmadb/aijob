// api/generate.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ error: 'Missing role field' });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY; // تأكدي أنكِ ضفتي المفتاح في Vercel → Settings → Environment Variables
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing OpenAI API key' });
    }

    // هنا بنستخدم API الخاص بـ OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert HR assistant. Write concise job descriptions.' },
          { role: 'user', content: `Generate a detailed job description for: ${role}` }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || 'No response';
    return res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}
