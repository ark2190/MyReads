import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Bookshelf from './Bookshelf'

class MyBooks extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
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
            const currentlyReading = [], wantToRead = [], read = [];
            books.forEach((book) => {
                switch (book.shelf) {
                    case "currentlyReading":
                        currentlyReading.push(book);
                        break;
                    case "wantToRead":
                        wantToRead.push(book);
                        break;
                    case "read":
                        read.push(book);
                        break;
                    default:
                        //book does not belong to any of the shelf, omit it.
                        break;
                }
            });
            this.setState({currentlyReading: currentlyReading, wantToRead: wantToRead, read: read});
            console.log(this.state)
        })
    }

    onShelfChangedHandler = (book, newShelf) => {
        BooksAPI.update(book, newShelf)
            .then(response => {
                /* Update the shelf of the book to the new shelf */
                book.shelf = newShelf;

                // TODO: find an optimal way to move the book from old shelf to new.
                /* Filter out the moved book using the ids in the response */
                let currentlyReading = [...this.state.currentlyReading];
                currentlyReading = currentlyReading.filter((book) => response.currentlyReading.indexOf(book.id) >= 0);
                let wantToRead = [...this.state.wantToRead];
                wantToRead = wantToRead.filter((book) => response.wantToRead.indexOf(book.id) >= 0);
                let read = [...this.state.read];
                read = read.filter((book) => response.read.indexOf(book.id) >= 0);

                /* As the shelf in the state does not have the newly moved book we have to push the book in its new shelf */
                if (response.currentlyReading.indexOf(book.id) >= 0) {
                    currentlyReading.push(book);
                } else if (response.wantToRead.indexOf(book.id) >= 0) {
                    wantToRead.push(book);
                } else if (response.read.indexOf(book.id) >= 0) {
                    read.push(book);
                }

                this.setState({currentlyReading: currentlyReading, wantToRead: wantToRead, read: read});
                console.log(`'${book.title}' moved from ${book.shelf} to ${newShelf}.`);
            });
    };

    render() {
        const {currentlyReading, wantToRead, read} = this.state;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {currentlyReading.length > 0 && (
                            <Bookshelf
                                title="Currently Reading"
                                books={currentlyReading}
                                onShelfChanged={(books, newShelf) => this.onShelfChangedHandler(books, newShelf)}/>
                        )}
                        {wantToRead.length > 0 && (
                            <Bookshelf
                                title="Want to Read"
                                books={wantToRead}
                                onShelfChanged={(books, newShelf) => this.onShelfChangedHandler(books, newShelf)}/>
                        )}
                        {read.length > 0 && (
                            <Bookshelf
                                title="Read"
                                books={read}
                                onShelfChanged={(books, newShelf) => this.onShelfChangedHandler(books, newShelf)}/>
                        )}
                    </div>
                </div>
                <Link
                    to='/search'
                    className="open-search"
                >Add a book</Link>
            </div>
        )
    }
}

export default withRouter(MyBooks)