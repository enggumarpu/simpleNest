import React from 'react';
import { useQuery, gql } from '@apollo/client';

const getBooksQuery = gql`{
  events {
    title
    description
  }
}`
function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return (
      <div>
      <header>
        <ul>
          <h3>Books Available</h3>
          {data.events.map((book, i)=>{
              return <li key={i}>{book.title}</li>
          })}       
        </ul>
      </header>
    </div>
    )
}
export default BookList;