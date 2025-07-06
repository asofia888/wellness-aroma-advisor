import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API key from environment variables (server-side only)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'API configuration error' });
    }

    // Initialize Gemini AI with server-side API key
    const ai = new GoogleGenAI({ apiKey });

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Generate content using Gemini AI
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 2048,
        responseMimeType: 'text/plain'
      }
    });

    // Return the generated text
    return res.status(200).json({ 
      text: response.candidates[0].content.parts[0].text,
      success: true 
    });

  } catch (error) {
    console.error('AI analysis error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to generate AI analysis',
      details: error.message,
      success: false 
    });
  }
}