import Category from './Category.js';  // Correctly import Category

class Library {

  constructor() {
    this.categories = [];
  }

  getCategories() {
    return this.categories;
  }

  addCategory(category) {
      this.categories.push(category);
  }

  getCategoryById(categoryId) {
    return this.categories.find(
      (category) => category.getCategoryId() === categoryId
    ) || null;
  }

  generateBookList() {
    let htmlContent = `<table border="1" style="width:100%; border-collapse: collapse;">
                         <thead>
                           <tr>
                             <th>Kategorija</th>
                             <th>Pavadinimas</th>
                             <th>Autorius</th>
                             <th>Kaina</th>
                             <th>Aprašymas</th>
                             <th>Prieinamumas</th>
                             <th>ISBN</th>
                           </tr>
                         </thead>
                         <tbody>`;
  
    if (this.categories.length === 0) {
      htmlContent += `<tr><td colspan="7" style="text-align:center;">Nėra kategorijų arba knygų!</td></tr>`;
    } else {
      this.categories.forEach(category => {
        const books = category.getBooks();
  
        if (books.length === 0) {
          htmlContent += `<tr><td colspan="7" style="text-align:center;">Šioje kategorijoje nėra knygų.</td></tr>`;
        } else {
          books.forEach(book => {
            const info = book.getInfo();
  
            htmlContent += `
            <tr>
              <td>${category.getCategoryName()}</td>
              <td>${book.getBookTitle()}</td>
              <td>${book.getBookAuthor()}</td>
              <td>${book.getBookPrice().toFixed(2)} EUR</td>
              <td>${book.getBookDescription()}</td>
              <td>${book.checkAvailability ? 'Pasiekiama' : 'Nepasiekiama'}</td>
              <td>${book.getBookIsbn()}</td>
            </tr>`;
          });
        }
      });
    }
  
    htmlContent += `</tbody></table>`;
  
    document.getElementById("content").innerHTML = htmlContent;
  }
}

export default Library;
