const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const Event = require('./models/event');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
        type Event {
          _id: ID!
          title: String!
          description: String!
          
        }

        input EventInput {
          title: String!
          description: String!
          
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      // events: () => {
      //   return Event.find().then( events => {
      //      return events.map( event => {
      //            return {
      //                ...event._doc, 
      //                _id: event._doc._id.toString(),
      //                date: new Date(event._doc.date).toISOString(),
      //                creator: userFind.bind(this, event._doc.creator)
      //            } 
      //        })
      //    }).catch (err =>{
      //        throw err;
      //    })
      events: async () => {
        try {
          const events = await Event.find();
          return events.map(event => {
            return {
              ...event._doc,
              _id: event.id,
              date: new Date(event._doc.date).toISOString(),
              creator: user.bind(this, event._doc.creator)
            };
          });
        } catch (err) {
          throw err;
        }
    
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date)
        });
        return event
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    },
    graphiql: true
  })
);
//app.use(cors());
mongoose
  .connect(
    `mongodb+srv://umar:123@cluster0.foq8i.mongodb.net/db?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3002);
  })
  .catch(err => {
    console.log(err);
  });
