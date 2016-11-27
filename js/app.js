/**
 * Created by GPDellKonto on 2016-11-25.
 */
define(function() {
    var mainModule = angular.module('app', []);

    mainModule.factory('playerStatsFactory', function ($http) {
        return {
            getData: function (battletag) {
                var battletagEl = battletag.split("#");
                var targetAddr = "https://owapi.net/api/v3/u/" + battletagEl[0] + "-" + battletagEl[1] + "/blob";
                $http.get(targetAddr).then(function (result) {
                    return result.data;
                });
            }
        }
    });

    mainModule.controller('mainCtrl', function ($scope, $http, playerStatsFactory) {
        $scope.searchStats = function () {
            playerStatsFactory.getData($scope.battleTag).then(function (data) {
                if (data.eu = null) {
                    $scope.errorMessage = "Player not found";
                    $('.status').removeClass('startHide');
                }
                else {
                    var quickPlayStats = {
                        level: data.eu.stats.quickplay.overall_stats.level,
                        prestige: data.eu.stats.quickplay.overall_stats.prestige,
                        wins: data.eu.stats.quickplay.overall_stats.wins,
                        kdratio: data.eu.stats.quickplay.game_stats.kpd
                    };
                    if (data.eu.stats.quickplay.overall_stats.comprank != null) {
                        var competitive = {
                            comprank: data.eu.stats.competitive.overall_stats.comprank,
                            winratio: data.eu.stats.competitive.overall_stats.win_rate,
                            wins: data.eu.stats.competitive.overall_stats.wins,
                            kdratio: data.eu.stats.competitive.overall_stats.kpd
                        };
                        $scope.player = {
                            avatar: data.eu.stats.quickplay.avatar,
                            quickplayStats: quickPlayStats,
                            competitive: competitive
                        }
                        $('.player .quick .competitive').removeClass('startHide');
                    }
                    else {
                        $scope.player = {
                            avatar: data.eu.stats.quickplay.avatar,
                            quickplayStats: quickPlayStats
                        };
                        $('.player .quick').removeClass('startHide');
                    }
                }
            });
        };
    });
});