// const express = require('express');
// // const cookieParser = require('cookie-parser');
// const app = express();
// app.use(express.json());
// // app.use(cookieParser());


// app.get('/elf', (req, res) => {
//   res.cookie('username', 'JohnDoe');
//   res.json({
//     message: 'Cookie set successfully',
  
//   })
// })

// // app.get('/read/', (req, res) => {
// //     console.log(req.cookies);
// //     res.send("read the pagesmf");
// // });


const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.get('/elf', (req, res) => {
 bcrypt.compare("aryanisgreat", "$2b$10$2A4KM1aoKIewfw8Q3k3.QOG2QJrbhHLaRjZ0s9bgDldaasmqjIUfG", function(err, result) {
    // result == truecons
    console.log(result);
});
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
