import React from 'react'
import {Route} from 'react-router-dom';
import './App.css';
import MyBooks from "./components/MyBooks";
import BookSearch from "./components/search/BookSearch";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {

    state = {
        myBooks: []
    };

    componentDidMount() {
        this.getAllBooks();
    }

    /**
     * Fetch all the books from the server and sort them into respective shelfs.
     * Those not belonging to any of the shelves are omitted.
     */
    getAllBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({myBooks: books});
        })
    }

    updateShelfHandler = (book, newShelf) => {
        BooksAPI.update(book, newShelf)
            .then((response) => {
                console.log('Update', response);
                let books = [...this.state.myBooks];

                if (newShelf === 'none') {
                    /* If the newShelf is none remove the book from the books array, else update its shelf.*/
                    books = books.filter((b) => b.id !== book.id);
                } else if (book.shelf === 'none') {
                    /* If the previous shelf was none we assume that the book was not in our list so we just push it.*/
                    book.shelf = newShelf;
                    books.push(book);
                } else {
                    /* Update the shelf of the book to the new shelf */
                    books.forEach((b) => {
                        if (book.id === b.id) {
                            b.shelf = newShelf;
                        }
                    });
                }

                this.setState({myBooks: books});
                console.log(`'${book.title}' moved from ${book.shelf} to ${newShelf}.`);
            });
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <BookSearch
                        books={this.state.myBooks}
                        onUpdateShelf={(book, newShelf) => this.updateShelfHandler(book, newShelf)}
                    />
                )}/>
                <Route exact path='/' render={() => (
                    <MyBooks
                        books={this.state.myBooks}
                        onUpdateShelf={(book, newShelf) => this.updateShelfHandler(book, newShelf)}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp;