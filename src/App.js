import React from 'react'
import {Route} from 'react-router-dom';
import './App.css';
import MyBooks from "./components/MyBooks";
import BookSearch from "./components/search/BookSearch";

class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
                <Route exact path='/search' component={BookSearch}/>
                <Route exact path='/' component={MyBooks}/>
            </div>
        )
    }
}

export default BooksApp;