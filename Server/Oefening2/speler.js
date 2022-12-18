// Iedereen begint met een slechtste score ...
const SLECHTSTE_SCORE = 100000;

export default class Speler {
    constructor(nickname) {
        this._nickname = nickname;

        // Dit zijn gegevens die bij één spelletje horen.
        // Deze worden bij de start van een nieuw spel weer gereset.
        this._aantalKeerGegokt = 0;
        this._score = SLECHTSTE_SCORE;

        // Dit zijn gegevens die voor alle spelletjes (die de speler gespeeld heeft) van toepassing zijn.
        this._topscore = SLECHTSTE_SCORE;
    }

    get nickname() {
        return this._nickname;
    }
    
    get score() {
        return this._score;
    }

    get topscore() {
        return this._topscore;
    }

    reset() {
        this._aantalKeerGegokt = 0;
        this._score = SLECHTSTE_SCORE;
    }

    heeftVerkeerdGegokt() {
        this._aantalKeerGegokt++;
    }

    heeftGoedGegokt(duurtijdInSeconden) {        
        this._aantalKeerGegokt++;
        this._score = this._aantalKeerGegokt * Math.ceil(duurtijdInSeconden);
        if (this._score < this._topscore) {
            this._topscore = this._score;
        }
    }
}