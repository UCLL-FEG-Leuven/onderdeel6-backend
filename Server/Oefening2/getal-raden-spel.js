import GokResultaat from "./gok-resultaat.js";
import Speler from "./speler.js";

const GETAL_VAN = 0;
const GETAL_TOT = 100;
const DUURTIJD_SPEL_IN_MSEC = 1 * 60 * 1000;
const WACHTTIJD_SPEL_IN_MSEC = 1 * 60 * 1000;

export default class GetalRadenSpel {    
    constructor() {
        // Een lijst van alle spelers (over alle spelletjes heen).
        // Op basis van deze lijst wordt ook de top 10 berekend.
        this._alleSpelers = [];

        // Dit zijn attributen die van belang zijn voor het huidige spel.
        this._spelBezig = null;
        this._huidigeSpelers = [];
        this._willekeurigGetal = null;
        this._spelGestartOp = null;
        this._volgendSpelStartOp = null
    }

    get spelstatus() {
        return {
            parameters: {
                getalVan: GETAL_VAN,
                getalTot: GETAL_TOT,
                duurtijdVanEenSpelInSeconden: DUURTIJD_SPEL_IN_MSEC,
                wachttijdVoorEenVolgendSpelInSeconden: WACHTTIJD_SPEL_IN_MSEC,    
            },
            bezig: this._spelBezig,
            aantalSecondenBezig: this._spelBezig ? Math.round((new Date() - this._spelGestartOp) / 1000) : null,            
            huidigeSpelers: this._spelBezig ? this._huidigeSpelers.map((speler) => speler.nickname) : null,
            volgendeSpelStartInSeconden: this._spelBezig ? null : Math.round((this._volgendSpelStartOp - new Date()) / 1000)
        }
    }

    get top10Spelers() {
        // Lage scores zijn de besten!
        let sortedSpelersFromLowestScoresToHighestScores = this._alleSpelers.sort((spelerA, spelerB) => {
            return spelerA.topscore - spelerB.topscore;
        });

        // De 10 eerste laagste scores zijn de besten
        return sortedSpelersFromLowestScoresToHighestScores.slice(0, 10).map((speler, i) => {
            return {
                positie: i+1, // 1: de speler met de laagste score, en dus de beste speler...
                nickname: speler.nickname,
                topscore: speler.topscore
            }
        });
    }

    startSpel() {
        this._willekeurigGetal = Math.round(Math.random() * 100);
        this._huidigeSpelers = [];

        this._spelGestartOp = new Date();
        this._volgendSpelStartOp = null;
        this._spelBezig = true;
        console.log("GetalRadenSpel gestart.");
    
        setTimeout(() => {
            this.stopSpel();
        }, DUURTIJD_SPEL_IN_MSEC);
    }

    doeEenGok(nickname, getal) {
        if (!this._spelBezig) {
            console.log(`Speler ${nickname} heeft een gok gedaan buiten de tijd.`);
            return new GokResultaat(null);            
        } else {
            let speler = this._alleSpelers.filter((speler) => speler.nickname === nickname);
            if (speler.length === 0) {
                console.log(`Speler ${nickname} speelt voor de eerste keer mee.`);
                speler = new Speler(nickname);
                this._alleSpelers.push(speler);
            } else {
                speler = speler[0];
            }
    
            let huidigeSpeler = this._huidigeSpelers.filter((speler) => speler.nickname === nickname);
            if (huidigeSpeler.length === 0) {
                console.log(`Speler ${nickname} speelt dit huidige spel voor de eerste keer mee.`);
                this._huidigeSpelers.push(speler);
                huidigeSpeler = speler;
            } else {
                huidigeSpeler = huidigeSpeler[0];
            }
    
            if (getal < this._willekeurigGetal) {
                // te laag
                console.log(`Speler ${nickname} heeft te laag gegokt.`);
                huidigeSpeler.heeftVerkeerdGegokt();
                return new GokResultaat(-1); 
            } else if (getal > this._willekeurigGetal) {
                // te hoog
                console.log(`Speler ${nickname} heeft te hoog gegokt.`);
                huidigeSpeler.heeftVerkeerdGegokt();
                return new GokResultaat(1); 
            } else { 
                // goed gegokt!
                huidigeSpeler.heeftGoedGegokt((new Date() - this._spelGestartOp) / 1000);
                console.log(`Speler ${nickname} heeft goed gegokt: de score is ${huidigeSpeler.score}. Zijn/haar beste score is ${huidigeSpeler.topscore}`);
                return new GokResultaat(0, huidigeSpeler.score); 
            }
        }
    }

    stopSpel() {
        this._spelBezig = false;
        this._spelGestartOp = null;
        this._volgendSpelStartOp = new Date(Date.now() + WACHTTIJD_SPEL_IN_MSEC)
        this._huidigeSpelers.forEach((speler) => {
            speler.reset();
        });

        console.log(`GetalRadenSpel gestopt. Er hebben ${this._huidigeSpelers.length} spelers meegespeeld. Nieuw spel start op ${this._volgendSpelStartOp.toISOString()}.`);

        setTimeout(() => {
            this.startSpel();
        }, this._volgendSpelStartOp - new Date());
    }
}