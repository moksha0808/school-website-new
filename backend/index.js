require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const studentRoutes = require('./routes/students');
const adminRoutes = require('./routes/admin');

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/apply', studentRoutes);
app.use('/applications', adminRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
