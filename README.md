# colorShare

The place to share and save your favourite colors and to be inspired by others!
Create an account and preform superfun CRUD-operations and searches in the database!

### Technologies

A fullstack project with node.js/express, mongoDB, React and Redux Toolkit.

### What you need to run this show

You need MongoDB local. 

#### This is how you setup MongoDB in MongoDB Compass:

1. Open MongoDB compass and connect to mongodb://localhost:27017/colors
2. Go to the database called  ”colors”, in collection ”users”, press add data and import users.json (attached). Do the same for posts.
3. This needs to be done for search-function to work: Go to posts-collection, click on ’indexes’. Click create index. Name: descriptionSearch (optional), Select or type a field name: description, select a type: text. Press ’create index’

When all this is done, run backend (npm run devStart), run frontend (npm start/yarn start) and just... enjoy! rejoice!
