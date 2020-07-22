const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/huella', async (req, res) => {
    res.send('Hello World!');
});

app.post('/checar', async (req, res) => {
    console.log(req.body);
    const {user, base} = req.body;
    res.status(500).send({user,base,msg:'checado'});
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));