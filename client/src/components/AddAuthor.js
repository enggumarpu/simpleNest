import React, {useState} from 'react';
//import {gql} from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';

import { gql, useMutation } from '@apollo/client';


// const ADD_TODO = gql`
//   mutation createEvent($name: String!, $age: String!) {
//     addAuthors(name: $name, age: $age) {
//       name
//       age
//     }
//   }
// `;

const ADD_TODO = gql`
  mutation createEvent($eventInput: EventInput) {
    createEvent(eventInput: $eventInput) {
      title
    }
  }
`;
function AddAuthor() {

    const [formState, setFormState] = useState({
        name: '',
        age: ''
      });

    const [createLink] = useMutation(ADD_TODO, {
        variables: {
          eventInput:{
            title: formState.name,
            description: formState.age
          }
          
        }
      });



        
    return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
        }}
      >
        <div>
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            
          />
          <input
          type="text"
            value={formState.age}
            onChange={(e) =>
              setFormState({
                ...formState,
                age: e.target.value
              })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  }


export default AddAuthor;
