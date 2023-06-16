const mongoose = require('mongoose');
const express = require('express');
const pluralize = require('pluralize');

// Connect to MongoDB
mongoose.connect('mongodb+srv://edgarbalasanyan1999:test123@cluster0.qpktkua.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');

  // Create a schema for the English word
  const wordSchema = new mongoose.Schema({
    word: String,
  });

  // Create a model based on the schema
  const Word = mongoose.model('Word', wordSchema);

  // Create Express app
  const app = express();
  
// GET request endpoint
app.get('/api/search', async (req, res) => {
  const word = req.query.w;

  try {
    // Find a document that matches the word (case-insensitive)
    const result = await Word.findOne({ word: { $regex: new RegExp(`^${word}$`, 'i') } });

    // Send the response
    if(result){
      res.json({ exists: !!result });
    }else{
      res.status(404).json({ error: 'Word not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.use(express.json());



//POST request endpoint
app.post('/api/normalize', (req, res) => {
  const { word } = req.body;

  if (!word) {
    return res.status(400).json({ error: 'Missing word in request body' });
  }

  const normalizedWord = pluralize.singular(word.toLowerCase().replace(/[^a-z]+/g, ''));

  res.json({ normalizedWord });
});


  // Start the server
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });

  // Fetch and log limited number of documents from the database
  Word.find().limit(2).then((words) => {
    console.log('Data fetched from the database:');
    words.forEach((word) => {
      console.log(word);
    });
  }).catch((error) => {
    console.error('Failed to fetch data from the database:', error);
  });
}).catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});




