// const express = require("express") -> in package.json wordt via type="module" aangegeven dat we ES6 module syntax gebruiken
import express from "express";
import { join } from "path"; 
import __dirname from "./__dirname.js";

import GetalRadenSpel from "./Oefening2/getal-raden-spel.js";

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

app.use(express.json());

app.use("/", express.static(join(__dirname, '..', 'Client', 'Public')));
app.use("/onderdeel6/oefening1", express.static(join(__dirname, '..', 'Client', 'Public', 'Onderdeel6', 'Oefening1')));
app.use("/onderdeel6/oefening2", express.static(join(__dirname, '..', 'Client', 'Public', 'Onderdeel6', 'Oefening2')));
app.use("/onderdeel6/oefening3", express.static(join(__dirname, '..', 'Client', 'Public', 'Onderdeel6', 'Oefening3')));


/* Backend voor oefening 2 (getal raden online) */
let getalRadenSpel = new GetalRadenSpel();

app.get("/api/getalraden/status", (req, res) => {
    res.json(getalRadenSpel.spelstatus);
});


app.post("/api/getalraden/gok", (req, res) => {
    if (!req.body || !req.body.nickname) {
        res.status(400).send("'nickname' is verplicht.")
        return;
    }

    if (!req.body || !req.body.getal || isNaN(req.body.getal || req.body.getal < 0 || req.body.getal > 100)) {
        res.status(400).send("'getal' is verplicht, moet een number zijn en moet tussen 0 en 100 liggen")
        return;
    }


    let gokResultaat = getalRadenSpel.doeEenGok(req.body.nickname, req.body.getal);
    res.json(gokResultaat);
});

app.get("/api/getalraden/top10", (req, res) => {
    res.json(getalRadenSpel.top10Spelers);
});


app.listen(port, () => {
    console.log(`Node-Express server listening on port ${port}`);

    // Door één keer startSpel aan te roepen zal GetalRadenSpel nu 'oneindig' blijven werken (totdat we de server uitzetten).
    getalRadenSpel.startSpel();
});