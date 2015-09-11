var SoccerField = require('../../models/SoccerField.js');

exports.post = function(req, res) {
  var soccerField = new SoccerField({
    name:        req.body.name,
    description: req.body.descr,
    longitude:   req.body.longitude,
    latitude:    req.body.latitude
  });
  soccerField.save(function(err) {
    if (err) throw err;
    console.log('Task saved.');

    res.send('Soccer field saved.');
  });
}

exports.save = function(req, res) {
  var soccerField = new SoccerField({
    name:        req.params.name,
    description: req.params.descr,
    longitude:   req.params.longitude,
    latitude:    req.params.latitude
  });

  soccerField.save(function(err) {
    if (err) throw err;
    console.log('Soccer Field saved.');

    res.send('Soccer field saved');
  });
}

exports.list = function(req, res) {
  SoccerField.find(function(err, soccerField) {
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
    res.send(req.query["callback"] + '("records":' + JSON.stringify(soccerField) + '});');
  });
}

exports.show = (function(req, res) {
  SoccerField.findOne({
    name: req.params.name
  }, function(error, soccerField) {
    res.send([{
      SoccerField: soccerField
    }]);
  });
});

exports.near = function(req, res) {
  SoccerField.find({
      coords: {
        $near: [req.params.long, req.params.lat],
        $maxDistance: req.params.dist / 68.91
      }
    },
    function(error, soccerField) {
      res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
      res.send(req.query["callback"] + '({"records:' +
        JSON.stringify(soccerField) + '});');
    });
}
