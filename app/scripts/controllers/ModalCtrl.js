
'use strict';

myApp.controller('ModalCtrl', ['MY_EVENTS', '$scope', '$rootScope', function(MY_EVENTS, $scope, $rootScope) {

    console.log('Modal controller');

    $scope.closeModal = function closeModal(evt) {

        if(angular.isDefined(evt)) evt.preventDefault();
        $rootScope.$emit(MY_EVENTS.MODAL_CLOSE);
    }

}]);
