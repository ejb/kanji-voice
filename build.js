var buildify = require('buildify');

buildify()
  .concat([
      'js-lib/jquery.js',
      'js-lib/handlebars.js',
      'js-lib/dictionary.js',
      'js-lib/base.js'
  ])
  .uglify()
  .save('script.js')
;