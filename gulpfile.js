// Package Vars
const pkg = require("./package.json");

// Gulp
const gulp = require("gulp");

// Load all plugins in "devDependencies" into the variable $
const $ = require("gulp-load-plugins")({
    pattern: ["*"],
    scope: ["devDependencies"]
});

// BrowserSync reload var
const reload = $.browserSync.reload;

// Error reporting
const onError = (err) => {
    console.log(err);
};

const banner = [
    "/**",
    " * @project        <%= pkg.name %>",
    " * @author         <%= pkg.author %>",
    " * @build          " + $.moment().format("llll") + " ET",
    " * @copyright      Copyright (c) " + $.moment().format("YYYY") + ", <%= pkg.copyright %>",
    " *",
    " */",
    ""
].join("\n");

// SCSS - Build the scss to the build folder, including the required paths, and writing out a sourcemap
gulp.task("scss", () => {
    $.fancyLog("-> Compiling scss");
    var onError = function (err) {
        $.notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
            sound: "Beep"
        })(err);
        this.emit('end');
    };
    return gulp.src(pkg.paths.src.scss + pkg.vars.scssName)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.sass({
            includePaths: pkg.paths.scss
        })
            .on("error", $.sass.logError))
        .pipe($.cached("sass_compile"))
        .pipe($.autoprefixer())
        .pipe($.sourcemaps.write("./"))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.build.css));
});

// // CSS task - combine & minimize any distribution CSS into the public css folder, and add our banner to it
gulp.task("css", ["scss"], () => {
    $.fancyLog("-> Building css");
    return gulp.src(pkg.globs.distCss)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.newer({dest: pkg.paths.dist.css + pkg.vars.siteCssName}))
        .pipe($.print())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.concat(pkg.vars.siteCssName))
        .pipe($.cssnano({
            discardComments: {
                removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            minifyFontValues: true,
            minifySelectors: true
        }))
        .pipe($.header(banner, {pkg: pkg}))
        .pipe($.sourcemaps.write("./"))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.dist.css))
        .pipe($.filter("**/*.css"))
        .pipe(reload({stream: true}));
});

// Bootstrap task - Combine the Bootstrap JavaScript into one bundle
gulp.task("js-bootstrap", () => {
    $.fancyLog("-> Building bootstrap.min.js...");
    return gulp.src(pkg.globs.bootstrap)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.concat("bootstrap.min.js"))
        .pipe($.uglify())
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.build.js));
});

// Babel task - Transpile our JavaScript into the build directory
gulp.task("js-babel", () => {
    $.fancyLog("-> Transpiling Javascript via Babel...");
    return gulp.src(pkg.globs.babelJs)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.babel())
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.build.js));
});

// Components - build .vue VueJS components
gulp.task("components", () => {
    $.fancyLog("-> Compiling Vue Components");
    return gulp.src(pkg.globs.components)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.vueify({}))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.build.js));
});

// JavaScript task - minimize any distribution Javascript into the public js folder, and add our banner to it
gulp.task("js", ["js-babel", "js-bootstrap"], () => {
    $.fancyLog("-> Building js");
    return gulp.src(pkg.globs.distJs)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.if(["*.js", "!*.min.js"],
            $.newer({dest: pkg.paths.dist.js, ext: ".min.js"}),
            $.newer({dest: pkg.paths.dist.js})
        ))
        .pipe($.if(["*.js", "!*.min.js"],
            $.uglify()
        ))
        .pipe($.if(["*.js", "!*.min.js"],
            $.rename({suffix: ".min"})
        ))
        .pipe($.header(banner, {pkg: pkg}))
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.dist.js))
        .pipe($.filter("**/*.js"))
        .pipe(reload({stream: true}));
});

// Process data in an array synchronously, moving onto the n+1 item only after the nth item callback
function doSynchronousLoop(data, processData, done) {
    if (data.length > 0) {
        const loop = (data, i, processData, done) => {
            processData(data[i], i, () => {
                if (++i < data.length) {
                    loop(data, i, processData, done);
                } else {
                    done();
                }
            });
        };
        loop(data, 0, processData, done);
    } else {
        done();
    }
}

// Process the downloads one at a time
function processDownload(element, i, callback) {
    const downloadSrc = element.url;
    const downloadDest = element.dest;

    $.fancyLog("-> Downloading URL: " + $.chalk.cyan(downloadSrc) + " -> " + $.chalk.magenta(downloadDest));
    $.download(downloadSrc)
        .pipe(gulp.dest(downloadDest));
    callback();
}

// download task
gulp.task("download", (callback) => {
    doSynchronousLoop(pkg.globs.download, processDownload, () => {
        // all done
        callback();
    });
});

// Generate Favicons
gulp.task("favicons-generate", () => {
    $.fancyLog("-> Generating favicons");
    return gulp.src(pkg.paths.favicon.src).pipe($.favicons({
        appName: pkg.name,
        appDescription: pkg.description,
        developerName: pkg.author,
        developerURL: pkg.urls.live,
        background: "#FFFFFF",
        path: pkg.paths.favicon.path,
        url: pkg.site_url,
        display: "standalone",
        orientation: "portrait",
        version: pkg.version,
        logging: false,
        online: false,
        html: pkg.paths.build.html + "favicons.html",
        replace: true,
        icons: {
            android: false, // Create Android homescreen icon. `boolean`
            appleIcon: true, // Create Apple touch icons. `boolean`
            appleStartup: false, // Create Apple startup images. `boolean`
            coast: true, // Create Opera Coast icon. `boolean`
            favicons: true, // Create regular favicons. `boolean`
            firefox: true, // Create Firefox OS icons. `boolean`
            opengraph: false, // Create Facebook OpenGraph image. `boolean`
            twitter: false, // Create Twitter Summary Card image. `boolean`
            windows: true, // Create Windows 8 tile icons. `boolean`
            yandex: true // Create Yandex browser icon. `boolean`
        }
    })).pipe(gulp.dest(pkg.paths.favicon.dest));
});

// Copy Favicons task
gulp.task("favicons", ["favicons-generate"], () => {
    $.fancyLog("-> Copying favicon.ico");
    return gulp.src(pkg.globs.siteIcon)
        .pipe($.size({gzip: true, showFiles: true}))
        .pipe(gulp.dest(pkg.paths.dist.base));
});

// Compress Images
gulp.task("images", () => {
    $.fancyLog("-> Compressing Images");
    return gulp.src(pkg.paths.dist.img + "**/*.{png,jpg,jpeg,gif,svg}")
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            multipass: true,
            optimizationLevel: 7,
            svgoPlugins: [
                {removeTitle: false},
                {cleanupListOfValues: {floatPrecision: 2}},
                {cleanupNumericValues: {floatPrecision: 2}},
                {convertPathData: {floatPrecision: 2}}
            ]
        }))
        .pipe(gulp.dest(pkg.paths.dist.img));
});

// Generate Fontello
gulp.task("generate-fontello", () => {
    return gulp.src(pkg.paths.src.fontello + "config.json")
        .pipe($.fontello())
        .pipe($.print())
        .pipe(gulp.dest(pkg.paths.build.fontello))
});

// Copy Fonts
gulp.task("fonts", ["generate-fontello"], () => {
    $.fancyLog("-> Moving fonts to dist folder");
    return gulp.src(pkg.globs.fonts)
        .pipe(gulp.dest(pkg.paths.dist.fonts));
});

// Browser-Sync
gulp.task('browser-sync', function () {
    $.browserSync.init({
        files: "pkg.paths.dist.css + '*.css', pkg.paths.dist.js + '*.js',  pkg.paths.templates + '*.{html,htm,twig}'",
        proxy: pkg.urls.local
    });
});

// Watch files in assets folders for changes
gulp.task('watch', function () {
    $.fancyLog("-> Watching files for changes");
    gulp.watch([pkg.paths.src.scss + "**/*.scss"], ["css"]);
    gulp.watch([pkg.paths.src.css + "**/*.css"], ["css"]);
    gulp.watch([pkg.paths.src.js + "**/*.js"], ["js"]);
    gulp.watch([pkg.paths.templates + "**/*.{html,htm,twig}"], () => {
        gulp.src(pkg.paths.templates)
            .pipe($.plumber({errorHandler: onError}))
            .pipe(reload({stream: true}));
    });
});

// Default task
gulp.task('default', ['css', 'js', 'watch', 'browser-sync']);

// Production build
gulp.task("build", ["download", "default", "favicons", "images", "fonts"]);