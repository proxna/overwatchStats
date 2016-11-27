/**
 * Created by GPDellKonto on 2016-11-25.
 */
require.config({
    paths:{
        'jquery':'../bower_components/jquery/dist/jquery',
        'angular':'../bower_components/angular/angular',
        'app':'app'
    },
    shim:{
        'angular':{
            deps:['jquery']
        },
        'app':{
            deps:['angular', 'jquery']
        }
    }
});
require(['app'], function () {
    angular.bootstrap(document, ['app']);
});