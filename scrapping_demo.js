
var casper = require('casper').create();
var tweetsInfo = [];

casper.start('https://twitter.com/kusillus', function() {
    this.echo(this.getTitle());
});
casper.then(function() {
    var tweets = casper.getElementInfo('li.ProfileNav-item--tweets span.ProfileNav-value').text;
    this.echo('tweets: '+tweets);
});
casper.then(function() {
    var follow = casper.getElementInfo('li.ProfileNav-item--following span.ProfileNav-value').text;
    this.echo('Follow: '+follow);
});
casper.then(function() {
    var following = casper.getElementInfo('li.ProfileNav-item--followers span.ProfileNav-value').text;
    this.echo('Following: '+following);
});
casper.then(function() {
    var likes = casper.getElementInfo('li.ProfileNav-item--favorites span.ProfileNav-value').text;
    this.echo('Likes: '+likes);
});
function getTweets() {
    var tweets = document.querySelectorAll('.twitter-hashtag');
    return Array.prototype.map.call(tweets, function(e){
        return e.getAttribute('href');
    })
}
casper.then(function() {
    tweetsInfo = casper.evaluate(getTweets);
});
casper.run(function() {
    this.echo(tweetsInfo.length + ' datos encontrados');
    this.echo(' -> ' +tweetsInfo.join('\n -> '));
});