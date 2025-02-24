
import Category from "./classes/Category.js";
import Book from "./classes/Book.js";


const newBook = new Book('Ledynmetis', 'Jonas', 'Siaubo', 1234567891014, 17.88, 'Gera knyga', false);
const newBook2 = new Book('Džonas Vickas', 'Jonas', 'Trileriai', 1234567891018, 17.88, 'Gera knyga', false);
const newBook3 = new Book('The Gift', 'Jonas', 'Trileriai', 1234567891016, 17.88, 'Gera knyga', false);



console.log(newBook)
console.log(newBook2);


const trileriuKategorija = new Category('Trileriai'); // sukuriam nauja kategorija
const siauboKategorija = new Category('Siaubo'); // sukuriam nauja kategorija
console.log(trileriuKategorija);  
console.log(siauboKategorija);

siauboKategorija.addBook(newBook);
trileriuKategorija.addBook(newBook2); // pridedam knyga prie sukurtos kategorijos
trileriuKategorija.addBook(newBook3);


console.log(trileriuKategorija.getBooksByAuthor('Jonas')) // isvedam kokias knygas turi autorius

console.log(siauboKategorija.getBooksByAuthor('Jonas')) // isvedam kokias knygas turi autorius

console.log(trileriuKategorija.getBooksByPriceRange(15, 20)); // isvedam kokios knygos patenka i intervala

siauboKategorija.setCategoryName('Komedija');

console.log(siauboKategorija);
