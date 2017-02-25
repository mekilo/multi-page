var gulp = require('gulp'),
	htmlMin = require('gulp-htmlmin'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	cssMin = require('gulp-minify-css'),
	eslint = require('gulp-eslint'),
	babel = require('gulp-babel'),
	uglify = require('gulp-uglify')
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create();

gulp.task('html', function () {
	gulp.src('src/html/*.html')
		.pipe(htmlMin({
	        removeComments: true,//清除注释
	        collapseWhitespace: true,//压缩
	        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
	        removeEmptyAttributes: true,//删除所有空格属性值 <input id="" /> ==> <input />
	        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
	        minifyJS: true,//压缩页面JS
	        minifyCSS: true//压缩页面CSS
	    }))
		.pipe(gulp.dest('dest/html'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function () {
	gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, // 美化属性 默认：true
            remove:true // 去掉不必要前缀 默认：true
        }))
        // .pipe(cssMin())
        .pipe(gulp.dest('dest/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function () {
	gulp.src(['src/js/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
		.pipe(gulp.dest('dest/js'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['html', 'css', 'js'], function () {
	browserSync.init({
        server: "./dest"
    });
    gulp.watch('src/html/*.html', ['html']);
	gulp.watch('src/less/*.less', ['css']);
    gulp.watch('src/js/*.js', ['js']);
});








