import React from 'react'
import {Route} from 'react-router-dom';
import './App.css';
import MyBooks from "./components/MyBooks";
import BookSearch from "./components/search/BookSearch";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {

    state = {
        myBooks: [],
        isLoadingBooks: false
    };

    componentDidMount() {
        this.getAllBooks();
    }

    /**
     * Fetch all the books from the server and sort them into respective shelfs.
     * Those not belonging to any of the shelves are omitted.
     */
    getAllBooks = () => {
        this.setState({isLoadingBooks: true});

        BooksAPI.getAll()
            .then((books) => this.setState({myBooks: books, isLoadingBooks: false}))
            .catch(() => this.setState({isLoadingBooks: false}))
    };

    updateShelfHandler = (book, newShelf) => {
        BooksAPI.update(book, newShelf)
            .then(() => {
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
            });
    };

    render() {
        const {myBooks, isLoadingBooks} = this.state;

        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <BookSearch
                        books={myBooks}
                        onUpdateShelf={(book, newShelf) => this.updateShelfHandler(book, newShelf)}
                    />
                )}/>
                <Route exact path='/' render={() => (
                    <MyBooks
                        isLoading={isLoadingBooks}
                        books={myBooks}
                        onUpdateShelf={(book, newShelf) => this.updateShelfHandler(book, newShelf)}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp;