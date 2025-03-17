import Book from "./Book.js";
import Library from "./Library.js";

class Category {
    static counter = 1;

    #id;
    #categoryName;
    #books;
    #library;

    constructor(categoryName, library) {
        this.#id = Category.counter++;
        this.#categoryName = categoryName;
        this.#books = []; // Knygų masyvas
        this.#library = library;

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

    removeBook(book) {
        const bookIndex = this.#books.indexOf(book);
        if (bookIndex !== -1) {
            this.#books.splice(bookIndex, 1);
        } else {
            throw new Error("Knyga nerasta kategorijoje");
        }
    }

    setCategoryName(newCategoryName) {
        if (newCategoryName) {
            this.#categoryName = newCategoryName;
        } else {
            throw new Error("Kategorijos pavadinimas negali būti tuščias");
        }
    }
    attachEditListeners(categories, displayCategoryList) { // Pridedam categories kaip parametrą
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-category-id');
                console.log(`Redaguoti kategoriją su ID: ${categoryId}`);
                this.editCategory(categoryId, categories, displayCategoryList);
            });
        });

    attachEditListeners(categories, displayCategoryList) { // Pridedam categories kaip parametrą
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-category-id');
                console.log(`Redaguoti kategoriją su ID: ${categoryId}`);
                this.editCategory(categoryId, categories, displayCategoryList);
            });
        });

        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-category-id');
                // console.log(typeof categoryId)
                console.log(`Ištrinti kategoriją su ID: ${categoryId}`);
                this.deleteCategory(categoryId, categories, displayCategoryList);
            });
        });
    }

    editCategory(categoryId, categories, displayCategoryList) {
        const category = categories.find(cat => cat.getCategoryId() === parseInt(categoryId));

        if (!category) {
            console.error('Kategorija nerasta!');
            return;
        }

        const content = document.getElementById('content');
        content.innerHTML = this.getEditFormHTML(category);

        const editForm = document.getElementById('editCategoryForm');
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newCategoryName = e.target.editCategoryName.value;
            category.setCategoryName(newCategoryName);

            displayCategoryList(); // Atnaujiname sąrašą
        });
    }

    deleteCategory(categoryId, categories, displayCategoryList) {
        const category = categories.findIndex(c => c.getCategoryId() === parseInt(categoryId));
        if (category !== -1) {
            categories.splice(category, 1);
        }
        displayCategoryList();
        console.log(`${categoryId} buvo pasalinta.`)
    }
    getEditFormHTML(category) {
        return `
        <h2>Redaguoti Kategoriją</h2>
     <form id="editCategoryForm" class="addForm">
        <label for="editCategoryName">Kategorijos pavadinimas</label>
        <input type="text" id="editCategoryName" value="${category.getCategoryName()}" required>
        <button class="btn" type="submit">Išsaugoti Kategoriją</button>
    </form>
    `;
    }
}

export default Category;