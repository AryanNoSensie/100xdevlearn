const express = require('express');
const app = express();

const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library
const JWT_SECRET = "heytherearyan";

app.use(express.json()); // Middleware to parse JSON request bodies

//createing a inmomeory varibale 
const users = [];



// route to get the frintend 
app.get('/' , (req,res) =>{
    res.sendFile(__dirname + '/src/index.html');
})





//route to signup
app.post('/signup' , async (req,res) =>{
 const username = req.body.username;
 const password = req.body.password;

 users.push({
    username,
    password
 })
 res.json({
    message : "user is signed up successfully"
 })
console.log(users);
})



//route to signin
app.post('/signin' , async (req,res) =>{
    const username  = req.body.username;
    const password  = req.body.password;

    const founduser = users.find(user => user.username == username && user.password == password);


    if(founduser){
        const token = jwt.sign({
            username : username
        }, JWT_SECRET);

        res.json({
            message : "user is signed in successfully and here is the token of his account",
            token
        })
    }
    else{
        res.status(401).json({
            message : "user is not found"
        })
    }
    

})

//auth middleware 
function auth(req, res, next) {
    try {
        const token = req.headers.token;
        
        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.username = decoded.username;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

//me rourte to get the username bqack from token requested 


app.get('/me', auth , (req,res) =>{
   
    
    
    const founduser = users.find(user => user.username === req.username);

    if(founduser){
        res.json({
            message : "user is found" ,
            username : req.username,
            password : founduser.password
             

        })
    }
    else{
        res.status(401).json({
            message : "user is not found"
        })
    }

});




app.listen(3000, () => {
    console.log("server is running on port 3000");
})