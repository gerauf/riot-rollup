(function (riot,jquery) {
'use strict';

riot = 'default' in riot ? riot['default'] : riot;

riot.tag2('app', '<div class="jumbotron"> <h1>UI Development with ES6 JS and riot.js</h1> <p>This is the example App we built with Riot.js and ES6 Javascript.</p> <p>{message}</p> </div>', ':scope { display: block;} h1 { color: red; }', '', function (opts) {
    var tag = this;
    tag.message = 'Hello world';

    tag.on('mount', function () {});
});

riot.mount('app');

}(riot,$));
