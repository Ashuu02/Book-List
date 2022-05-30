class Book{
    constructor(title,author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// UI class
class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td> `

        list.appendChild(row);
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message,classToBeAdded){
        const div = document.createElement('div');
        div.className = `alert ${classToBeAdded}`;
        div.appendChild(document.createTextNode(message));
        
        const form = document.getElementById('book-form');
        const container = document.querySelector('.container');
        
        container.insertBefore(div,form);
    
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
}


// store to local storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book) {
            const ui =new UI;
            ui.addBookToList(book);
        });
    }

    static addBooks(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books)) ;  
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

// DOM load event 
document.addEventListener('DOMContentLoaded', Store.displayBooks());

//event listeners
document.getElementById('book-form').addEventListener('submit',function(e){
    
    //get form variables
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
    
        // instantiate a book 
        const book = new Book(title, author, isbn);
    
        // instantiate a ui
        const ui = new UI();
    
        if(title==='' || author==='' || isbn ===''){
            ui.showAlert('Please fill in all the details','error');
    
        }   else    {
            ui.addBookToList(book);
            Store.addBooks(book);
            ui.clearFields();
            ui.showAlert('Book Added..!!','success');
        }
        
    
        e.preventDefault();
    });
    
    document.querySelector('#book-list').addEventListener('click', function(e){
        // instantiate a ui
        const ui = new UI();
        ui.deleteBook(e.target);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        ui.showAlert('Book removed!!','success');
    
        e.preventDefault();
    });
    