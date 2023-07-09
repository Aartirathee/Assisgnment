// const express = require('express');
// const mongoose = require('mongoose');
// const cors= require('cors');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/project', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(error => {
//     console.error('Failed to connect to MongoDB', error);
//   });

// // Create user schema and model
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   domain: { type: String, required: true },
//   gender: { type: String, required: true },
//   availability: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// // Create Express app
// const app = express();
// const port = 3000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // API routes

// // Root endpoint
// app.get('/', (req, res) => {
//   res.send('Welcome to the API');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });


// // Retrieve all users
// app.get('/api/users', (req, res) => {
//   User.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(error => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// // Retrieve a specific user by ID
// app.get('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   User.findById(id)
//     .then(user => {
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// // Create a new user
// app.post('/api/users', (req, res) => {
//   const { name, domain, gender, availability } = req.body;
//   const newUser = new User({ name, domain, gender, availability });
//   newUser.save()
//     .then(user => {
//       res.status(201).json(user);
//     })
//     .catch(error => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// // Update an existing user
// app.put('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, domain, gender, availability } = req.body;
//   User.findByIdAndUpdate(id, { name, domain, gender, availability }, { new: true })
//     .then(user => {
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

// // Delete a user
// app.delete('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   User.findByIdAndDelete(id)
//     .then(user => {
//       if (user) {
//         res.json({ message: 'User deleted successfully' });
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });


//  Connect to MongoDB
const mongoose=require("mongoose");
 mongoose.connect('mongodb://localhost:27017/project', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 })
   .then(() => {
     console.log('Connected to MongoDB');
   })
   .catch(error => {
     console.log('Failed to connect to MongoDB', error);
   });

   // schema
   // Create user schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  gender: { type: String, required: true },
  availability: { type: String, required: true },
});

const User =  new mongoose.model('User', userSchema);

// Create Express app
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
