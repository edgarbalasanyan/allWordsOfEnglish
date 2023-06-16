const axios = require('axios');

// Function to send a GET request
async function searchWord(word) {
  try {
    const response = await axios.get(`http://localhost:3000/api/search?w=${word}`);
    console.log(`Word: ${word}, Exists: ${response.data.exists}`);
  } catch (error) {
    if (error.response) {
      console.error(`Error searching word ${word}:`, error.response.data);
    } else {
      console.error(`Error searching word ${word}:`, error.message);
    }
  }
}

// Function to send a POST request
async function normalizeWord(word) {
  try {
    const response = await axios.post('http://localhost:3000/api/normalize', { word });
    console.log(`Word: ${word}, Normalized Word: ${response.data.normalizedWord}`);
  } catch (error) {
    if (error.response) {
      console.error(`Error normalizing word ${word}:`, error.response.data);
    } else {
      console.error(`Error normalizing word ${word}:`, error.message);
    }
  }
}

// Array of words to test
const words = ['Cats!', 'dogs', 'Apples', 'orange123'];

// Send requests for each word
for (const word of words) {
  searchWord(word);
  normalizeWord(word);
}
