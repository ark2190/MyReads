import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

class MyBooks extends Component {
    static propTypes = {
        isLoadingBooks: PropTypes.bool,
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func
    };

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
        const shelves = [
            {title: 'Currently Reading', shelf: 'currentlyReading', books: this.state.currentlyReading},
            {title: 'Want To Read', shelf: 'wantToRead', books: this.state.wantToRead},
            {title: 'Read', shelf: 'read', books: this.state.read}
        ];

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                {!this.props.isLoadingBooks && (
                    <div className="list-books-content">
                        {shelves.map(shelf => (
                            <Bookshelf
                                key={shelf.shelf}
                                title={shelf.title}
                                books={shelf.books}
                                onShelfChanged={(books, newShelf) => this.onShelfChangedHandler(books, newShelf)}/>
                        ))}
                    </div>
                )}
                <Link
                    to='/search'
                    className="open-search"
                >Add a book</Link>
            </div>
        )
    }
}

export default withRouter(MyBooks)