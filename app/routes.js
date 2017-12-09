/**
 * Created by William on 10/29/17.
 */
var Gender = require('../app/models/gender');
var Race = require('../app/models/race');
var Age = require('../app/models/age');
var lda = require('lda');
var bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST
// use for backend route if needed
module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(methodOverride(function(req, res){
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method
            delete req.body._method
            return method
        }
    }))
    app.get('/', function (req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

    app.get('/dialog', function (req, res){
      //  res.sendfile('./public/views/dialog.html');
        Gender.find(function(err, genders) {
            if (err)
                return res.send(err);
            console.log('123');
            res.json(genders);
        });
    });

    // create a sex (accessed at POST http://localhost:8080/api/sex)
    app.post('/api/gender', function(req, res) {
            var gender = new Gender();      // create a new instance of the Sex model
            gender.gender = req.body.gender;  // set the sex name (comes from the request)
            gender.group = req.body.group;
            console.log(gender);
            // save the bear and check for errors
            gender.save(function(err) {
                if (err)
                    return res.send(err);
                console.log('saving gender');
                res.json({ message: 'gender created!' });
            });
    })
        // get all the sex (accessed at GET http://localhost:8080/api/sex)
        .get('/api/genders',function(req, res) {
        Gender.find(function(err, genders) {
            if (err)
                return res.send(err);
            console.log('123');
            res.json(genders);
        });
    })
        .delete('/api/genders/:gender_group', function(req, res) {
        Gender.remove({group : req.params.gender_group}, function(err) {
            if (err)
                return res.send(err);
            res.json('successfully removed');
        })
    })
        .get('/api/genders/:gender_group', function(req, res) {
            Gender.find({group: req.params.gender_group}, function(err, genders) {
                if (err)
                    return res.send(err);
                console.log('123');
                res.json(genders);
            });
        });

    app.post('/api/race', function(req, res) {
            var race = new Race();      // create a new instance of the Race model
            race.race = req.body.race;  // set the race name (comes from the request)
            race.group = req.body.group;
            console.log(race);
            // save the bear and check for errors
            race.save(function(err) {
                if (err)
                    return res.send(err);
                res.json({ message: 'race created!' });
            });
        })

        // get all the sex (accessed at GET http://localhost:8080/api/sex)
        .get('/api/races',function(req, res) {
            Race.find(function(err, races) {
                if (err)
                    return res.send(err);
                res.json(races);
            });
        })

        .delete('/api/races/:race_group', function(req, res) {
            Race.remove({group : req.params.race_group}, function(err) {
                if (err)
                    return res.send(err);
                res.json('successfully removed');
            })
        })
        .get('/api/races/:race_group', function(req, res) {
            Race.find({group: req.params.race_group}, function(err, races) {
                if (err)
                    return res.send(err);
                res.json(races);
            });
        });

    app.post('/api/age', function(req, res) {
            var age = new Age();      // create a new instance of the Sex model
            age.age = req.body.age;  // set the sex name (comes from the request)
            age.group = req.body.group;
            // save the bear and check for errors
            age.save(function(err) {
                if (err)
                    return res.send(err);
                res.json({ message: 'Age created!' });
            });
        })

        // get all the sex (accessed at GET http://localhost:8080/api/sex)
        .get('/api/ages',function(req, res) {
            Age.find(function(err, ages) {
                if (err)
                    return res.send(err);
                res.json(ages);
            });
        })

        .delete('/api/ages/:age_group', function(req, res) {
            Age.remove({group : req.params.age_group}, function(err) {
                if (err)
                    return res.send(err);
                res.json('successfully removed');
            })
        })
        .get('/api/ages/:age_group', function(req, res) {
            Age.find({group: req.params.age_group}, function(err, ages) {
                if (err)
                    return res.send(err);
                res.json(ages);
            });
        });

    // load home page information
    app.get('/info', function(req, res) {
        var info = {};
        // use mongoose to get all info in the database
        var genderPromise = new Promise(function(resolve, reject) {
            Gender.find(function (err, genderModels) {
                if (err)
                    return reject(err);
                info.gender = genderModels;
                return resolve(genderModels);
            });
        });
        var racePromise = new Promise(function(resolve, reject) {
            Race.find(function (err, raceModels) {
                if (err)
                    return reject(err);
                info.race = raceModels;
                return resolve(raceModels);
            });
        });
        var agePromise = new Promise(function(resolve, reject) {
            Age.find(function (err, ageModels) {
                if (err)
                    return reject(err);
                info.age = ageModels;
                return resolve(ageModels);
            });
        });

        Promise.all([genderPromise, racePromise, agePromise]).then(function(info) {
            res.json(info);
        });
    });

    app.post('/queryDisease', function(req, res) {
        var info = {};
        info.gender = req.body.selectedGender;
        info.race = req.body.selectedRace;
        info.age = req.body.selectedAge;
        info.details =  req.body.details;
        console.log(info);
        // find the disease record according to the parameters
        res.json(info);
    });
    // request for lda modeling classification
    app.get('/ldaModeling', function(req, res) {
        var lda = require('lda');
        // Example document.
        var text = 'Cats are small. Dogs are big. Cats like to chase mice. Dogs like to eat bones.';
        // Extract sentences.
        var documents = text.match( /[^\.!\?]+[\.!\?]+/g );
        // Run LDA to get terms for 2 topics (5 terms each).
        var result = lda(documents, 2, 5);
        res.json(result);
    });
}