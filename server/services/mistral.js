import axios from 'axios';

const generatePrompt = (text, tone) => {
  return `Rewrite the following text to be ${tone}. Only return the rewritten text, without any explanation or preamble: "${text}"`;
};

export const getMistralTransformation = async (text, tone) => {
  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
  const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

  if (!MISTRAL_API_KEY) {
    throw new Error('MISTRAL_API_KEY is not defined in the environment variables.');
  }

  const prompt = generatePrompt(text, tone);

  try {
    const response = await axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-small-latest', 
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        },
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid response structure from Mistral AI.');
    }
  } catch (error) {
    console.error('Error calling Mistral AI API:', error.response?.data || error.message);
    throw new Error('Failed to transform text using the external API.');
  }
};
