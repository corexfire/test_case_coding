const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middleware/authMiddleware');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authRoutes); // Routes for login and register

// Example of protected route
app.get('/user', verifyToken, (req, res) => {
    // Your code to handle fetching user data
    res.json({ message: 'Protected route accessed successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;