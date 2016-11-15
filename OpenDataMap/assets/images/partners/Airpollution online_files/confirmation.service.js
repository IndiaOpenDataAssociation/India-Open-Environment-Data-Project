// (function() {
//     'use strict';

//     angular.module('app')
//         .service('confirmation', confirmation)
//         .controller('confirmationCtrl', confirmationCtrl);

//     function confirmation($modal) {
//         this.getModal = function(title) {
//             return $modal.open({
//                 templateUrl: 'app/templates/confirmation/confirmation.html',
//                 controller: 'confirmationCtrl',
//                 resolve: {
//                     title: function() {
//                         return title;
//                     }
//                 },
//                 backdrop: 'static',
//                 size: 'md',
//                 keyboard : false
//             });
//         };
//     }

//     function confirmationCtrl($modalInstance, $scope, title) {
//         $(document).find("div.fadeInModal").fadeOut("fast");
//         $scope.title = title;
//         $scope.ok = function() {
//             $modalInstance.close();
//         };
//         $scope.cancel = function() {
//             $(document).find("div.fadeInModal").fadeIn("fast");
//             $modalInstance.dismiss('cancel');
//         };
//     }
// })();
