var app = angular.module("app", ['ngAnimate']);
app.controller("mainCtrl", function($scope, GridChecker) {
	$scope.player1Symbol = "X";
	$scope.player2Symbol = "O";

	$scope.cellClickHandler = function(gridCell, gridManager) {
		gridCell.value = "X";
		
		GridChecker.initialize({
			gridManager: gridManager,
			value: $scope.player1Symbol
		});
		
		if(GridChecker.checkAllRows())
			console.log(GridChecker.completed_cells);
	}

});


app.directive("tlGrid", function(GridManager) {
	return {
		scope : {
			columns: "=",
			rows: "=",
			cellWidth: "=",
			cellHeight: "=",
			grid: "&",
			cellClickHandler: "="
		},
		replace: true,
		templateUrl: 'tlGridTemplate.html',
		controller: function($scope) {
			var gridManager = new GridManager({
				columns: $scope.columns, rows: $scope.rows
			});
			$scope.gridManager = gridManager; 
			gridManager.createGrid();
		},
		link: function(scope, element, attrs, controller) {
			jQuery(element).css({
				width:  scope.cellWidth * scope.columns,
				height: scope.cellHeight  * scope.rows,
			});
		}
	}
});

app.factory("GridManager", function() {
	return GridManager;
});

app.factory("GridChecker", function() {
	return GridChecker;
});