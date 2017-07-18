var SystemBuilder = require('systemjs-builder');
var argv = require('yargs').argv;
var builder = new SystemBuilder();

  builder.loadConfig('systemjs.config.js')
    .then(function() {
        /**** Bundle Common Files into common bundle ****/
        var depOutputFile = argv.prod ? 'dist/common.min.js' : 'dist/common.js';
        return builder.bundle('(wp1 & wp2 & grpMngmnt & VehicleRegistration & VehicleRegistrationReactive)', depOutputFile, {
            minify: argv.prod,
            mangle: argv.prod,
            sourceMaps: argv.prod,
            rollup: argv.prod
        });
    })
    .then(function() {
        /**** Bundle ProdMode Files into prodMode bundle ****/
        var appSource = argv.prod ? 'prodMode - dist/common.min.js' : 'prodMode - dist/common.js';
        var appOutputFile = argv.prod ? 'dist/prodMode.min.js' : 'dist/prodMode.js';
        return builder.bundle(appSource, appOutputFile, {
            minify: argv.prod,
            mangle: argv.prod,
            sourceMaps: argv.prod,
            rollup: argv.prod
        });
    })
    .then(function() {
        /**** Bundle WP1 Files into wp1 bundle ****/
        var appSource = argv.prod ? 'wp1 - dist/common.min.js' : 'wp1 - dist/common.js';
        var appOutputFile = argv.prod ? 'dist/wp1.min.js' : 'dist/wp1.js';
        return builder.bundle(appSource, appOutputFile, {
            minify: argv.prod,
            mangle: argv.prod,
            sourceMaps: argv.prod,
            rollup: argv.prod
        });
    })
    .then(function() {
        /**** Bundle WP2 Files into wp2 bundle ****/
        var appSource = argv.prod ? 'wp2 - dist/common.min.js' : 'wp2 - dist/common.js';
        var appOutputFile = argv.prod ? 'dist/wp2.min.js' : 'dist/wp2.js';
        return builder.bundle(appSource, appOutputFile, {
            minify: argv.prod,
            mangle: argv.prod,
            sourceMaps: argv.prod,
            rollup: argv.prod
        });
    })
  .then(function() {
        /**** Bundle grpMngmnt Files into grpMngmnt bundle ****/
        var appSource = argv.prod ? 'grpMngmnt - dist/common.min.js' : 'grpMngmnt - dist/common.js';
        var appOutputFile = argv.prod ? 'dist/grpMngmnt.min.js' : 'dist/grpMngmnt.js';
        return builder.bundle(appSource, appOutputFile, {
            minify: argv.prod,
            mangle: argv.prod,
            sourceMaps: argv.prod,
            rollup: argv.prod
        });
    })
	 .then(function() {
        /**** Bundle VehicleRegistration Files into VehicleRegistration bundle ****/
        var appSource = argv.prod ? 'VehicleRegistration - dist/common.min.js' : 'VehicleRegistration - dist/common.js';
        var appOutputFile = argv.prod ? 'dist/VehicleRegistration.min.js' : 'dist/VehicleRegistration.js';
        return builder.bundle(appSource, appOutputFile, {
            minify: argv.prod,
            mangle: argv.prod,
            sourceMaps: argv.prod,
            rollup: argv.prod
        });
    })
	 .then(function() {
        /**** Bundle VehicleRegistration Files into VehicleRegistration bundle ****/
        var appSource = argv.prod ? 'VehicleRegistrationReactive - dist/common.min.js' : 'VehicleRegistrationReactive - dist/common.js';
        var appOutputFile = argv.prod ? 'dist/VehicleRegistrationReactive.min.js' : 'dist/VehicleRegistrationReactive.js';
        return builder.bundle(appSource, appOutputFile, {
            minify: argv.prod,
            mangle: argv.prod,
            sourceMaps: argv.prod,
            rollup: argv.prod
        });
    })
	  /**** 
	.then(function() {
      Bundle NgTaxServices Files into NgTaxServices bundle 
        var appSource = argv.prod ? 'NgTaxServices - dist/common.min.js' : 'NgTaxServices - dist/common.js';
        var appOutputFile = argv.prod ? 'dist/NgTaxServices.min.js' : 'dist/NgTaxServices.js';
        return builder.bundle(appSource, appOutputFile, {
            minify: argv.prod,
            mangle: argv.prod,
            sourceMaps: argv.prod,
            rollup: argv.prod
        });
    })****/
    .then(function() {
        console.log('bundle built successfully');
    }); 