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
                .then(books => {
                    if (this.state.searchKeyword === keyword) {
                        this.setState({result: books});
                    }
                    console.log('result', this.state.result);
                })
        } else {
            this.setState({result: []})
        }
    };

    goBackHandler = () => {
        this.props.history.goBack();
    };

    onTextChangeHandler = (event) => {
        const searchKeyword = event.target.value;
        this.setState({searchKeyword: searchKeyword});
        this.searchBooks(searchKeyword);
    };

    onShelfChangedHandler = (book, newShelf) => {
    };

    render() {
        const {searchKeyword, result} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.goBackHandler}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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