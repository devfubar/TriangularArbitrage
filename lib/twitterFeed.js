const Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token_key: process.env.twitter_access_token_key,
  access_token_secret: process.env.twitter_access_token_secret
});

var twitterFeed = {};
var ctrl = null;

// constructor
twitterFeed.init = (options) => {
    ctrl = options;
    ctrl.core.tradingCore.on('newTradeQueued', twitterFeed.newStatus);
    return twitterFeed;
};

twitterFeed.newStatus = (candidate, timeStarted) => {
    var msg = `${candidate.a_step_from} -> ${candidate.a_step_to} -> ${candidate.b_step_to} -> ${candidate.c_step_to} = ${candidate.rate} (${candidate.ts})`;
    client.post('statuses/update', {status: msg},  (error, tweet, response) => {
        if(error) {
            ctrl.logger.error(error);
        } else {
            ctrl.logger.debug('Twitter: ' + msg);
        }
    });
}

module.exports = twitterFeed.init;
