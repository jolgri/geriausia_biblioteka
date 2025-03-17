class BorrowReturn {
    constructor(mainLibrary) {
        this.mainLibrary = mainLibrary;
        this.borrowBook = this.borrowBook.bind(this);
        this.returnBook = this.returnBook.bind(this);
    }

    displayBorrowBookForm(readerId) {
        const reader = this.mainLibrary.getReaderById(readerId);
        if (!reader) {
            console.error("Reader not found!");
            return;
        }

        const books = this.mainLibrary
            .getAllBooks()
            .filter((book) => book.checkAvailability());
        let bookOptions = books
            .map(
                (book) =>
                    `<option value="${book.getBookId()}">${book.getBookTitle()}</option>`
            )
            .join("");

        let formHtml = `
            <h3>Pasirinkite knygą skolintis</h3>
            <select id="borrowBookSelect">
                ${bookOptions}
            </select>
            <button id="borrowConfirmBtn" disabled>Patvirtinti</button>
            <button id="cancelBtn">Atšaukti</button>
        `;

        const modal = document.getElementById("modal");
        modal.innerHTML = formHtml;

        const borrowConfirmBtn = modal.querySelector("#borrowConfirmBtn");
        const selectElement = modal.querySelector("#borrowBookSelect");
        const cancelBtn = modal.querySelector("#cancelBtn");

        borrowConfirmBtn.disabled = books.length === 0;

        selectElement.addEventListener("change", () => {
            borrowConfirmBtn.disabled = !selectElement.value;
        });

        borrowConfirmBtn.addEventListener("click", () => this.borrowBook(readerId));

        cancelBtn.addEventListener("click", () => this.clearModal());
    }

    borrowBook(readerId) {
        console.log("borrowBook method called");
        const bookId = document.getElementById("borrowBookSelect").value;
        console.log("Book ID:", bookId);
        this.mainLibrary.borrowBook(readerId, bookId);
        this.mainLibrary.generateReadersList();
    }

    displayReturnBookForm(readerId) {
        const reader = this.mainLibrary.getReaderById(readerId);
        if (!reader) {
            console.error("Reader not found!");
            return;
        }

        const borrowedBooks = reader.getBorrowedBooks();
        if (borrowedBooks.length === 0) {
            console.log("Skaitytojas neturi pasiskolintų knygų.");
            return;
        }

        let bookOptions = borrowedBooks
            .map(
                (book) =>
                    `<option value="${book.getBookId()}">${book.getBookTitle()}</option>`
            )
            .join("");

        let formHtml = `
            <h3>Pasirinkite knygą grąžinti</h3>
            <select id="returnBookSelect">
                ${bookOptions}
            </select>
            <button id="returnConfirmBtn" disabled>Grąžinti</button>
            <button id="cancelBtn">Atšaukti</button>
        `;

        const modal = document.getElementById("modal");
        modal.innerHTML = formHtml;

        const returnConfirmBtn = modal.querySelector("#returnConfirmBtn");
        const selectElement = modal.querySelector("#returnBookSelect");
        const cancelBtn = modal.querySelector("#cancelBtn");

        returnConfirmBtn.disabled =  borrowedBooks.length === 0;

        selectElement.addEventListener('change', () => {
            returnConfirmBtn.disabled = !selectElement.value;
        });

        returnConfirmBtn.addEventListener("click", () => this.returnBook(readerId));

        cancelBtn.addEventListener("click", () => this.clearModal());
    }

    returnBook(readerId) {
        const bookId = document.getElementById("returnBookSelect").value;
        console.log("Book ID: " + bookId);
        if (bookId) {
            this.mainLibrary.returnBook(readerId, bookId);
            this.mainLibrary.generateReadersList();
            this.clearModal();
        } else {
            console.log("Pasirinkite knygą!");
        }
    }

    clearModal() {
        const modal = document.getElementById("modal");
        modal.innerHTML = "";
    }
}

export default BorrowReturn;
