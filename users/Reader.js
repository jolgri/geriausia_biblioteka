import Book from "../classes/Book.js";

class Reader {
    static readerCounter = 1;

    #readerName;
    #reader_id;
    #readerEmail; //TODO
    #readerPincode; //TODO
    static listOfReaaders = [];
    #borrowed_books =[];
   
    constructor(name, email, pincode){
    this.#readerName = name;
    this.#readerEmail = email;
    this.#readerPincode = pincode;
    this.#reader_id = 'GBS ' + Reader.readerCounter++;
    }
   
    getName(){
        return this.#readerName;
    }

    setName(name){
    this.#readerName = name;
    }

    getReaderId() {
        return this.#reader_id;
    }

    setReaderId(newId) {
        this.#reader_id = newId;
    }

    borrowBook(book){
        if ((book instanceof Book) && (book.checkAvailability() === 'Knyga yra bibliotekoje'))
        {
            this.#borrowed_books.push(book);
        } else {
        throw new Error ('Knyga jau yr paskolinta skatytojui');    
        }
    }
    
    getBorrowedBooks(){
        return this.#borrowed_books;
    }
    
}



export default Reader;