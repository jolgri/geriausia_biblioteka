import Book from "./Book.js";

class Category {
    static counter = 1;//nuo nulio buti irgi tesiginai bet whatever

    #id;
    #categoryName;
    #books;

    constructor(categoryName) {
        this.#id = Category.counter++;
        this.#categoryName = categoryName;
        this.#books = []; // Knygų masyvas
    }

    // getteriai

    getCategoryId() {
        return this.#id;
    }

    getCategoryName() {
        return this.#categoryName
    }

    getBooks() {
        return this.#books;
    }

    getBooksByAuthor(authorName) {
        return this.#books.filter(book => book.getBookAuthor() === authorName);
    }

    getBooksByPriceRange(minPrice, maxPrice) {
        return this.#books.filter(book => book.getBookPrice() > minPrice && book.getBookPrice() < maxPrice);
    }

    // setteriai

    addBook(book) {
        if (book instanceof Book) {
            this.#books.push(book);
        } else {
            throw new Error("Pridedamas objektas nėra knyga");
        }
    }

    setCategoryName(newCategoryName) {
        if (newCategoryName) {
            this.#categoryName = newCategoryName;
        } else {
            throw new Error("Kategorijos pavadinimas negali būti tuščias");
        }
    }

}

export default Category;