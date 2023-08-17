const express = require("express");
const studentRoutes=require("./routes");

const app = express();
const port = 5000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use("/api/v1/student", studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));







