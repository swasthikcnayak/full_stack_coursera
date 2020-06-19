const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('connected to the server');

    Dishes.create({
        name: "Uthapizza",
        description: "Testing"
    })
        .then((dish) => {
            console.log(dish);
            return Dishes.findByIdAndUpdate(dish._id, {
                $set: {
                    discription: "Updated test"
                }
            },
                {
                    new: true
                }).exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: 'A good dish',
                author: "Ajesh"
            });
            return dish.save();
        })
        .then((dish) => {
            console.log(dish);
            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
})