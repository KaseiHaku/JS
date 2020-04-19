let fs = require('demo/fs');


fs.readFile('./fsTest.txt', {encoding:'UTF-8', flag:'r'}, (err, data)=>{
    if (err === null) {
        console.log(data);
    } else {
        console.log(err);
    }
});


