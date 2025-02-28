import Category from "./classes/Category.js";
import Book from "./classes/Book.js";
import Library from "./classes/Library.js";
import Rating from "./classes/Rating.js";
import Reader from "./users/Reader.js";


const categories = [];
const trileriuKategorija = new Category('Trileriai'); // sukuriam nauja kategorija
const siauboKategorija = new Category('Siaubo'); // sukuriam nauja kategorija
const komedijuKategorija = new Category('Komedija'); // sukuriam nauja kategorija

categories.push(trileriuKategorija, siauboKategorija, komedijuKategorija);


const newBook = new Book('Ledynmetis', 'Jonas', siauboKategorija, 1234567891014, 17.88, 'Gera knyga', false);
const newBook2 = new Book('Džonas Vickas', 'Jonas', trileriuKategorija, 1234567891018, 17.88, 'Gera knyga', false);
const newBook3 = new Book('The Gift', 'Jonas', trileriuKategorija, 1234567891016, 17.88, 'Gera knyga', false);



console.log(newBook)
console.log(newBook2);


siauboKategorija.addBook(newBook);
trileriuKategorija.addBook(newBook2); // pridedam knyga prie sukurtos kategorijos
trileriuKategorija.addBook(newBook3);


console.log(trileriuKategorija.getBooksByAuthor('Jonas')) // isvedam kokias knygas turi autorius

console.log(siauboKategorija.getBooksByAuthor('Jonas')) // isvedam kokias knygas turi autorius

console.log(trileriuKategorija.getBooksByPriceRange(15, 20)); // isvedam kokios knygos patenka i intervala

console.log(siauboKategorija);

const library = new Library();


library.addCategory(trileriuKategorija);
library.addCategory(siauboKategorija);

console.log(library);

const ivertinimas1 = new Rating('1', 'GBS001', 5, 'Gera skaityti tokią knygą');
console.log(ivertinimas1);

const skaitytojas1 = new Reader('Jonas', 'jonas@jonaitis.com', 1234);
console.log(skaitytojas1);






//__________HTML turinio kurimas --> prideti kategorija________

const content = document.getElementById('content');

const showCategoryForm = document.getElementById('addCategoryOption');
showCategoryForm.addEventListener('click', () => displayAddCategoryForm())

function displayAddCategoryForm() {

    content.innerHTML = `
        <h2>Pridėti naują Kategoriją</h2>
        <form id="addCategoryForm" class="addForm">
            <label for="CategoryName">Kategorijos pavadinimas</label>
            <input type="text" id="CategoryName" required>

            <button class="btn" type="submit">Išsaugoti Kategoriją</button>

        </form>
    `;

    const categoryForm = document.getElementById('addCategoryForm');
    categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const categoryName = e.target.CategoryName.value;
        // console.log(`kategorijos pavadinimas ${categoryName}`)

        const newCategory = new Category(categoryName);
        categories.push(newCategory);
        console.log(`kategorijos objektas ${newCategory.getCategoryName()}`)

        e.target.reset();
    })
}
//__________HTML turinio kurimas -> parodyti kategorijas______

const showCategoryList = document.getElementById('showCategoryList');

showCategoryList.addEventListener('click', () => displayCategoryList())

function displayCategoryList() {
    if (categories.length === 0) {
        content.innerHTML = '<p>Nėra pridėtų kategorijų</p>';
        return;
    }

    let htmlContent = `<ul>`;
    htmlContent += `</ul>`;
    categories.forEach(category => {
        htmlContent += `<li>${category.getCategoryName()}</li>`;
    });


    content.innerHTML = htmlContent;
}




