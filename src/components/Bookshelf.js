import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const Bookshelf = ({title, books, onShelfChanged}) => {
    const onShelfChangedHandler = (book, newShelf) => {
        onShelfChanged(book, newShelf);
    };

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                onShelfChanged={(books, newShelf) => onShelfChangedHandler(books, newShelf)}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
};

Bookshelf.propTypes = {
    title: PropTypes.string,
    books: PropTypes.array
};
export default Bookshelf;