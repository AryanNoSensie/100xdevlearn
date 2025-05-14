const express = require('express');
const app = express();
app.use(express.json());


// assignment one t0okcreate a timestamp , method and url of the casll

const logger = (req, res, next) => {
  const url = req.originalUrl;
  const method = req.method;
  const timestamp = new Date().toISOString();

  console.log(`${timestamp}] ${method} ${url}`);
  next();
};






//assignment 2 is to get all the toatal number of request made to to cakll the specific route 
let totalRequests = 0;

const totalRequestCounter = (req, res, next) => {
  totalRequests++; 
  console.log(`Total Requests So Far: ${totalRequests}`);
  next();
};

// Apply middleware to a specific route


app.get("/sum", logger ,totalRequestCounter  ,function(req, res) {
    
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});



app.listen(3000, () => {
  console.log('Server running on port 3000');
});