import React from 'react'
import PropTypes from 'prop-types'

/**
 * @param book - Holds the information about the book. For e.g. id, title, authors, cover-image, etc.
 * @param onShelfChanged - function that is invoked when shelf is changed.
 *
 * @returns A book object that holds the information about the book.
 */
const Book = ({book, onShelfChanged}) => {
    const onShelfChangeHandler = (event) => {
        const newShelf = event.target.value;
        console.log(book.shelf);
        console.log(newShelf);
        /* Check if the shelf is actually changed. If it is pass on the callback to onShelfChanged else ignore */
        if (newShelf !== book.shelf) {
            onShelfChanged(book, newShelf);
        }
    };

    let thumbnail = book.imageLinks
        ? (book.imageLinks.smallThumbnail
            ? book.imageLinks.smallThumbnail
            : book.imageLinks.thumbnail)
        : null;
    thumbnail = thumbnail ? `url("${thumbnail}")` : '#e1e1e1';

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: thumbnail
                }}/>
                <div className="book-shelf-changer">
                    <select
                        defaultValue={book.shelf}
                        onChange={onShelfChangeHandler}>
                        <option
                            value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">
                {book.title}
            </div>
            <div className="book-authors">
                {book.authors && book.authors.length > 0 ? book.authors[0] : "N/A"}
            </div>
        </div>
    )
};

Book.propTypes = {
    book: PropTypes.object,
    onShelfChanged: PropTypes.func
};

export default Book;