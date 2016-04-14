// generated on 2015-10-19 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
var path = require('path');
var argv = require('yargs').argv;

var pxtoremOptions = {
    root_value: 16,
    unit_precision: 5,
    prop_white_list: [], // default ['font', 'font-size', 'line-height', 'letter-spacing']
    selector_black_list: ['border'],
    replace: true,
    media_query: true // default false
};

var postcssOptions = {
    map: false
};


gulp.task('styles', () => {
    return gulp.src('app/sass/*.scss')
        // .pipe($.scsslint({
        //     'reporterOutputFormat': 'Checkstyle',
        //     'filePipeOutput': 'scssReport.xml',
        //     'endless': true, // Allow the test even after each watch task
        //     'verbose': true
        // }))
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe($.pxtorem(pxtoremOptions, postcssOptions))
        .pipe(gulp.dest('app/styles'))
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

gulp.task('wp-styles', () => {

  console.log('copied stylesheet file for WP');
  return gulp.src('app/styles/home.css')
    .pipe($.copy('app/wp/wp-content/themes/echotri/css/', {prefix: 2}));
});

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['header-scripts', 'main-scripts'], () => {

  console.info('Concat and Uglify successfully');
});

gulp.task('main-scripts', function() {

    return gulp.src([
      'app/scripts/components/bower_components/in-viewport/build/in-viewport.min.js',
      'app/scripts/components/bower_components/lazysizes/plugins/bgset/ls.bgset.min.js',
      'app/scripts/components/bower_components/lazysizes/plugins/optimumx/ls.optimumx.min.js',
      'app/scripts/components/bower_components/lazysizes/plugins/respimg/ls.respimg.min.js',
      'app/scripts/components/bower_components/lazysizes/plugins/unveilhooks/ls.unveilhooks.min.js',
      'app/scripts/components/bower_components/lazysizes/lazysizes.min.js',
      'app/scripts/components/bower_components/Snap.svg/dist/snap.svg-min.js',
      'app/scripts/components/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'app/scripts/components/bower_components/angular-messages/angular-messages.js',

      'app/scripts/components/bower_components/lodash/lodash.min.js',
      'app/scripts/components/bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
      'app/scripts/components/bower_components/angular-google-maps/dist/angular-google-maps.min.js',

      'app/scripts/components/vendor/velocity/velocity.min.js',

      'app/scripts/app.js',
      'app/scripts/filters/filters.js',
      'app/scripts/directives/myModalLink.js',
      'app/scripts/directives/myModalDialog.js',
      'app/scripts/directives/myFeedbackNotifier.js',
      'app/scripts/directives/svg.js',
      'app/scripts/controllers/HomeCtrl.js',
      'app/scripts/controllers/ModalCtrl.js',
      'app/scripts/controllers/ContactFormCtrl.js',
      'app/scripts/controllers/GoogleMapsCtrl.js',
      'app/scripts/main.js'
    ])
    .pipe($.concat({path: 'all.js'}))
    .pipe($.if(!argv.dev, $.uglify()))
    // .pipe($.uglify())
    // .pipe(gulp.dest('app/'));
    .pipe(gulp.dest('app/wp/wp-content/themes/echotri/js'));
});

gulp.task('header-scripts', function() {
  return gulp.src([
      'app/scripts/components/bower_components/modernizr/modernizr.js',
      'app/scripts/components/bower_components/svg4everybody/dist/svg4everybody.min.js',
      'app/scripts/components/bower_components/angular/angular.js'
    ])
    .pipe($.concat({ path: 'header-all.js'}))
    .pipe($.if(!argv.dev, $.uglify()))
    .pipe(gulp.dest('app/wp/wp-content/themes/echotri/js'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('svgstore', () => {

    // @TODO: Write a Task that register all svg in json file :D
    return gulp.src('app/images/svg-src/{,*//*}*.svg')
        .pipe($.copy('app/wp/wp-content/themes/echotri/icons/', {prefix: 2}))
        .pipe($.rename({prefix: 'shapes-'}))
        .pipe($.svgmin(function (file) {

            var prefix = path.basename(file.relative, path.extname(file.relative));
            console.log(file);
            return {
                plugins: [{
                  removeViewBox: false,
                  removeUselessStrokeAndFill: false,
                  cleanupIDs: {
                    prefix: prefix + '-',
                    minify: true
                  },
                  removeDoctype: true
                }]
            }
        }))
        .pipe($.svgstore({
            inlineSvg: false
        }))
        .pipe($.rename('svg-defs.svg'))
        .pipe(gulp.dest('app/images/svg/'))
        .pipe($.copy('app/wp/wp-content/themes/echotri/images/', {prefix: 2}));
});

// gulp.task('copySVG', () => {
//
//     return gulp.src('app/images/svg/')
// };

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
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

gulp.task('serve', ['styles', 'fonts'], () => {
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
        'app/scripts/**/*.js',
        'app/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/sass/**/*.scss', ['styles']);
    gulp.watch('app/styles/**/*.css', ['wp-styles']);
    gulp.watch('app/images/svg-src/{,*/}*.svg', ['svgstore']);
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

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/sass/*.scss')
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

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
