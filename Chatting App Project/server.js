const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/localstorageDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.log('❌ MongoDB Error:', err));

// Define schema
const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  email_: String
});

const DataModel = mongoose.model('Data', dataSchema);

// Route to save data
app.post('/save-data', async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    await newData.save();
    res.status(201).json({ message: 'Data saved to MongoDB ✅' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save data ❌' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
