class Reader {
  constructor(name, email) {
    this.readerId = Reader.generateId();  // Automatically assign an ID
    this.name = name;
    this.email = email;
    this.borrowedBooks = [];
  }

  static generateId() {
    return Math.floor(Math.random() * 1000);  
  }

  getReaderId() {
    return this.readerId;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getBorrowedBooks() {
    return this.borrowedBooks;
  }

  borrowBook(book) {
    this.borrowedBooks.push(book);
  }

  returnBook(book) {
    this.borrowedBooks = this.borrowedBooks.filter(b => b.getBookId() !== book.getBookId());
}
}
export default Reader;
