const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
contador = 0;
lembretes = {};

app.get('/lembretes', (req, res) => {
    res.send(lembretes);
    console.log(lembretes);

});
app.put("/lembretes", async (req, res) => {
    console.log('___put___');


    contador++;

    const { texto } = req.body;
    lembretes[contador] = {
        contador, texto
    }

    await axios.post("http://localhost:10000/eventos", {
        tipo: "LembreteCriado",
        dados: {
            contador,
            texto,
        },
    });

    res.status(201).send(lembretes[contador]);
    console.log(contador);

});


app.listen(4000, () => {
    console.log('Lembretes. Porta 4000');
    console.log('deu certo ✅');

});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });

});
