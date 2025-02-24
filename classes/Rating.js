export default class Rating {
    #id;
    #bookId;
    #readerId;
    #rating;
    #comment;

    static #counter = 1;


    //Constructor
<<<<<<< HEAD
    constructor (bookId, readerId, rating, comment) {
=======
    constructor(bookId, readerId, rating, comment) {
>>>>>>> 6942b060584488da40dca106846164518fa484a0
        this.#id = Rating.#counter++;
        this.#bookId = bookId;
        this.#readerId = readerId; 

        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            throw new Error ("Įvertinimas negali būti mažesnis už 1 ir didesnis už 5");
        }

        this.#rating = rating;
        this.#comment = comment;
    }


    //Getter'iai
    getId(){
        return this.#id;
    }

    getBookId(){
        return this.#bookId;
    }

    getReaderId(){
        return this.#readerId;
    }

    getRating(){
        return this.#rating;
    }

    getComment(){
        return this.#comment;
    }

    

    //Setter'iai

    setRating(newRating) {
        if (!Number.isInteger(newRating) || newRating < 1 || newRating > 5) {
            throw new Error("Įvertinimas turi būti skaičius nuo 1 iki 5.");
        }
        this.#rating = newRating;
    }

    setComment(newComment){
        this.#comment = newComment;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 6942b060584488da40dca106846164518fa484a0
