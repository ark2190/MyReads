import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Bookshelf from './Bookshelf'

class MyBooks extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
    };

    componentDidMount() {
        this.sortMyBooks(this.props.books);
    }

    componentWillReceiveProps(props) {
        this.sortMyBooks(props.books);
    }

    /**
     *  Sort all the books into their respective shelves. Those not belonging to any of the shelves are omitted.
     */
    sortMyBooks(books) {
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
    }

    onShelfChangedHandler = (book, newShelf) => {
        this.props.onUpdateShelf(book, newShelf);
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