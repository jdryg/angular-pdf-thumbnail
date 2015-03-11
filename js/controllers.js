(function (angular, document) {
	"use strict";
	
	angular.module("DemoApp.Controllers", []).
	controller("DemoController", ["$scope", function ($scope) {
		$scope.pdf = {
			file: null,
			thumbnail: ""
		};
		
		$scope.onFileChanged = function () {
			// NOTE: The Angular way of doing this is to have another directive.
			// This is a demo so, we don't care. The point here is to be able to retrieve
			// the File from the input field and feed it to the pdf-thumbnail directive.
			$scope.$apply(function() {
				$scope.pdf.file = document.getElementById('file_input').files[0];
			});
		};
	}]);
})(angular, document);
