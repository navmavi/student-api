const express = require('express');
const studentRoutes = require('./routes');
const path = require('path');

const app = express();
const port = 5000;
app.use(express.json());

app.use('/api/v1/student', studentRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static', 'index.html'));
});

app.listen(port, () => console.log(`app listening on port ${port}`));
