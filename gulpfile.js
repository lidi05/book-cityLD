var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sequence = require('gulp-sequence');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var babel = require('gulp-babel');
var mock = require("./src/data/mock.js");
var url = require('url');
var user = {
    name: "ls",
    pwd: 1234
};
var check = false;
gulp.task('textcss', function() {
    gulp.src('src/css/*.css')
        .pipe(cleancss())
        .pipe(gulp.dest('dist/css/'))
});

gulp.task('textjs', function() {
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: 'es2015' //指定编译后的版本为es5
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
});
gulp.task('texthtml', function() {
    gulp.src('src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, //压缩HTML
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('server', function() {
    gulp.src('dist')
        .pipe(webserver({
            host: 'localhost',
            port: 8888,
            middleware: function(req, res, next) {
                var obj = url.parse(req.url, true);
                if (req.url === "/loginuser") {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    });
                    req.on('end', function() {
                        var data = Buffer.concat(arr).toString();
                        var obj = require('querystring').parse(data);
                        if (obj.user === user.name && obj.pwd == user.pwd) {
                            res.end('{ "code": 1 }');
                            check = true;
                        } else {
                            res.end('{ "code": 0 }');
                        }
                        next();
                    });
                    return false;
                };
                if (/\/logineds/.test(obj.pathname)) {
                    res.end('{"msg":"' + check + '"}')
                }
                if (/\/book/.test(obj.pathname)) {
                    res.end(JSON.stringify(mock(req.url)))
                }
                next();
            }
        }))
});

gulp.task('default', function() {
    sequence('textcss', 'textjs', 'texthtml', 'server')
})