import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as BooksAPI from '../../BooksAPI';
import Book from "../Book";

class BookSearch extends Component {
    state = {
        searchKeyword: '',
        result: [],
    };

    searchBooks(keyword) {
        if (keyword && keyword.trim().length > 0) {
            BooksAPI.search(keyword.trim().toLowerCase())
                .then(response => {
                    if (response.hasOwnProperty('error')) {
                        this.setState({result: []});
                    } else {
                        if (this.state.searchKeyword === keyword) {
                            const result = this.associateShelfWithBooks(response);
                            this.setState({result: result});
                            console.log('result', this.state.result);
                        }
                    }
                })
                .catch(() => {
                    this.setState({result: []});
                })
        } else {
            this.setState({result: []})
        }
    };

    associateShelfWithBooks(searchResults) {
        const myBooks = [...this.props.books];
        const myBooksShelfMap = {};
        myBooks.forEach((b) => {
            myBooksShelfMap[b.id] = b.shelf;
        });

        const searchResult = [...searchResults];
        searchResult.forEach((book) => {
            book.shelf = myBooksShelfMap.hasOwnProperty(book.id) ? myBooksShelfMap[book.id] : 'none';
        });
        return searchResult;
    }

    goBackHandler = () => {
        this.props.history.goBack();
    };

    onTextChangeHandler = (event) => {
        const searchKeyword = event.target.value;
        this.setState({searchKeyword: searchKeyword});
        this.searchBooks(searchKeyword);
    };

    onShelfChangedHandler = (book, newShelf) => {
        this.props.onUpdateShelf(book, newShelf);
        this.goBackHandler();
    };

    render() {
        const {searchKeyword, result} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.goBackHandler}>Close</a>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={searchKeyword}
                            onChange={this.onTextChangeHandler}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {result.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    onShelfChanged={(books, newShelf) => this.onShelfChangedHandler(books, newShelf)}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default withRouter(BookSearch);