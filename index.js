const mongoose = require('mongoose');
const fs = require('fs');

// Connect to MongoDB
mongoose.connect('mongodb+srv://edgarbalasanyan1999:test123@cluster0.qpktkua.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the English word
const wordSchema = new mongoose.Schema({
  word: String,
});

// Create a model based on the schema
const Word = mongoose.model('Word', wordSchema);

// Read the file containing English words
const englishWords = fs.readFileSync('words_alpha.txt', 'utf8').split('\n');

// Perform operations after successful connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');

  // Insert words into the database
  const trimmedWords = englishWords.map((word) => ({ word: word.trim() })); // Trim each word
  Word.insertMany(trimmedWords)
    .then(() => {
      console.log('Words inserted successfully.');
      mongoose.disconnect();
    })
    .catch((error) => {
      console.error(error);
      mongoose.disconnect();
    });
});

mongoose.connection.on('error', (error) => {
  console.error('Failed to connect to MongoDB', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});





// const mongoose = require('mongoose');
// const fs = require('fs');

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://edgarbalasanyan1999:test123@cluster0.qpktkua.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Create a schema for the English word
// const wordSchema = new mongoose.Schema({
//   word: String,
// });

// // Create a model based on the schema
// const Word = mongoose.model('Word', wordSchema);

// // Read the file containing English words
// const englishWords = fs.readFileSync('words_alpha.txt', 'utf8').split('\n');

// // Perform operations after successful connection
// mongoose.connection.on('connected', () => {
//   console.log('Connected to MongoDB');

//   // Insert words into the database
//   Word.insertMany(englishWords.map((word) => ({ word })))
//     .then(() => {
//       console.log('Words inserted successfully.');
//       mongoose.disconnect();
//     })
//     .catch((error) => {
//       console.error(error);
//       mongoose.disconnect();
//     });
// });

// mongoose.connection.on('error', (error) => {
//   console.error('Failed to connect to MongoDB', error);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('Disconnected from MongoDB');
// });
