/**
 * Created by GPDellKonto on 2016-12-08.
 */
define(function() {
    $('.detailsButton').click(function () {
        var className = $(this).attr('id') + "-details";
        console.log(className);
        $('.' + className).toggleClass('startHide');
    });
});