// generated on 2016-04-22 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// moved from old project
function getUrltoFile (urlSource, fileName) {
  var http = require('http');
  var url = require('url');
  var options = {
      host: url.parse(urlSource).hostname,
      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search || '')
  }
  console.log (options.path);
  var request = http.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
          data += chunk;
      });
      res.on('end', function () {
        var fs = require('fs');
        fs.writeFile(fileName, data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(urlSource);
            console.log('writen to');
            console.log(fileName);
        });
      });
  });
  request.on('error', function (e) {
      console.log(e.message);
  });
  request.end();
}


function postDatatoFile (urlSource, postData, fileName) {
  var url = require('url');
  var querystring = require('querystring');
  var post_data = JSON.stringify(postData);
  var http = require('http');
  var options = {
      host: url.parse(urlSource).hostname,
      path: url.parse(urlSource).pathname + unescape(url.parse(urlSource).search),
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length
      }
  }
  var request = http.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
          data += chunk;
      });
      res.on('end', function () {
        var fs = require('fs');
        fs.writeFile(fileName, data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(urlSource);
            console.log('post data writen to');
            console.log('fileName');
        }); 
      });
  });
  request.on('error', function (e) {
      console.log(e.message);
  });
  request.write(post_data);
  request.end();
}


gulp.task('origami', () => {
  getUrltoFile('http://build.origami.ft.com/bundles/js?modules=o-ft-header@^2.5.15,o-table@^1.6.0', './bower_components/origami/build.js');
  getUrltoFile ('http://build.origami.ft.com/bundles/css?modules=o-ft-header@^2.5.15,o-ft-footer@^2.0.4,o-table@^1.6.0', './bower_components/origami/build.scss');
});


gulp.task('api', () => {
  return gulp.src('app/api/**/*')
    .pipe(gulp.dest('dist/api'));
});

gulp.task('publish', ['build'], () => {
  gulp.src('dist/scripts/**/*')
    .pipe(gulp.dest('../../ft/dev_www/frontend/static/h5/scripts'));
  gulp.src('dist/styles/**/*')
    .pipe(gulp.dest('../../ft/dev_www/frontend/static/h5/styles'));
  gulp.src('dist/images/**/*')
    .pipe(gulp.dest('../../ft/dev_www/frontend/static/h5/images'));
  gulp.src('dist/fonts/**/*')
    .pipe(gulp.dest('../../ft/dev_www/frontend/static/h5/fonts'));

  var fileName = '../../ft/dev_www/frontend/tpl/include/timestamp.html';
  var fs = require('fs');
  var thedatestamp = new Date().getTime();
  fs.writeFile(fileName, thedatestamp, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log(thedatestamp);
      console.log('writen to');
      console.log(fileName);
  });
  fileName = '../../ft/testing/dev_www/frontend/tpl/include/timestamp.html';
  fs.writeFile(fileName, thedatestamp, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log(thedatestamp);
      console.log('writen to');
      console.log(fileName);
  });

  return gulp.src('dist/**/*')
    .pipe(gulp.dest('../ft/olizh.github.io/h5'))
    .pipe(gulp.dest('../../ft/dev_www/mobile_webroot/ad'));
});

gulp.task('styles', () => {
  return gulp.src('app/styles/main*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras', 'api'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
