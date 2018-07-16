//main server file with mongodb express and nodejss
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/dailygoals', {
  useNewUrlParser: true
});

var conn = mongoose.connection;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("connected");
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(methodOverride());

console.log("App listening on port 5000");

var schema = new mongoose.Schema({
  text: {
    type: String,
    index: true
  }
});

//creating an database data schema
var Dailygoal = mongoose.model('Dailygoal', schema);


app.get('/dailygoal', function(req, res) {

  Dailygoal.find(function(err, dailygoals) {


    if (err)
      res.send(err)

    res.json(dailygoals);
  });
});

app.post('/dailygoals', function(req, res) {

        Dailygoal.create({
            text : req.body.text,
            done : false
        }, function(err, dailygoal) {
            if (err)
                res.send(err);

            Dailygoal.find(function(err, dailygoals) {
                if (err)
                    res.send(err)
                res.json(dailygoals);
            });
        });

    });

app.delete('/dailygoals/:dailygoal_id', function(req, res) {
            Dailygoal.remove({
                _id : req.params.dailygoal_id
            }, function(err, dailygoal) {
                if (err)
                    res.send(err);


                Dailygoal.find(function(err, dailygoals) {
                    if (err)
                        res.send(err)
                    res.json(dailygoals);
                });
            });
        });

app.get("*", function(req, res) {
  res.sendfile('./public/index.html')
});

app.listen(5000);
