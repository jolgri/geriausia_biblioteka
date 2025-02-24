class Book {
  static bookId = 1;
  static existingIsbns = new Set();

  #title;
  #author;
  #isbn;
  #price;
  #description;
  #is_checked_out;
  availability;
  #category;

  // Konstruktorius
  constructor(
    bookTitle,
    bookAuthor,
    bookCategory,
    bookIsbn,
    bookPrice,
    bookDesc,
    is_checked_out
    
  ) {
    if (Book.existingIsbns.has(bookIsbn)) {
      throw new Error("Šis ISBN jau egzistuoja!");
    }

    if (!/^\d{13}$/.test(bookIsbn)) {
      throw new Error("ISBN turi būti 13 skaitmenų sveikasis skaičius.");
    }

    this.#isbn = bookIsbn;
    Book.existingIsbns.add(bookIsbn); // Add ISBN to unique set

    Book.bookId++;
    this.#title = bookTitle;
    this.#author = bookAuthor;
    this.#category = bookCategory;
    this.#price = bookPrice;
    this.#description = bookDesc;
    this.#is_checked_out = is_checked_out;
    this.availability = this.#is_checked_out ? "Knyga yra paimta" : "Knyga yra bibliotekoje";
  }

  // Getteriai
  getBookId() {
    return this.bookId;
  }

  getBookTitle() {
    return this.#title;
  }

  getBookAuthor() {
    return this.#author;
  }

  getCategory() {
    return this.#category.getCategoryName();
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
    if (newTitle) {
      this.#title = newTitle;
    } else {
      throw new Error("Aprašymas negali būti tuščias");
    }
  }

  setBookPrice(newPrice) {
    if (newPrice >= 0) {
      this.#price = newPrice;
    } else {
      throw new Error("Kaina negali būti mažesnė už 0");
    }
  }

  setDescription(newDescription) {
    if (newDescription) {
      this.#description = newDescription;
    } else {
      throw new Error("Aprašymas negali būti tuščias");
    }
  }

  setCategory(newCategory) {
    if (newCategory) {
      this.#category = newCategory;
    } else {
      throw new Error("Kategorija neparinkta");
    }
  }

  setIsbnNumber(newIsbn) {
    if (!/^\d{13}$/.test(newIsbn)) {
      throw new Error("ISBN turi būti 13 skaitmenų skaičius.");
    }

    if (Book.existingIsbns.has(newIsbn)) {
      throw new Error("Šis ISBN jau egzistuoja!");
    }

    //sena Isbn istrinti
    Book.existingIsbns.delete(this.#isbn);

    this.#isbn = newIsbn;
    Book.existingIsbns.add(newIsbn);
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
    return this.#is_checked_out ? "Knyga yra paimta" : "Knyga yra bibliotekoje";
  }

  // Info getteris
  getInfo() {
    return `Knygos pavadinimas: ${this.#title},
                  knygos autorius: ${this.#author},
                  knygos žanras: ${this.#category.getCategoryName()},
                  knygos kaina: ${this.#price},
                  knygos aprašymas: ${this.#description},
                  ar knyga pasiimta? ${this.checkAvailability}`;
  }
}

export default Book;
