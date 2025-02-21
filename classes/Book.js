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
    
    //zemiau esantis if'ai uztikrina kad knyga tures Autoriu, Categorija ir Pavadinima bei visi sie bus stringai, ne skaiciai ar dar koks netinkamo tipo dalykas

    if (bookAuthor.trim().length === 0 || typeof bookAuthor !== "string") {
      throw new Error("Autorius privalo egzistuoti");
    }

    if (bookCategory.trim().length === 0 || typeof bookCategory !== "string") {
      throw new Error("Kategorija privalo buti");
    }

    if (bookTitle.trim().length === 0 || typeof bookTitle !== "string") {
      throw new Error("Pavadinimas negali būti tuščias.");
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
    this.availability = this.#is_checked_out
      ? "Knyga yra paimta"
      : "Knyga yra bibliotekoje";
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
    if (newTitle.trim().length === 0 || typeof newTitle !== "string") {
      throw new Error("Pavadinimas negali būti tuščias.");
    }
    this.#title = newTitle;
  }

  setBookPrice(newPrice) {
    if (newPrice === 0 || typeof newPrice !== "number") {
      throw new Error("Kaina negali būti mažesnė už 0");
    } else {
      this.#price = newPrice;
    }
  }

  setDescription(newDescription) {
    if (
      newDescription.trim().length === 0 ||
      typeof newDescription !== "string"
    ) {
      throw new Error("Aprašymas negali būti tuščias");
    } else {
      this.#description = newDescription;
    }
  }

  setCategory(newCategory) {
    if (newCategory.trim().length === 0 || typeof newCategory !== "string") {
      throw new Error("Kategorija neparinkta");
    } else {
      this.#category = newCategory;
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
