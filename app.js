var app = angular.module("app", ['ngAnimate']);
app.controller("mainCtrl", function($scope, gridChecker) {
	$scope.player1Symbol = "X";
	$scope.player1Symbol = "X";
	$scope.cellClickHandler = function(gridCell, gridManager) {
		gridCell.value = "X";
		gridChecker.setGridManager(gridManager);
		
		if(gridChecker.checkAllRows())
			console.log(gridChecker.completed_cells);
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

app.factory("gridChecker", function() {
	var gridChecker = {};
	gridChecker.completed_cells = null;
	gridChecker.setGridManager = function(gridManager) {
		gridChecker.gridManager = gridManager;
	}

	gridChecker.checkAllRows = function() {
		
		_.each(gridChecker.gridManager.getAllRows(), function(row, rowIndex) {
			var counter = 0;
			_.each(gridChecker.gridManager.getRow(rowIndex), function(gridCell) {
				if(gridCell.value == "X")
					counter++;
			});

			if(counter >= gridChecker.gridManager.rows)
				alert("at " + rowIndex);
		});

		return false;
	}

	gridChecker.checkAllColumns = function() {
		_.each(gridChecker.gridManager.getAllColumns(), function(column, columnIndex) {
			var counter = 0;
			_.each(column, function(gridCell) {
				if(gridCell.value == "X")
					counter++;
			});
			if(counter >= gridChecker.gridManager.columns)
				counter = 0; gridChecker.completed_cells = gridChecker.gridManager.getColumn(columnIndex); return true;
		});
		return false;
	}

	gridChecker.checkLeftToRight = function() {

	}

	gridChecker.checkRightToLeft = function() {

	}
	return gridChecker;
});