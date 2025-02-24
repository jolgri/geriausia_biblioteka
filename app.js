import Category from "./classes/Category.js";
import Book from "./classes/Book.js";
import Library from "./classes/Library.js";
import Rating from "./classes/Rating.js";
import Reader from "./classes/Reader.js";


const newBook = new Book('Ledynmetis', 'Jonas', 'Siaubo', 1234567891014, 17.88, 'Gera knyga', false);
const newBook2 = new Book('Džonas Vickas', 'Jonas', 'Trileriai', 1234567891018, 17.88, 'Gera knyga', false);
const newBook3 = new Book('The Gift', 'Jonas', 'Trileriai', 1234567891016, 17.88, 'Gera knyga', false);



console.log(newBook)
console.log(newBook2);


const trileriuKategorija = new Category('Trileriai'); // sukuriam nauja kategorija
const siauboKategorija = new Category('Siaubo'); // sukuriam nauja kategorija

siauboKategorija.addBook(newBook);
trileriuKategorija.addBook(newBook2); // pridedam knyga prie sukurtos kategorijos
trileriuKategorija.addBook(newBook3);


console.log(trileriuKategorija.getBooksByAuthor('Jonas')) // isvedam kokias knygas turi autorius

console.log(siauboKategorija.getBooksByAuthor('Jonas')) // isvedam kokias knygas turi autorius

console.log(trileriuKategorija.getBooksByPriceRange(15, 20)); // isvedam kokios knygos patenka i intervala

siauboKategorija.setCategoryName('Komedija');

console.log(siauboKategorija);

const library = new Library();

library.addCategory(trileriuKategorija);
library.addCategory(siauboKategorija);

console.log(library);

const ivertinimas1 = new Rating ('1', 'GBS001', 5, 'Gera skaityti tokią knygą');
console.log(ivertinimas1.getRating());

const skaitytojas1 = new Reader('Jonas', 'jonas@jonaitis.com', 1234);
console.log(skaitytojas1);

skaitytojas1.borrowBook();
console.log(skaitytojas1.getBorrowedBooks);