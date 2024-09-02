'use client'

import { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import axios from 'axios';

export default function RecipeSuggestions({ inventory }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to get recipe suggestions
  const getRecipeSuggestions = async () => {
    try {
      setLoading(true);
      setError('');

      // Create a prompt for OpenAI
      const ingredients = inventory.map((item) => item.name).join(', ');
      const prompt = `Suggest some recipes using the following ingredients: ${ingredients}. List the recipe name and brief instructions.`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4', // Use the GPT model suitable for your needs
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 200, // Adjust based on your requirement
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // Use the correct env variable
            'Content-Type': 'application/json',
          },
        }
      );

      const suggestions = response.data.choices[0].message.content;
      setRecipes(suggestions.split('\n').filter((r) => r));
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h4"></Typography>
      <Button
        variant="contained"
        sx={{ mt: 2, bgcolor: '#967969', '&:hover': { bgcolor: '#785a4e' } }}
        onClick={getRecipeSuggestions}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Recipe Suggestions'}
      </Button>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      {recipes.length > 0 && (
        <Stack spacing={2} mt={3}>
          {recipes.map((recipe, index) => (
            <Box key={index} p={2} bgcolor="#f0f0f0" borderRadius={1}>
              <Typography>{recipe}</Typography>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
