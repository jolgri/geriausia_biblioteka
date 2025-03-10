class Library {
  constructor() {
    this.categories = [];
    this.readers = [];
  }

  addCategory(category) {
    this.categories.push(category);
  }

  addReader(reader) {
    this.readers.push(reader);
  }

  getReaderById(readerId) {
    return this.readers.find(reader => reader.getReaderId() === readerId) || null;
  }

  getAllBooks() {
    return this.categories.flatMap((category) => category.getBooks());
  }

  getBookById(bookId) {
    console.log("Checking all categories for books...");
    
    for (let category of this.categories) {
      const booksInCategory = category.getBooks();
      console.log("Books in this category:", booksInCategory);
      
      const book = booksInCategory.find(b => b.getBookId() === bookId);
      
      if (book) {
        console.log("Book found:", book);
        return book;
      }
    }
  
    console.log("Book not found");
    return null; 
  }

  borrowBook(readerId, bookId) {
    readerId = Number(readerId);
    bookId = Number(bookId);

    const reader = this.getReaderById(readerId);
    const book = this.getBookById(bookId);
  
    if (reader && book && book.checkAvailability() === "Knyga yra bibliotekoje") {
      if (reader.getBorrowedBooks().some(b => b.getBookId() === bookId)) {
        console.log("Klaida: Skaitytojas jau turi šią knygą.");
        return;
      }
  
      reader.borrowBook(book);

      book.setAvailability(false);
      console.log(`Skaitytojas ${reader.getName()} pasiskolino knygą: ${book.getBookTitle()}`);
    } else {
      console.log("Knyga negalima pasiskolinti (jau paimta).");
    }
  }

  returnBook(readerId, bookId) {
    readerId = Number(readerId);
    bookId = Number(bookId);
    
    const reader = this.getReaderById(readerId);
    const book = reader
      ?.getBorrowedBooks()
      .find((book) => book.getBookId() === bookId);

    if (!reader || !book) {
      console.log("Klaida: Skaitytojas arba knyga nerasta jo sąraše.");
      return;
    }

    reader.returnBook(book);
    book.setAvailability(true);
    console.log(
      `Skaitytojas ${reader.getName()} grąžino knygą: ${book.getBookTitle()}`
    );
  }

  generateReadersList() {
    let htmlContent = `<table border="1" style="width:100%; border-collapse: collapse;">
                         <thead>
                           <tr>
                             <th>Identifikacija</th>
                             <th>Vardas</th>
                             <th>Elektroninis paštas</th>
                             <th>Pasiskolintos knygos</th>
                             <th>Veiksmai</th>
                           </tr>
                         </thead>
                         <tbody>`;

    if (this.readers.length === 0) {
      htmlContent += `<tr><td colspan="5" style="text-align:center;">Nėra skaitytojų!</td></tr>`;
    } else {
      this.readers.forEach((reader) => {
        const borrowedBooks =
          reader
            .getBorrowedBooks()
            .map((book) => book.getBookTitle())
            .join(", ") || "Nėra";

        htmlContent += `
                <tr>
                  <td>${reader.getReaderId()}</td>
                  <td>${reader.getName()}</td>
                  <td>${reader.getEmail()}</td>
                  <td>${borrowedBooks}</td>
                  <td>
                    <button onclick="borrowReturn.displayBorrowBookForm(${reader.getReaderId()})" class="">Skolintis knygą</button>
                    <button onclick="borrowReturn.displayReturnBookForm(${reader.getReaderId()})">Grąžinti knygą</button>
                  </td>
                </tr>`;
      });
    }
    htmlContent += `</tbody></table>`;
    document.getElementById("content").innerHTML = htmlContent;
  }

  generateBookList() {
    let htmlContent = `<table border="1" style="width:100%; border-collapse: collapse;">
                         <thead>
                           <tr>
                             <th>Kategorija</th>
                             <th>Pavadinimas</th>
                             <th>Autorius</th>
                             <th>Kaina</th>
                             <th>Aprašymas</th>
                             <th>Prieinamumas</th>
                             <th>ISBN</th>
                           </tr>
                         </thead>
                         <tbody>`;
  
    if (this.categories.length === 0) {
      htmlContent += `<tr><td colspan="7" style="text-align:center;">Nėra kategorijų arba knygų!</td></tr>`;
    } else {
      this.categories.forEach(category => {
        const books = category.getBooks();
  
        if (books.length === 0) {
          htmlContent += `<tr><td colspan="7" style="text-align:center;">Šioje kategorijoje nėra knygų.</td></tr>`;
        } else {
          books.forEach(book => {
            const info = book.getInfo();
  
            htmlContent += `
              <tr>
                <td>${category.getCategoryName()}</td>
                <td>${book.getBookTitle()}</td>
                <td>${book.getBookAuthor()}</td>
                <td>${book.getBookPrice().toFixed(2)} EUR</td>s
                <td>${book.getBookDescription()}</td>
                <td>${book.checkAvailability() ? 'Pasiekiama' : 'Nepasiekiama'}</td>
                <td>${book.getBookIsbn()}</td>
              </tr>`;
          });
        }
      });
    }
  
    htmlContent += `</tbody></table>`;
  
    document.getElementById("content").innerHTML = htmlContent;
  }

  // Method to get all categories
  getCategories() {
    return this.categories;
  }
}

export default Library;
