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
                return $http.get(targetAddr).then(function (result) {
                    return result.data;
                }, function (result) { //errorCallback
                    return null;
                });
            }
        }
    });

    mainModule.controller('mainCtrl', function ($scope, $http, playerStatsFactory) {
        $scope.btPattern="[a-zA-Z0-9]+#[0-9]{4,}";
        $scope.searchStats = function () {
			$('.searchHide').addClass('startHide');
            $('.loadingScreen').removeClass('startHide');
            playerStatsFactory.getData($scope.battleTag).then(function (data) {
                if (data == null) {
                    $scope.errorMessage = "Player of the searched battleTag does not exist";
                    $('.loadingScreen').addClass('startHide');
                    $('.status').removeClass('startHide');
                }
                else {
                    var quickPlayStats = {
                        level: data.eu.stats.quickplay.overall_stats.level,
                        prestige: data.eu.stats.quickplay.overall_stats.prestige,
                        wins: data.eu.stats.quickplay.overall_stats.wins,
                        kdratio: data.eu.stats.quickplay.game_stats.kpd,
                        eliminations: data.eu.stats.quickplay.game_stats.eliminations,
                        damage: data.eu.stats.quickplay.game_stats.damage_done,
                        healing: data.eu.stats.quickplay.game_stats.healing_done,
                        cards: data.eu.stats.quickplay.game_stats.cards,
                        goldmedals: data.eu.stats.quickplay.game_stats.medals_gold,
                        silvermedals: data.eu.stats.quickplay.game_stats.medals_silver,
                        bronzemedals: data.eu.stats.quickplay.game_stats.medals_bronze,
                        offensiveAss: data.eu.stats.quickplay.game_stats.offensive_assists,
                        defensiveAss: data.eu.stats.quickplay.game_stats.defensive_assists,
                        objective: 0
                        
                    };
                    if (data.eu.stats.quickplay.overall_stats.comprank != null) {
                        var competitive = {
                            comprank: data.eu.stats.competitive.overall_stats.comprank,
                            winratio: data.eu.stats.competitive.overall_stats.win_rate,
                            wins: data.eu.stats.competitive.overall_stats.wins,
                            kdratio: data.eu.stats.competitive.game_stats.kpd,
                            eliminations: data.eu.stats.competitive.game_stats.eliminations,
                            damage: data.eu.stats.competitive.game_stats.damage_done,
                            healing: data.eu.stats.competitive.game_stats.healing_done,
                            cards: data.eu.stats.competitive.game_stats.cards,
                            goldmedals: data.eu.stats.competitive.game_stats.medals_gold,
                            silvermedals: data.eu.stats.competitive.game_stats.medals_silver,
                            bronzemedals: data.eu.stats.competitive.game_stats.medals_bronze,
                            offensiveAss: data.eu.stats.competitive.game_stats.offensive_assists,
                            defensiveAss: data.eu.stats.competitive.game_stats.defensive_assists,
                            objective: 0
                        };
                        $scope.player = {
                            name: $scope.battleTag,
                            avatar: data.eu.stats.quickplay.overall_stats.avatar,
                            quickplayStats: quickPlayStats,
                            competitive: competitive
                        }
                        $('.loadingScreen').addClass('startHide');
                        $('.player').removeClass('startHide');
						$('.quick').removeClass('startHide');
                        $('.competitive').removeClass('startHide');
                    }
                    else {
                        $scope.player = {
                            name: $scope.battleTag,
                            avatar: data.eu.stats.quickplay.overall_stats.avatar,
                            quickplayStats: quickPlayStats
                        };
                        $('.loadingScreen').addClass('startHide');
                        $('.player').removeClass('startHide');
						$('.quick').removeClass('startHide');
                    }
                }
            });
        };
    });
});