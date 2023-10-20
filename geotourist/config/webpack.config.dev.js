
module.exports = {
    output: {
        // // Next line is not used in dev but WebpackDevServer crashes without it:
        // path: paths.appBuild,
        // // Add /* filename */ comments to generated require()s in the output.
        // pathinfo: true,
        // // This does not produce a real file. It's just the virtual path that is
        // // served by WebpackDevServer in development. This is the JS bundle
        // // containing code from all our entry points, and the Webpack runtime.
        // filename: 'static/js/bundle.js',
        // This is the URL that app is served from. We use "/" in development.
        publicPath: "/",
        sourcePrefix : '',
    },
    module: {
        unknownContextCritical : false,
    }
}