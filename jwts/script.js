const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies


const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library
const JWT_SECRET ="aryanisok";

//in memory varibale 
const users = [];


//token generation function using it from 100xdev given in the example

// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         // use a simple function here
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }




//route to sign up 
app.post('/signup' , async function (req,res) {
    const username  = req.body.username;
    const password  = req.body.password ;

    users.push({
        username,password
    })
    res.json({
        message : "user is sihnied up successfully "
    })
    console.log(users);

})



//route to sign in 

app.post('/signin' , async function (req,res) {
     const username  = req.body.username;
    const password  = req.body.password ;


    const user = users.find(user => user.username === username && user.password === password);

    if(user){
        const token = jwt.sign({ 
            username: username 
        }, JWT_SECRET);
       // Assign the token to the user object
        res.json({
            message : "user is signed in successfully",
             token
        })
       
    }else{
        res.status(401).json({
            message : "user is not found"
        })
    }
     console.log(users);

})


//me end point to send token to server as authnetication acess
 
app.get('/me', async function (req,res) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;

    const user = users.find(user => user.username == username);

    if(user){
        res.json({
            message : "user is authenticated",
            user : user.username,
            password : user.password
        })

    }
    else{
        res.status(401).json({
            message : "user is not authenticated something wrong with tokens"
        })
    }
})
//app post 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})