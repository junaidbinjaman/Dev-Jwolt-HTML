const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const {ObjectId} = require('mongodb');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
const port = 3000;

// mongodb database connection url
const uri = "mongodb+srv://htmlportfolio:B7vdOc8dsCEZLgFz@cluster0.raxaw.mongodb.net/htmlPortfolio?retryWrites=true&w=majority";

app.get('/', (req, res) => {
  res.send('Hello, World')
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// database operation codes
client.connect(err => {
  const collection = client.db("htmlPortfolio").collection("postes");
  
  // creating a API to post data into mongoDB
  app.post('/addPost', (req, res) => {
    const data = req.body;
    const publishDate = new Date().toLocaleDateString();
    // insert data into mongoDb
    collection.insertOne({publishDate, ...data})
    .then(result => {
      console.log(result);
    })  
  })

  // read data from mongodb
  app.get('/postes', (req, res) => {
    collection.find({}, {sort:{$natural:-1}})
    .toArray((err, documents) => {
      console.log('data loead successfully');
      res.send(documents)
    })
  })

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  collection.deleteOne({_id: ObjectId(id)})
  .then(result => {
    console.log(result);
    res.send(result);
  })
})

// uodate post

// reading single data to update it
app.get('/singledata/:id', (req, res) => {
  const id = req.params.id;
  collection.find({_id: ObjectId(id)})
  .toArray((err, document) => {
    res.send(document[0])
  })
})

// update the content
app.patch('/update/:id', (req, res) => {
  const id = req.params.id
  res.send(req.body)
  collection.updateOne({_id: ObjectId(id)}, 
  {$set: {post_title: req.body.postTitle, img: req.body.img, author: req.body.author, post_content: req.body.postContent}}
  )
  .then(result => {
    console.log(result);
  })

})

// search data in mongodb
app.get('/search/:title', (req, res) => {
  const regex = new RegExp(req.params.title, 'i');
  collection.find({post_title: regex})
  .toArray((err, document) => {
    console.log(document);
    res.send(document);
  })
})

});



app.listen(port, () => {
  console.log('Server is working');
})