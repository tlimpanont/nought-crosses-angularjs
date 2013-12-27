var app = angular.module("app", ['ngAnimate']);
app.controller("mainCtrl", function($scope, GridChecker, $animate, $timeout, Player) {
	$scope.player = new Player({
		symbol: 1,
		isPlaying: true
	});
	
	$scope.computer = new Player({
		symbol: 2,
		isPlaying: false
	});

	$scope.cellClickHandler = function(gridCell, gridManager, event) {
	
		if(event != null && getCurrentPlayer() === $scope.computer)
			return false;

		gridCell.value = getCurrentPlayer().symbol;
		
		GridChecker.initialize({
	        gridManager: gridManager,
	        value: getCurrentPlayer().symbol
    	});


	    GridChecker.checkCompletedLeftToRight();
	    GridChecker.checkCompletedRightToLeft();
	    GridChecker.checkCompletedRow();
	    GridChecker.checkCompletedColumn();
	    
	    if(GridChecker.checkForDraw())
	    	throw new Error("A game has ended as a draw!");


	    var completed = GridChecker.getCompleted();

	    if( completed == null) 
	    {
	    	
	    	$scope.player.isPlaying = !$scope.player.isPlaying;
	    	$scope.computer.isPlaying = !$scope.computer.isPlaying;

	    	if(getCurrentPlayer() === $scope.computer)
	    		$timeout(function() {
	    			$scope.cellClickHandler(GridChecker.getRandomFreeCell(), gridManager, null);
	    		}, 3000)

	    }
	    else
	    {
	    	// current player wins!
	    	_.map(completed.cells, function(gridCell) {
	    		gridCell.completed = true;
	    	});

	    	alert("Symbol " + getCurrentPlayer().symbol + " has won the game");
	    	//window.location.reload();
	    	//gridManager.createGrid();
	    }
	}

	function getCurrentPlayer() {
		return ($scope.player.isPlaying) ? $scope.player : $scope.computer;
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
			cellClickHandler: "=",
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

app.factory("Player", function() {
	Player = function(options) {
		this.symbol = options.symbol.toString();
		this.isPlaying = options.isPlaying;
		this.isWinning = false;
	};

	return Player;

});