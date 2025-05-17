const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());


app.get('/elf', (req, res) => {
  res.cookie('username', 'JohnDoe');
  res.json({
    message: 'Cookie set successfully',
  
  })
})

app.get('/read/', (req, res) => {
    console.log(req.cookies);
    res.send("read the pagesmf");
});






app.listen(3000, () => {
    console.log('Server is running on port 3000');
});