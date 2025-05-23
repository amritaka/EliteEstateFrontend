// src/Assistant.js

import React, { useState } from 'react';
import axios from 'axios';
import './Asitant.css';

function Assistant() {
  const [userMessage, setUserMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  // Replace with your actual API key
  const API_KEY = 'AIzaSyBD8_HVifPqg1d3qTP8jX1UrvLUPXOqa6U';
  const systemPrompt = `You are a real estate expert. When asked about property prices, always try to give an approximate range, even if details are missing. You may include a disclaimer like "This is a rough estimate. Exact price may vary."`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const result = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-001:generateContent?key=${API_KEY}`,
        {
            contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemPrompt}\nUser: ${userMessage}` }],
                },
              ],
              
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const content =
        result.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from API.';
      setResponse(content);
    } catch (error) {
      console.error('Error calling API:', error.response?.data || error.message);
      setResponse('Error occurred. Please check API key or model name and try again.');
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Real Estate Assistant</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          placeholder="Ask me about property prices or anything else......"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>
      {response && (
        <div className="response">
          <h3>Assistant:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Assistant;
