import React,{ useState,useEffect } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries'


import BookDetails from './BookDetails';

const BookList = (props) => {
    const [state,setState] = useState({ selected: null });

    // useEffect(() => {
    //     console.log(state);
    //     return () => {

    //     }
    // }, [state])

    const displayBooks = () =>{
        var data = props.data;
        if(data.loading){
            return (<div>
                Loading books...
            </div>);
        }else{
            return data.books.map(book => (
                <li key={book.id} onClick={(e) => {setState({selected:book.id})}}>{book.name}</li>
            ));
        }
    }

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookid= { state.selected }/>
        </div>
);
}

export default graphql(getBooksQuery)(BookList);
