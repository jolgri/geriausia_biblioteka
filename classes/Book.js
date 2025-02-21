class Book {
    #id;
    #title;
    #author;
    #isbn;
    #price;
    #description;
    #is_checked_out;
    availability;
    #category;
    //konstruktorius
    constructor(bookId, bookTitle, bookAuthor, bookCategory, bookIsbn, bookPrice, bookDesc, is_checked_out){
        this.#id = bookId;
        this.#title = bookTitle;
        this.#author = bookAuthor;
        this.#category = bookCategory;
        this.#isbn = bookIsbn;
        this.#price = bookPrice;
        this.#description = bookDesc;
        this.#is_checked_out = is_checked_out;
    }

    //getteriai
    getBookId(){
        return this.#id;
    }

    getBookTitle(){
        return this.#title;
    }

    getBookAuthor(){
        return this.#author;
    }

    getCategory(){
        return this.#category.getCategoryName();
    }

    getBookIsbn(){
        return this.#isbn;
    }

    getBookPrice(){
        return this.#price;
    }

    getBookDescription(){
        return this.#description;
    }

    getBookCheckOutStatus(){
        return this.#is_checked_out;
    }
    //setteriai
    setBookTitle(newTitle){
        this.#title = newTitle;
    }

    setBookPrice(newPrice){
        if (newPrice >=0){
            this.#price = newPrice;
        } else {
            throw new Error('kaina negali būti mažesnė už 0')
        }
    }
    setDescription(newDescription){
        this.#description = newDescription;
    }
    //methodai
    checkOut(){
        this.#is_checked_out = true;
    }

    checkIn(){
        this.#is_checked_out = false;
    }

    checkAvailability(){
        if (this.#is_checked_out = true){
            this.availability = 'Knyga yra paimta'
        } else {
            this.availability = 'Knyga yra bibliotekoje'
        }
    }
    //info getteris
    getInfo(){
        return `Knygos pavadinimas: ${this.#title},
                knygos autorius: ${this.#author},
                knygos žanras: ${this.#category.getCategoryName()},
                knygos kaina: ${this.#price},
                knygos aprasymas: ${this.#description},
                ar knyga pasiimta? ${this.availability}
        `
    }

}
export default Book;