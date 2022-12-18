export default class GokResultaat {
    constructor(resultaat, score) {
        this._resultaat = resultaat;
        this._score = score ? score : null;
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