import Category from "./Category.js";

class Library {
    #categories;

    constructor() {
        this.#categories = []; 
    }

   
    getCategories() {
        return this.#categories;
    }

    
    addCategory(category) {
        if (category instanceof Category) {
            this.#categories.push(category);
        } else {
            throw new Error("Pridedamas objektas nėra kategorija");
        }
    }

   
    getCategoryById(categoryId) {
        return this.#categories.find(category => category.getCategoryId() === categoryId) || null;
    }

    
    getCategoryByName(categoryName) {
        return this.#categories.find(category => category.getCategoryName() === categoryName) || null;
    }
}

export default Library;
