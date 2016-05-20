(function() {
    'use strict';

    angular.module('app')
        .directive('includeReplace', function() {
            return {
                require: 'ngInclude',
                restrict: 'A',
                /* optional */
                link: function(scope, el, attrs) {
                    el.replaceWith(el.children());
                }
            };
        })
        .directive('miniNav', function($state) {
            return {
                link: function(scope, elem, attrs) {
                    elem.on('click', function() {
                        if (!$state.includes('design')) {
                            $('body').toggleClass('mini-navbar');
                        } else {
                            $('body').addClass('mini-navbar');
                        }
                        if ($('body').hasClass('mini-navbar')) {
                            $('.content,.add-region-box,.beacon-box,.add-beacon-box').css('width', $('.container-fluid').width() - 100);
                            $('.menu').scope().vm.openCollapse = function() {
                                this.isCollapsed = true;
                            };
                            $('.menu').scope().vm.openCollapse();
                        } else {
                            if (!$state.includes('design')) {
                                $('.content,.add-region-box,.beacon-box,.add-beacon-box').css('width', '');
                                $('.menu').scope().vm.openCollapse = function() {
                                    this.isCollapsed = !this.isCollapsed;
                                };
                                if ($state.includes('analytics')) {
                                    $('.menu').scope().vm.isCollapsed = false;
                                }
                            }
                        }
                    });
                }
            };
        }).directive("loader", function() {
            return function($scope, element, attrs) {
                $scope.$on("loader_show", function() {
                    return element.show();
                });
                return $scope.$on("loader_hide", function() {
                    return element.hide();
                });
            };
        }).directive('ngDynamicController', function($compile) {
            return {
                scope: {
                    name: '=ngDynamicController'
                },
                restrict: 'A',
                terminal: true,
                priority: 100000,
                link: function(scope, elem, attrs) {
                    elem.attr('ng-controller', scope.name);
                    elem.removeAttr('ng-dynamic-controller');

                    $compile(elem)(scope);
                }
            };
        });
})();
