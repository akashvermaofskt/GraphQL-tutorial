import React, {useState,useEffect} from 'react';
import { graphql } from 'react-apollo';
import {compose} from 'redux';
import { getAuthorsQuery, addBookMutation , getBooksQuery} from '../queries/queries'

const AddBook = (props) => {
    
    const [state,setState] = useState({
        name: "",
        genre: "",
        authorid: ""
    }) 

    // useEffect(() => {
    //     console.log(state);
    //     return () => {
            
    //     }
    // }, [state])

    const submitForm = (e) => {
        e.preventDefault();
        props.addBookMutation({
            variables: state,
            refetchQueries: [{query: getBooksQuery}]
        });
    }

    const displayAuthors = () => {
        var data= props.getAuthorsQuery;
        if(data.loading){
            return (
                <option disabled>loading...</option>
            );
        }else{
            return (
                data.authors.map((author)=>(
                    <option key={author.id} value={author.id}>{author.name}</option>
                ))
            );
        }
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange = {(e) => setState({...state,name:e.target.value})}/>
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange = {(e) => setState({...state,genre:e.target.value})}/>
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange = {(e) => setState({...state,authorid:e.target.value})}>
                    <option>Select author</option>
                    { displayAuthors() }
                </select>
            </div>

            <button>+</button>
        </form>
    );
}

export default compose(
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(addBookMutation, {name:"addBookMutation"})    
)(AddBook);
