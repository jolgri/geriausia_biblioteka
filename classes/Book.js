import Library from "./Library.js";

class Book {
  static bookCounter = 0;
  static existingIsbns = new Set();

  #bookId;
  #title;
  #author;
  #isbn;
  #price;
  #description;
  #is_checked_out;
  availability;
  #category;

  constructor(
    bookTitle,
    bookAuthor,
    bookCategory,
    bookIsbn,
    bookPrice,
    bookDesc,
    is_checked_out

  ) {

    if (!bookAuthor || typeof bookAuthor !== "string") {
      throw new Error("Autorius privalo egzistuoti");
    }

    if (!bookTitle || typeof bookTitle !== "string") {
      throw new Error("Pavadinimas negali būti tuščias.");
    }

    if (Book.existingIsbns.has(bookIsbn)) {
      throw new Error("Toks ISBN jau egzistuoja");
    }
    
    this.#isbn = bookIsbn;  // Assign the ISBN here
    Book.existingIsbns.add(this.#isbn);  // Add the ISBN after assigning it to this.#isbn

    Book.bookCounter++;
    this.#bookId = Book.bookCounter;
    this.#title = bookTitle;
    this.#author = bookAuthor;
    this.#category = bookCategory;
    this.#price = bookPrice;
    this.#description = bookDesc;
    this.#is_checked_out = is_checked_out;
    this.availability = this.#is_checked_out
      ? "Knyga yra paimta"
      : "Knyga yra bibliotekoje";
  }

  // Getteriai
  getBookId() {

    return this.#bookId;
  }

  getBookTitle() {
    return this.#title;
  }

  getBookAuthor() {
    return this.#author;
  }

  getCategory() {
    return this.#category.getCategoryName ? this.#category.getCategoryName() : this.#category;
  }

  getBookIsbn() {
    return this.#isbn;
  }

  getBookPrice() {
    return this.#price;
  }

  getBookDescription() {
    return this.#description;
  }

  getBookCheckOutStatus() {
    return this.#is_checked_out;
  }

  // Setteriai
  setBookTitle(newTitle) {

    if (!newTitle || typeof newTitle !== "string") {
      throw new Error("Pavadinimas negali būti tuščias.");
    }
    this.#title = newTitle;
  }

  setBookPrice(newPrice) {

    if (newPrice <= 0 || typeof newPrice !== "number") {
      throw new Error("Kaina negali būti mažesnė už 0");
    } else {
      this.#price = newPrice;
    }
    this.#price = newPrice;
  }

  setDescription(newDescription) {

    if (!newDescription || typeof newDescription !== "string") {
      throw new Error("Aprašymas negali būti tuščias");
    } else {
      this.#description = newDescription;
    }
    this.#description = newDescription;
  }

  setCategory(newCategory) {

    if (!newCategory || typeof newCategory !== "string") {
      throw new Error("Kategorija neparinkta");
    } else {
      this.#category = newCategory;
    }

    this.#category = newCategory;
  }

  // Methodai
  checkOut() {
    this.#is_checked_out = true;
    this.availability = "Knyga yra paimta";
  }

  checkIn() {
    this.#is_checked_out = false;
    this.availability = "Knyga yra bibliotekoje";
  }

  checkAvailability() {
    return this.availability; // Return the string status
  }

  setAvailability(status) {
    this.availability = status;
  }

  // Info getteris
  getInfo() {
    return `Knygos pavadinimas: ${this.#title},

            knygos autorius: ${this.#author},
            knygos žanras: ${this.getCategory()},
            knygos kaina: ${this.#price},
            knygos aprašymas: ${this.#description},
            ar knyga pasiimta? ${this.checkAvailability() ? "Taip" : "Ne"},
            knygos id : ${this.#bookId}`;
  }
}

export default Book;