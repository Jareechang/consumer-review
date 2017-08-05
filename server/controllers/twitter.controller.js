const twitterService = require('../../services/twitter.js');

exports.getTweetsByUsername = function(req, res) {
  const body = req.body || {};
  const name = body.name || '';
  twitterService.getTweetsByUsername(name)
    .then((data) => {
      return res.jsonp(data);
    });
};

exports.getFriendsList = function(req, res) {
  twitterService.getFriendsList()
    .then((data) => {
      return res.jsonp(data);
    });
};
