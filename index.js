const express = require('express');
const mongoose = require('mongoose');

const PORT = 3000;

const Restaurant = require('./models/Restaurant');

const app = express();
app.use(express.json());

const uri = 'mongodb+srv://f2023_comp3123:fullstack_assignment1@cluster0.w2zjbvo.mongodb.net/lab03?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    // Seed data into the database
    seedData();
    // Start the Express server
    
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const restaurantsData = 
    [{
      "address": {
        "building": "1008",
        "street": "Morris Park Ave",
        "zipcode": "10462"
     },
     "city": "Bronx",
     "cuisine": "Bakery",
     "name": "Morris Park Bake Shop",
     "restaurant_id": "30075445"
    },
    {
      "address": {
        "street": "Thai Son Street",
        "zipcode": null
     },
     "city": "Manhattan",
     "cuisine": "Vietnamese",
     "name": "Pho Me Long Time",
     "restaurant_id": "30075455"
    },
    {
      "address": {
        "building": "253",
        "street": "East 167 Street",
        "zipcode": null
     },
     "city": "Bronx",
     "cuisine": "Chicken",
     "name": "Mom's Fried Chicken",
     "restaurant_id": "40382900"
    },
    {
      "address": {
        "building": "120",
        "street": "East 56 Street",
        "zipcode": "19800"
     },
     "city": "Mahattan",
     "cuisine": "Italian",
     "name": "Montebello Restaurant",
     "restaurant_id": "40397082"
    },
    {
      "address": {
        "building": "195",
        "street": "Soprano Street",
        "zipcode": "17500"
     },
     "city": "Staten Island",
     "cuisine": "Hamburgers",
     "name": "Joeys Burgers",
     "restaurant_id": "40397555"
    },
    {
      "address": {
        "building": "200",
        "street": "Queens Boulevard",
        "zipcode": "19700"
     },
     "city": "Queens",
     "cuisine": "American",
     "name": "Brunos on the Boulevard",
     "restaurant_id": "40397678"
    },
    {
      "address": {
        "building": "555",
        "street": "Sushi Street",
        "zipcode": "17700"
     },
     "city": "Brooklyn",
     "cuisine": "Japanese",
     "name": "Iron Chef House",
     "restaurant_id": "40397699"
    },
    {
      "address": {
        "building": "555",
        "street": "Fontana Street",
        "zipcode": null
     },
     "city": "Brooklyn",
     "cuisine": "Japanese",
     "name": "Wasabi Sushi",
     "restaurant_id": "40398000"
    },
    {
      "address": {
        "building": "900",
        "street": "Goodfellas Street",
        "zipcode": "17788"
     },
     "city": "Brooklyn",
     "cuisine": "Delicatessen",
     "name": "Sal's Deli",
     "restaurant_id": "40898000"
    },
    {
      "address": {
        "building": "909",
        "street": "44 Gangster Way",
        "zipcode": "17988"
     },
     "city": "Queens",
     "cuisine": "Delicatessen",
     "name": "Big Tony's Sandwich Buffet",
     "restaurant_id": "40898554"
    },
    {
      "address": {
        "building": "1201",
        "street": "121 Canolli Way",
        "zipcode": "17989"
     },
     "city": "Queens",
     "cuisine": "Delicatessen",
     "name": "The Godfather Panini Express",
     "restaurant_id": "40898554"
    }]
    
    


async function seedData() {
    try {
     yh
  
      // Insert the data into the collection
      await Restaurant.insertMany(restaurantsData);
      console.log(`${restaurantsData.length} documents inserted into the collection`);
  
    } catch (error) {
      console.error('Error seeding data:', error.message);
    } finally {
      // Disconnect from the MongoDB server
      await mongoose.disconnect();
    }
  }
  
  
  //seedData();


app.get('/restaurants', async (req, res) => {
    try {
      const restaurants = await Restaurant.find({});
      res.json(restaurants);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const { cuisine } = req.params;
    try {
      const restaurants = await Restaurant.find({ cuisines: cuisine });
      res.json(restaurants);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


app.get('/restaurants', async (req, res) => {
    const { sortBy } = req.query;
    try {
      const sortOrder = sortBy === 'ASC' ? 1 : sortBy === 'DESC' ? -1 : 1;
      const restaurants = await Restaurant.find({}).sort({ restaurant_id: sortOrder });
      res.json(restaurants);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

 
app.get('/restaurants/:cuisine', async (req, res) => {
    const { cuisine } = req.params;
    try {
      const restaurants = await Restaurant.find({ cuisines: cuisine, city: { $ne: 'Brooklyn' } }, { _id: 0, cuisines: 1, name: 1, city: 1 }).sort({ name: 1 });
      res.json(restaurants);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


