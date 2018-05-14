
// I'm a child, i'm going to act like a server
// and nothing else
const express = require('express');
const crypto = require('crypto');
const { Worker } = require('webworker-threads');
const app = express();

app.get('/', (req, res) => {
    const worker = new Worker(function() {
        this.onmessage = function() {
            let counter = 0;
            while (counter < 1e9) {
                ++counter;
            }
            postMessage(counter);
        };
    });

    worker.onmessage = function(myCounter) {
        console.log(myCounter);
        res.send('' + message.data);
    };

    worker.postMessage();
});

app.get('/fast', (req, res) => {
    res.send('This was fast!!');
});

app.listen(3000);