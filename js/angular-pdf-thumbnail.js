/*
 * angular-pdf-thumbnail v1.0.0
 * https://github.com/jdryg/angular-pdf-thumbnail
 */
(function (angular, PDFJS) {
	"use strict";

	angular.module("angular-pdf-thumbnail", []).
	directive("pdfThumbnail", function () {
		return {
			restrict: "E",
			replace: false,
			scope: {
				file: "=",
				thumbnail: "="
			},
			template: "<img alt='Thumbnail' />",
			controller: ["$scope", function ($scope) {
				$scope.generateThumbnail = function (file) {
					var reader = new FileReader();
					
					reader.onload = function(e) {
						var arrayBuffer = e.target.result;
						var uint8Array = new Uint8Array(arrayBuffer);

						PDFJS.disableTextLayer = true;
						PDFJS.getDocument(uint8Array).then(function (_pdfDoc) {
							_pdfDoc.getPage(1).then(function (page) {
								var canvas = angular.element("<canvas></canvas>")[0];

								var viewport = page.getViewport(1.0);
								var ctx = canvas.getContext('2d');

								var viewerWidth = $scope.thumbnailWidth !== 0 ? $scope.thumbnailWidth : $scope.imgElement.width;
								var scale = viewerWidth / viewport.width;

								viewport = page.getViewport(scale);

								canvas.width = viewport.width;
								canvas.height = viewport.height;

								page.render({
									canvasContext: ctx,
									viewport: viewport
								}).then(function () {
									$scope.$apply(function () {
										var imgDataURL = canvas.toDataURL();
										$scope.imgElement.src = imgDataURL;

										imgDataURL.replace(" ", "+");
										$scope.thumbnail = imgDataURL;
									});
								});
							});
						});
					};

					reader.readAsArrayBuffer(file);
				};
			}],
			link: function (scope, element, attrs) {
				scope.imgElement = element.find("img")[0];
				scope.thumbnailWidth = attrs.thumbWidth | 0;
				
				scope.$watch('file', function () {
					if(scope.file !== null) {
						scope.generateThumbnail(scope.file);
					}
				});
			}
		};
	});
})(angular, PDFJS);
