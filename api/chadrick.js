import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  console.log('CHADRICK API handler invoked');
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  const { message, password, count, history } = req.body;

  // Only allow more than 5 messages if password is correct
  if (count > 5) {
    if (!process.env.CHADRICK_PASS) {
      return res.status(500).json({ error: 'CHADRICK_PASS environment variable not set' });
    }
    if (password !== process.env.CHADRICK_PASS) {
      return res.status(403).json({ error: 'Password required after 5 messages.' });
    }
  }

  if (!message) {
    res.status(400).json({ error: 'No message provided' });
    return;
  }
  
  const openaiApiKey = process.env.CHADRICK_OPENAI_API_KEY;
  if (!openaiApiKey) {
    res.status(500).json({ error: 'CHADRICK_OPENAI_API_KEY not set' });
    return;
  }

  // Read system prompt from chadrick prompt.txt
  const promptFilePath = path.join(process.cwd(), 'chadrick prompt.txt');
  let systemPrompt = '';
  try {
    systemPrompt = fs.readFileSync(promptFilePath, 'utf-8');
  } catch (e) {
    return res.status(500).json({ error: 'System prompt file not found.' });
  }

  // Build messages array for OpenAI
  let messages = [{ role: 'system', content: systemPrompt }];
  if (Array.isArray(history) && history.length > 0) {
    messages = messages.concat(history);
  } else {
    messages.push({ role: 'user', content: message });
  }

  // Call OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + openaiApiKey
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages
    })
  });

  if (!response.ok) {
    let errorMsg = 'OpenAI API error';
    try {
      const errData = await response.json();
      errorMsg = errData.error?.message || errorMsg;
    } catch {}
    return res.status(response.status).json({ error: errorMsg });
  }

  const data = await response.json();
  res.status(200).json(data);
}