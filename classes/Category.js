import Book from "./Book.js";
import Library from "./Library.js";

class Category {
    static counter = 1;

    #id;
    #categoryName;
    #books;

    constructor(categoryName, library) {
        this.#id = Category.counter++;
        this.#categoryName = categoryName;
        this.#books = []; // Knygų masyvas

        if (library instanceof Library) {
            library.addCategory(this);
        } else {
            throw new Error("Pateikas parametras nepriklauso library klasei")
        }
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