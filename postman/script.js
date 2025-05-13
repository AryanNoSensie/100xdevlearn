const express = require('express');

const app = express();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})


//creating a function of summing but taling input from query parameters 

function sum (n){
    let ans = 0;
    for (let i = 0; i < n; i++){
        ans = ans + i;
    }
    return ans;

}

//creating a first route
//w 

app.get('/', (req,res) => {
    const n = req.query.n;
    const ans  = sum(n);
    
    res.send('Hello World ur ans is ' + ans);
})
