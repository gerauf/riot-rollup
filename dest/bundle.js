(function (riot,jquery) {
'use strict';

riot = 'default' in riot ? riot['default'] : riot;

riot.tag2('app', '<h1>{message}</h1> <button class="btn btn-primary">Bootstrap Button</button>', ':scope { display: block;} h1 { color: red; }', '', function (opts) {
    var tag = this;

    tag.message = 'Smelly world';

    tag.on('mount', function () {
        var btn = $('.btn-primary', tag.root).on('click', function () {
            alert('Hello again');
        });
    });
});

riot.mount('app');

}(riot,$));
