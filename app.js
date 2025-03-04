import Category from "./classes/Category.js";
import Book from "./classes/Book.js";
import Library from "./classes/Library.js";
import Rating from "./classes/Rating.js";
import Reader from "./users/Reader.js";

const mainLibrary = new Library();
const categories = [];
const trileriuKategorija = new Category("Trileriai", mainLibrary); 
const siauboKategorija = new Category("Siaubo", mainLibrary); 
const komedijuKategorija = new Category("Komedija", mainLibrary); 

categories.push(trileriuKategorija, siauboKategorija, komedijuKategorija);

const newBook2 = new Book(
  "Džonas Vickas",
  "Jonas",
  trileriuKategorija,
  1234567891018,
  17.88,
  "Gera knyga",
  false
);
const newBook3 = new Book(
  "The Gift",
  "Jonas",
  trileriuKategorija,
  1234567891016,
  17.88,
  "Gera knyga",
  false
);

console.log(newBook3);
console.log(newBook2);

trileriuKategorija.addBook(newBook2); 
trileriuKategorija.addBook(newBook3);
console.log(trileriuKategorija.getBooksByPriceRange(15, 20));

const ivertinimas1 = new Rating("1", "GBS001", 5, "Gera skaityti tokią knygą");
console.log(ivertinimas1);

const skaitytojas1 = new Reader("Jonas", "jonas@jonaitis.com", 1234);
console.log(skaitytojas1);

//__________HTML turinio kurimas --> prideti kategorija________

const content = document.getElementById("content");

const showCategoryForm = document.getElementById("addCategoryOption");
showCategoryForm.addEventListener("click", () => displayAddCategoryForm());

function displayAddCategoryForm() {
  content.innerHTML = `
        <h2>Pridėti naują Kategoriją</h2>
        <form id="addCategoryForm" class="addForm">
            <label for="CategoryName">Kategorijos pavadinimas</label>
            <input type="text" id="CategoryName" required>

            <button class="btn" type="submit">Išsaugoti Kategoriją</button>

        </form>
    `;

  const categoryForm = document.getElementById("addCategoryForm");
  categoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const categoryName = e.target.CategoryName.value;

    const newCategory = new Category(categoryName, mainLibrary);
    categories.push(newCategory);
    console.log(`kategorijos objektas ${newCategory.getCategoryName()}`);

    e.target.reset();
  });
}

//__________HTML turinio kurimas -> parodyti kategorijas______

const showCategoryList = document.getElementById('showCategoryList');

showCategoryList.addEventListener('click', () => displayCategoryList());

function displayCategoryList() {
    if (categories.length === 0) {
        content.innerHTML = '<p>Nėra pridėtų kategorijų</p>';
        return;
    }

    let htmlContent = `<ul>`;
    categories.forEach(category => {
        htmlContent += `<li>${category.getCategoryName()}</li>`;
    });
    htmlContent += `</ul>`;

    content.innerHTML = htmlContent;
}

//__________HTML turinio kurimas --> prideti knyga________

const showBookForm = document.getElementById("addBookOption");

showBookForm.addEventListener("click", () => displayAddBookForm());

function displayAddBookForm() {
    content.innerHTML = `
      <h2>Pridėti naują knygą</h2>
  
      <form id="addBookForm" class="addForm">
  
          <label for="bookIsbn">Knygos ISBN:</label>
          <input type="text" id="bookIsbn" minlength="13" maxlength="13" required>
  
          <label for="bookTitle">Knygos pavadinimas:</label>
          <input type="text" id="bookTitle" required>
  
          <label for="bookAuthor">Knygos autorius:</label>
          <input type="text" id="bookAuthor" required>
  
          <label for="bookPrice">Knygos kaina:</label>
          <input type="text" id="bookPrice" required>
  
          <label for="bookDescription">Knygos aprašymas:</label>
          <textarea name="description" id="bookDescription" rows="5" cols="30"></textarea>
  
          <label for="categorySelect">Pasirinkite kategoriją:</label>
          <select id="categorySelect" required>
            <option value="">Pasirinkite kategoriją</option>
            ${mainLibrary
              .getCategories()
              .map(
                (category) =>
                  `<option value='${category.getCategoryName()}'>${category.getCategoryName()}</option>`
              )}
          </select>
  
          <button class="btn" type="submit">Išsaugoti Knygą</button>
      </form>
      `;
  
    const bookForm = document.getElementById("addBookForm");
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const bookIsbn = e.target.bookIsbn.value;
      const bookTitle = e.target.bookTitle.value;
      const bookAuthor = e.target.bookAuthor.value;
      const bookPrice = parseFloat(e.target.bookPrice.value); 
      const description = e.target.bookDescription.value;
      const categoryName = e.target.categorySelect.value;  
      const isCheckedOut = false;
  
      const category = mainLibrary.getCategories().find(c => c.getCategoryName() === categoryName);
      
      if (!category) {
          console.log("Category not found!");
          return;
      }
  
      const newBook = new Book(
        bookTitle,
        bookAuthor,
        category,
        bookIsbn,
        bookPrice,
        description,
        isCheckedOut
      );
  
      category.addBook(newBook);
      console.log(`Book "${newBook.getBookTitle()}" added to category "${category.getCategoryName()}"`);
      console.log(mainLibrary)
      e.target.reset();
    });
  }
  
//-------------HTML turinio kurimas-> KNYGU SARASAS------------------

const showBooksList = document.getElementById("showBooksList");

showBooksList.addEventListener("click", () => mainLibrary.generateBookList()); 
