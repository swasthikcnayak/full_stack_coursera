const MongoClient = require("mongodb");
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url)
    .then((client) => {
        console.log("Connected correctly to the server");
        const db = client.db(dbname);

        dboper.insertDocument(db,{ name: "Vadonut", description: "Test" },
            "dishes")
            .then((result) => {
                console.log("Insert Document : \n", result.ops);
                
                return dboper.findDocuments(db, "dishes")
            })
            .then((docs) => {
                console.log("Found documents : \n", docs);
                
                return dboper.updateDocument(
                    db,
                    { name: "Vadonut" },
                    { description: "Updated Test" },
                    "dishes");
            })
            .then((result) => {
                console.log("updated the document \n", result.result);

                return dboper.findDocuments(db, "dishes")
            })
            .then((docs) => {
                console.log("Found Updated documents \n", docs);
              
                return db.dropCollection("dishes")
            })
            .then((result) => {
                console.log("Dropped collections ", result);
              
                return client.close();
            })
            .catch((err) => {
                console.log(err)
            });
    })
    .catch((err) => {
        console.log(err)
    });
