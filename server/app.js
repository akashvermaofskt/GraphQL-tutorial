const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

//allow cross-origin requrests
app.use(cors());

//connect to MongoDB
mongoose.connect("mongodb+srv://akash:test123@cluster0-xx5kl.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true  });

mongoose.connection.once('open',() => {
    console.log("Connected to database")
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});