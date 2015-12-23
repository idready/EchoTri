
'use strict';

myApp.controller('ModalCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

    console.log('Modal controller');

    $scope.closeModal = function closeModal(evt) {

        if(typeof evt !== 'undefined') evt.preventDefault();
        $rootScope.$emit('closeModal');
    }

}]);