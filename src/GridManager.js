/*	required
	underscore : http://underscorejs.org/underscore-min.js
 */
(function(window, _) {

	/**
	 * Class for creating simple 2-dimensional grid with columns en rows. It provides query methods for searching a specific cell, row or column.
	 * @param {Object} options Setting columns and rows 
	 */
	GridManager = function(options) {
		/**
		 * Number of columns
		 * @type {int}
		 */
		this.columns = options.columns;
		/**
		 * Number of rows
		 * @type {int}
		 */
		this.rows = options.rows;
		/**
		 * Total grid cells based on colums and rows
		 * @type {int}
		 */
		this.cells = this.columns * this.rows;
		/**
		 * The grid containing GridCell objects
		 * @type {Array}
		 */
		this.grid = new Array();
	};

	/**
	 * GridCell represent each cell of the grid.
	 */
	GridCell = function() {
		this.coordinates_id = "";
		this.coordinates = new Object();
		this.value = null;
	}
	/**
	 * Create Grid based on the defined columns and rows
	 * @return {Array} Array of GridCell objects
	 */
	GridManager.prototype.createGrid = function() {
		
		for (var x = 0; x < this.columns; x++) 
		{
			this.grid[x] = new Array();
			for (var y = 0; y < this.rows; y++) 
			{
				var gridCell = new GridCell();
				gridCell.coordinates_id =  x.toString()+y.toString() ;
				gridCell.coordinates = {x: x, y: y};
				this.grid[x][y] =  gridCell;
			}
		}
		return this.grid;
	}

	/**
	 * [getAllRows description]
	 * @return {Array} [description]
	 */
	GridManager.prototype.getAllRows = function() {
		var rows = new Array();
		for(var i = 0; i < this.rows; i++)
		{
			rows.push(this.getRow(i));
		}
		return rows;
	}

	/**
	 * [getAllColumns description]
	 * @return {Array} [description]
	 */
	GridManager.prototype.getAllColumns = function() {
		var columns = new Array();
		for(var i = 0; i < this.columns; i++)
		{
			columns.push(this.getColumn(i));
		}
		return columns;
	}

	/**
	 * Get GridCell object
	 * @param  {int} columnIndex
	 * @param  {int} rowIndex
	 * @return {GridCell} 
	 */
	GridManager.prototype.getCell = function(columnIndex, rowIndex) {
		return this.grid[columnIndex][rowIndex];
	}

	/**
	 * Get all the GridCell objects of a specific row
	 * @param  {int} rowIndex
	 * @return {Array} Array of GridCell objects
	 */
	GridManager.prototype.getRow = function(rowIndex) {
		var row = new Array();
		for (var x = 0; x < this.columns; x++) 
		{
			for (var y = 0; y < this.rows; y++) 
			{
				if(rowIndex == y)
					row.push(this.grid[x][y]);
			}
		}
		return row;
	}

	/**
	 * Get all the GridCell objects of a specific column
	 * @param  {int} columnIndex
	 * @return {Array} Array of GridCell objects
	 */
	GridManager.prototype.getColumn = function(columnIndex) {
		var column = new Array();
		for (var x = 0; x < this.columns; x++) 
		{
			for (var y = 0; y < this.rows; y++) 
			{
				if(columnIndex == x)
					column.push(this.grid[x][y]);
			}
		}
		return column;
	}

	/**
	 * Loop through all cells from most upper left cell to most bottom right cell and return GridCell objects
	 * @return {Array} Array of GridCell objects
	 */
	GridManager.prototype.getLeftToRight = function() {
		if(this.columns != this.rows)
			throw new Error("Columns must be Equal to Rows if getting diagonal cells. The grid should be a square grid.");
		var left_to_right = new Array();
		for (var x = 0; x < this.columns; x++) 
		{
			for (var y = 0; y < this.rows; y++) 
			{
				left_to_right.push(this.grid[x][y]); 
				x++;
				x + y;	
			}
		}
		return left_to_right;
	}
	/**
	 * Loop through all cells from most upper right cell to most bottom left cell and return GridCell objects
	 * @return {Array} Array of GridCell objects
	 */
	GridManager.prototype.getRightToLeft = function() {
		if(this.columns != this.rows)
			throw new Error("Columns must be Equal to Rows if getting diagonal cells. The grid should be a square grid.");
		var right_to_left = new Array();
		for (var x = this.columns - 1; x >= 0; x--) 
		{
			for (var y = 0; y < this.rows; y++) 
			{
				right_to_left.push(this.grid[x][y]);
				x--;
			}
		}
		return right_to_left;
	}

	/**
	 * Search a specifc GridCell by coordinates_id. Grid cells are instantiating with some default properties like coordinates_id (string).
	 * @param  {string} coordinates_id Coordinates Id like "00" or "22" where left value is x coordinate and right value is y coordinate
	 * @return {GridCell} A specific GridCell object
	 */
	GridManager.prototype.getCellByCoordinatesId = function(coordinates_id) {
		return _.findWhere(_.flatten(this.grid), {coordinates_id : coordinates_id });
	}

	/**
	 * Sum or concatenating the value of all the GridCells in the given array 
	 * @param  {Array} Array of GridCell objects
	 * @return {int|string}  The sum or concatenating string of GridCell.value
	 */
	GridManager.prototype.countTotalValue = function(cells) {
		var total = null;
		_.each(cells, function(cell, index) {
			total += cell.value;
		});
		return total;
	}

})(window, _);