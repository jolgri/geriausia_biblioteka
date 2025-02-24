import Book from "./Book.js";
class Reader {

    #readerName;
    #reader_id;
    #readerCounter;
    #readerEmail;
    #readerPincode;
    static listOfReaaders = [];
    #borrowed_books =[];
   
    constructor(name, email, pincode){
    this.#readerName = name;
    this.#readerEmail = email;
    this.#readerPincode = pincode;
    this.#reader_id = 'GBS' +this.#readerCounter;
    this.#readerCounter += 1; 
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
    // returnBook(book){
    //    this.#borrowed_books[].push(book.getInfo());
    //     } else {
    //     throw new Error ('Prašome kreiptis į darbuotoją dėl knygos grąžinimo, nes automatizuota sistema');    
    //     }
    // }
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