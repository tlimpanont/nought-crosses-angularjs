(function(window, _) {
	
	GridChecker = {};

	GridChecker.initialize = function(options) {
		GridChecker.gridManager = options.gridManager;
		GridChecker.value = options.value;
		GridChecker.getCompleted = function() {
			return null;
		}
	}

	GridChecker.getRandomFreeCell = function() {
		var gridCells = _.filter(_.flatten(GridChecker.gridManager.grid), function(gridCell) {
			return gridCell.value == null;
		});
		return _.sample(gridCells);
	}

	
	GridChecker.checkCompletedRow = function() {
		_.each(GridChecker.gridManager.getAllRows(), function(row, rowIndex) {
			var total_value = GridChecker.gridManager.countTotalValue(
									GridChecker.gridManager.getRow(rowIndex)
								).toString();
			var pattern = GridChecker.value+"{"+GridChecker.gridManager.rows+"}";
    		var patt = new RegExp(pattern);

			if(total_value.match(patt))
			{
				GridChecker.getCompleted = function() {
					return {
						instance: "Row",
						index: rowIndex,
						cells : GridChecker.gridManager.getRow(rowIndex)
					}
				}
				return true;	
			}	
		});
		return false;
	}

	GridChecker.checkCompletedColumn = function() {
		_.each(GridChecker.gridManager.getAllColumns(), function(row, columnIndex) {
			var total_value = GridChecker.gridManager.countTotalValue(
									GridChecker.gridManager.getColumn(columnIndex)
								).toString();
			var pattern = GridChecker.value+"{"+GridChecker.gridManager.columns+"}";
    		var patt = new RegExp(pattern);

			if(total_value.match(patt))
			{
				GridChecker.getCompleted = function() {
					return {
						instance: "Column",
						index: columnIndex,
						cells : GridChecker.gridManager.getColumn(columnIndex)
					}
				}
				return true;	
			}
		});
		return false;
	}

	GridChecker.checkCompletedLeftToRight = function() {
		var left_to_right = GridChecker.gridManager.getLeftToRight();
		var total_value = GridChecker.gridManager.countTotalValue(left_to_right).toString();

		var pattern = GridChecker.value+"{"+left_to_right.length+"}";
		var patt = new RegExp(pattern);

		if(total_value.match(patt))
		{
			GridChecker.getCompleted = function() {
				return {
					instance: "leftToRight",
					index: null,
					cells : left_to_right
				}
			}
			return true;	
		}

		return false;
	}

	GridChecker.checkCompletedRightToLeft = function() {
		var right_to_left = GridChecker.gridManager.getRightToLeft();
		var total_value = GridChecker.gridManager.countTotalValue(right_to_left).toString();

		var pattern = GridChecker.value+"{"+right_to_left.length+"}";
		var patt = new RegExp(pattern);

		if(total_value.match(patt))
		{
			GridChecker.getCompleted = function() {
				return {
					instance: "leftToRight",
					index: null,
					cells : right_to_left
				}
			}
			return true;	
		}
		return false;
	}

	GridChecker.checkForDraw = function() {
		return (_.countBy(_.flatten(GridChecker.gridManager.grid), function(gridCell) {
			return gridCell.value != null;
		}).true >= GridChecker.gridManager.cells) ? true : false;
	}

})(window, _);