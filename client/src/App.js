import React from 'react';
import { render } from 'react-dom';
import BookList from './components/BookList';
import AddAuthor from './components/AddAuthor';


function App() {
  return (
    
      <div>
        <h2>My first Apollo app 🚀</h2>
        <BookList />
        <AddAuthor />
      </div>
  );
}
// function App() {
//   return (
//     <ApolloProvider client={clientx}>
//     <div>
//       <header>
//         <h1>Hello World!</h1>
//         <BookList />
//         <AddAuthor />
//       </header>
//     </div>
//     </ApolloProvider>
//   );
// }

export default App;
