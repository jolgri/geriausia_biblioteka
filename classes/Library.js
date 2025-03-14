
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
                <button onclick="library.displayEditReaderForm(${reader.getReaderId()})">Redaguoti</button>
                <button onclick="borrowReturn.displayBorrowBookForm(${reader.getReaderId()})">Skolintis knygą</button>
                <button onclick="borrowReturn.displayReturnBookForm(${reader.getReaderId()})">Grąžinti knygą</button>
                <button class="delete-reader" data-reader-id="${reader.getReaderId()}">Ištrinti skaitytoją</button>
              </td>
            </tr>`;
      });
    }
  
    htmlContent += `</tbody></table>`;
    document.getElementById("content").innerHTML = htmlContent;
  
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-reader")) {
        const readerId = e.target.getAttribute("data-reader-id");
        this.deleteReader(readerId);
      }
    });
  }
  
  //----------BOOK CONTROL---------------///
  displayEditBookForm(bookId) {
    bookId = Number(bookId);
    const book = this.getAllBooks().find((b) => b.getBookId() === bookId);

    if (!book) {
      console.log("Book not found!");
      return;
    }

    const content = document.getElementById("content");
    content.innerHTML = `
      <h2>Redaguoti knygą</h2>
      <form id="editBookForm" class="addForm">
          <label for="editBookTitle">Knygos pavadinimas:</label>
          <input type="text" id="editBookTitle" value="${book.getBookTitle()}" required>

          <label for="editBookAuthor">Knygos autorius:</label>
          <input type="text" id="editBookAuthor" value="${book.getBookAuthor()}" required>

          <label for="editBookPrice">Knygos kaina:</label>
          <input type="text" id="editBookPrice" value="${book.getBookPrice()}" required>

          <label for="editCategorySelect">Pasirinkite kategoriją:</label>
          <select id="editCategorySelect">
            <option value="">Pasirinkite kategoriją</option>
            ${this.getCategories()
              .map(
                (category) =>
                  `<option value='${category.getCategoryName()}' ${
                    book.getCategory()?.getCategoryName() === category.getCategoryName()
                      ? "selected"
                      : ""
                  }>${category.getCategoryName()}</option>`
              )
              .join("")}
          </select>

          <button class="btn" type="submit">Išsaugoti pakeitimus</button>
      </form>
    `;

    document.getElementById("editBookForm").addEventListener("submit", (e) => {
      e.preventDefault();

      book.setBookTitle(e.target.editBookTitle.value);
      book.setBookAuthor(e.target.editBookAuthor.value);
      book.setBookPrice(parseFloat(e.target.editBookPrice.value));

      const newCategoryName = e.target.editCategorySelect.value;
      const newCategory = this.getCategories()
        .find((c) => c.getCategoryName() === newCategoryName);

      if (newCategory) {
        book.setCategory(newCategory);
      } else {
        book.setCategory(null);
      }

      console.log(`Book "${book.getBookTitle()}" updated!`);
      this.generateBookList();
    });
  }


  generateBookList() {
    const books = this.getAllBooks();
  
    if (books.length === 0) {
      content.innerHTML = "<p>Nėra pridėtų knygų</p>";
      return;
    }
  
    let htmlContent = `<table>
      <tr>
          <th>Eil. nr.</th>
          <th>ID</th>
          <th>Pavadinimas</th>
          <th>Autorius</th>
          <th>Kaina</th>
          <th>Kategorija</th>
          <th>Prieinamumas</th>
          <th>Veiksmai</th>
      </tr>`;
  
    books.forEach((book, index) => {
      const categoryName = book.getCategory() ? book.getCategory().getCategoryName() : "Be kategorijos";
      console.log(`Book ${book.getBookId()}:`, book);
      console.log(`Category for Book ${book.getBookId()}:`, categoryName);
  
      htmlContent += `
        <tr>
            <td>${index + 1}</td>
            <td>${book.getBookId()}</td>
            <td>${book.getBookTitle()}</td>
            <td>${book.getBookAuthor()}</td>
            <td>${book.getBookPrice()} €</td>
            <td>${categoryName}</td>
            <td>${book.checkAvailability() ? 'Pasiekiama' : 'Nepasiekiama'}</td>
            <td>
                <button data-book-id="${book.getBookId()}" class="edit-book action-btn">
                    <img src="./assets/imgs/edit.svg" width="25px">
                </button>
                <button data-book-id="${book.getBookId()}" class="delete-book action-btn">
                    <img src="./assets/imgs/delete.svg" width="25px">
                </button>
            </td>
        </tr>`;
    });
  
    htmlContent += `</table>`;
    content.innerHTML = htmlContent;
  
    document.querySelectorAll(".edit-book").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const bookId = e.currentTarget.getAttribute("data-book-id");
        this.displayEditBookForm(bookId);
      });
    });
  
    document.querySelectorAll(".delete-book").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const bookId = e.currentTarget.getAttribute("data-book-id");
        this.deleteBook(bookId);
      });
    });
  }

  deleteBook(bookId) {
    const books = this.getAllBooks();
    const bookIndex = books.findIndex((b) => b.getBookId() === parseInt(bookId));
  
    if (bookIndex !== -1) {
      const book = books[bookIndex];
  
      // Jei knyga paskolinta neleis jos istrinti
      if (!book.checkAvailability()) {
        console.log("Knyga negalima pašalinti, nes ji pasiskolinta.");
        return;
      }
  
      const category = book.getCategory();
      if (category) {
        const categoryBooks = category.getBooks();
        const bookCategoryIndex = categoryBooks.indexOf(book);
        categoryBooks.splice(bookCategoryIndex, 1);
      }
  
      books.splice(bookIndex, 1);
  
      console.log(`Book with ID ${bookId} deleted.`);
      this.generateBookList();
    } else {
      console.log(`Book with ID ${bookId} not found.`);
    }
  }

editBook(bookIsbn, newTitle, newAuthor, newPrice, newDescription) {
  this.categories.forEach(category => {
      const book = category.getBooksList().find(book => book.getBookIsbn() === bookIsbn);
      if (book) {
          book.setBookTitle(newTitle);
          book.setBookAuthor(newAuthor);
          book.setBookPrice(newPrice);
          book.setBookDescription(newDescription);
          console.log(`Book with ISBN ${bookIsbn} updated.`);
      }
  });
  this.generateBookList(); 
}
//----------READER CONTROL---------------///
deleteReader(readerId) {
  readerId = parseInt(readerId);

  const readerIndex = this.readers.findIndex((reader) => reader.getReaderId() === readerId);

  if (readerIndex !== -1) {
    const reader = this.readers[readerIndex];
    console.log("Reader to delete:", reader);

    const borrowedBooks = reader.getBorrowedBooks();
    console.log("Borrowed books:", borrowedBooks);

    borrowedBooks.forEach((book) => {
      this.returnBook(reader.getReaderId(), book.getBookId());
      book.setAvailability(true);
      console.log(`Grąžinta knyga: ${book.getBookTitle()}`);
    });

    this.readers.splice(readerIndex, 1);
    console.log(`Skaitytojas su ID ${readerId} ištrintas.`);
    this.generateReadersList();
  } else {
    console.log(`Skaitytojas su ID ${readerId} nerastas.`);
  }
}
//TODO Jolanta, pasiskaitykit pagalvokit kaip padaryti veikianti editReader ir displayEditReaderForm

  getCategories() {
    return this.categories;
  }
}

export default Library;