(function webfonts(window, document) {
    'use strict';

    var ref = document.getElementsByTagName('script')[0].parentNode;
    var wf = document.createElement('script');

    window.WebFontConfig = {
        google: {
            families: [
                'Open+Sans:400italic,400,700,600,800:latin'
            ]
        }
    };

    wf.async = true;
    wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';

    ref.appendChild(wf);

}(window, document));
