import React from 'react';
import { gql } from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBooksQuery = gql`{
  getBooks {
    name
    id
  }
}`
function BookList(props) {
  console.log(props);
  const gettingBooks = () => {
    if(props.data.loading){
      return <div>Loading....</div>
    }
    else{
      return props.data.getBooks.map( (i, book) => {
        return <li key={i}>{book.name}</li>
      })
    }
  }
  return (  
    <div>
      <header>
        <ul>
            {gettingBooks()}
        </ul>
      </header>
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);



import React from 'react';
import { gql } from 'apollo-boost';
import {graphql, Query} from 'react-apollo';

const getBooksQuery = gql`{
  getBooks {
    name
    id
  }
}`
function BookList(props) {
   return (
    <Query query={getBooksQuery}>
      {({ loading, error, data }) => {
        if (loading) return <p>Relax, it's worth the wait...</p>
        if (error) return <p>Looks like we've got a problem...Error: {error.toString()}</p>
        return (
          <div>
          <header>
            <ul>
              <h3>Books Available</h3>
              {data.getBooks.map((book, i)=>{
                  return <li key={i}>{book.name}</li>
              })}       
            </ul>
          </header>
        </div>
        )
      }}
    </Query>
  );



}

export default BookList;

























import logo from './logo.svg';
import './App.css';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import AddAuthor from './components/AddAuthor';

const clientx = new ApolloClient({
  uri: 'http://localhost:3002/graphql'
})
function App() {
  return (
    <ApolloProvider client={clientx}>
    <div>
      <header>
        <h1>Hello World!</h1>
        <BookList />
        <AddAuthor />
      </header>
    </div>
    </ApolloProvider>
  );
}

export default App;
