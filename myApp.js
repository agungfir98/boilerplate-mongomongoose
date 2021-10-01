require('dotenv').config();
const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const kunci = process.env.MONGO_URI;
mongoose.connect(kunci)

// Creating a model
const PersonSchema = new Schema({
  name: {type: String, required: true},
  age: {type: Number},
  FavoriteFoods: [String]
});

let Person = model('Person', PersonSchema);

// model example

const agung = new Person({
  name: 'Agung',
  age: 23,
  FavoriteFoods: ['Mie', 'Mendoan']
})

const createAndSavePerson = (done) => {
  const guguk = new Person({
    name: "kntl",
    age: 100,
    FavoriteFoods: ['Mie', 'Mendoan']
  });
  guguk.save( function (err, data) {
    if (err) {
      console.error(err);
    }else {
      done(null, data);
    };
  });
};

const arrayOfPeople = [
  {name: "Budi", age: 24, FavoriteFoods: ["veggies"]},
  {name: "Ombing", age: 23, FavoriteFoods: ["meat"]},
  {name: "Aldi", age: 23, FavoriteFoods: ["meat"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    };
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, data) {  
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
};

const findOneByFood = (food, done) => {
  Person.find({FavoriteFoods: food}, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      done(null, data)
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data) {
    if(err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, function (err, data) {  
    if (err) {
      console.error(err);
    } else {
      data.FavoriteFoods.push(foodToAdd);
      data.save(function (err, updated) {  
        if (err) {
          console.error(err);
        } else {
          done(null, updated)
        }
      })
    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // parameter findOneAndUpdate itu (filter, yang mau diupdate, option (baca documentation macam opsinya), callback)
  Person.findOneAndUpdate( {name: personName}, {age: ageToSet}, {new: true}, function (err, data) {
    if (err) {
      console.error(err)
    } else {
      data.save(function (err, newage) {
        if (err) {
          console.error(err);
        } else {
          done(null,newage)
        }
      })
    }
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove( personId, function(err, data) {
    if(err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
