var app = angular.module("app", ['ngAnimate']);
app.controller("mainCtrl", function($scope, GridChecker, $animate, $timeout, Player, PlayersManager) {
	$scope.player = new Player({ symbol: "X", isPlaying: true});
	$scope.player.className = "player1";
	$scope.computer = new Player({ symbol: "O", isPlaying: false});
	$scope.computer.className = "computer";

	PlayersManager.addPlayer($scope.player);
	PlayersManager.addPlayer($scope.computer);

	$scope.PlayersManager = PlayersManager;
	$scope.GridChecker = GridChecker;
	$scope.draw = false;

	$scope.cellClickHandler = function(gridCell, gridManager, event) {
		if(gridCell.value != undefined)
			if(event != null &&  PlayersManager.getCurrentPlayer() === $scope.computer || gridCell.value)	
				return false;
	
		gridCell.value = PlayersManager.getCurrentPlayer().symbol;
		gridCell.className = PlayersManager.getCurrentPlayer().className;
		
		GridChecker.initialize({
	        gridManager: gridManager,
	        value: PlayersManager.getCurrentPlayer().symbol
    	});


	    GridChecker.checkCompleted("getAllRows");
	    GridChecker.checkCompleted("getAllColumns");
	    GridChecker.checkCompleted("getRightToLeft");
	    GridChecker.checkCompleted("getLeftToRight");
		   
	    var completed = GridChecker.getCompleted();
	   	
	    if( completed == null) 
	    {
	    	PlayersManager.switchPlayer();

	    	if(PlayersManager.getCurrentPlayer() === $scope.computer)
	    		$timeout(function() {
	    			var next_grid_cell = GridChecker.getRandomFreeCell();
	    			$scope.cellClickHandler(next_grid_cell, gridManager, null);
	    		}, 800)
	    }
	    else
	    {
	    	_.map(completed.cells, function(gridCell) {
	    		gridCell.completed = true;
	    	});
	    }
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

app.factory("PlayersManager", function() {
	PlayersManager = {};
	PlayersManager.players = new Array();
	PlayersManager.addPlayer = function(player) {
		if(PlayersManager.players.length >= 2)
			throw Error("You can't add no more than two players!");
		PlayersManager.players.push(player);
	}
	PlayersManager.getCurrentPlayer = function() {
		return (PlayersManager.players[0].isPlaying) ? PlayersManager.players[0] : PlayersManager.players[1]; 
	}
	PlayersManager.switchPlayer = function() {
		PlayersManager.players[0].isPlaying = !PlayersManager.players[0].isPlaying;
    	PlayersManager.players[1].isPlaying = !PlayersManager.players[1].isPlaying;
	}
	return PlayersManager;
});

app.factory("Player", function() {
	Player = function(options) {
		this.symbol = options.symbol.toString();
		this.isPlaying = options.isPlaying;
		this.isWinning = false;
	};

	return Player;

});