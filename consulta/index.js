const express = require("express");
const app = express();
baseConsulta = {};

app.use(express.json());

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsulta[lembrete.contador] = lembrete;

    },
    ObservacaoCriada: (observacao) => {
        const observacoes =
            baseConsulta[observacao.lembreteId]["observacoes"] ||
            [];
        observacoes.push(observacao);
        baseConsulta[observacao.lembreteId]["observacoes"] =
            observacoes;

    }
};

app.get("/lembretes", (req, res) => {
    res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
    funcoes[req.body.tipo](req.body.dados);
    res.status(200).send(baseConsulta);
});

app.listen(6000, () => console.log("Consultas. Porta 6000"));
