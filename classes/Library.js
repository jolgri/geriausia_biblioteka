
class Library {
    
    #categories;
    #categoryId;

    constructor(pavadinimas, Id){

    this.#categories = pavadinimas;
    this.#categoryId = Id;

    }

    getCategories(){
    return this.#categories;
    }

    setCategories(category){
        this.#categories = category;
    }
}
 export default Library;
// const knyg1 = new Library('detektyvai', "00022");
// console.log(knyg1.setCategories('romanas'));
// console.log(knyg1.getCategories())



