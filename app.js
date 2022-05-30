//Book comstructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI constructor
function UI() {}

// ui.prototype
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td> `

    list.appendChild(row);
}

//clear fields after submitting
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}


//show alert or pop-up after submitting/deleting/clearing
UI.prototype.showAlert = function(message,classToBeAdded){
    const div = document.createElement('div');
    div.className = `alert ${classToBeAdded}`;
    div.appendChild(document.createTextNode(message));
    
    const form = document.getElementById('book-form');
    const container = document.querySelector('.container');
    
    container.insertBefore(div,form);

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
};



UI.prototype.deleteBook = function (target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

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
        ui.clearFields();
        ui.showAlert('Book Added..!!','success');
    }
    

    e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click', function(e){
    // instantiate a ui
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book removed!!','success');

    e.preventDefault();
});
