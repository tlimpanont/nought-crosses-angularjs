(function(window, _) {
	
	GridChecker = {};

	GridChecker.initialize = function(options) {
		GridChecker.gridManager = options.gridManager;
		GridChecker.value = options.value;
		GridChecker.getCompleted = function() {
			return null;
		}

		GridChecker.getBeforeCompleted = function() {
			return null;
		}
	}

	GridChecker.getRandomFreeCell = function() {
		var gridCells = _.filter(_.flatten(GridChecker.gridManager.grid), function(gridCell) {
			return gridCell.value == null;
		});
		return _.sample(gridCells);
	}

	GridChecker.checkCompleted = function(getSeries) {
		var getSeries = getSeries;
		var getCells = "";

		switch(getSeries) {
			case "getAllRows" :
				getCells = "getRow";
			break;
			case "getAllColumns" :
				getCells = "getColumn";
			break;
			default: 
				getCells = getSeries;
		}

		
		var pattern_length = GridChecker.gridManager[getSeries]().length;

		_.each(GridChecker.gridManager[getSeries](), function(instance, index) {
			
			var total_value = GridChecker.gridManager.countTotalValue(
									GridChecker.gridManager[getCells](index)
								).toString();

			var completed_pattern = GridChecker.value+"{"+pattern_length+"}";
    		completed_pattern = new RegExp(completed_pattern);
    		   		
    		if(total_value.match(completed_pattern))
			{
				GridChecker.getCompleted = function() {
					return {
						cells : GridChecker.gridManager[getCells](index)
					}
				}
				return true;	
			}

		});
		return false;
	}

	GridChecker.checkForDraw = function() {
		return (_.countBy(_.flatten(GridChecker.gridManager.grid), function(gridCell) {
			return gridCell.value != null;
		}).true >= GridChecker.gridManager.cells) ? true : false;
	}

})(window, _);