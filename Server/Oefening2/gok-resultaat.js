export const RESULTAAT_HOGER = "hoger";
export const RESULTAAT_LAGER = "lager";
export const RESULTAAT_JUIST = "juist";
export const RESULTAAT_GEEN_SPEL = "geenspel";

export class GokResultaat {
    constructor(resultaat, score) {
        this._resultaat = resultaat;
        this._score = score;
    }

    get resultaat() {
        return this._resultaat;
    }

    get score() {
        return this._score;
    }

    // JSON stringify gaat, indien een object een toJSON() methode heeft, deze methode aanroepen.
    // Zo kunnen we ervoor zorgen dat een teruggestuurde JSON voorstelling geen _ bevat.
    // Dus { "_resultaat": ... } wordt hiermee { "resultaat": ... } 
    toJSON() {
        return {
            resultaat: this.resultaat,
            score: this.score
        }
    }
}