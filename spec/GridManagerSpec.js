describe("GridManager", function() {
  
  var gridManager;

  beforeEach(function() {
    gridManager =  new GridManager({
      rows: 3, columns: 3
    }); gridManager.createGrid();

  });

  it(".getCell should return GridCell type of Object", function() {
      expect(
        (gridManager.getCell(0,0) instanceof GridCell)
      ).toBe(true);
  });

  it("getLeftToRight or getRightToLeft should only permitted when columns and rows are equal (the grid should be square grid)", function() {
      gridManager =  new GridManager({
        rows: 5, columns: 3
      }); gridManager.createGrid();

      expect( function() { gridManager.getLeftToRight() } ).toThrow();
  });

  it("should expect the total cells of nine", function() {
      expect(gridManager.cells).toEqual(9);
  });

  it("the cell of the first column and first row should return coordinates {x: 0, y: 0}", function() {
      expect(gridManager.getCell(0,0).coordinates).toEqual({x: 0, y: 0});
  });

  it("the cell of the last column and last row should return coordinates {x: 2, y: 2}", function() {
      expect(gridManager.getCell(gridManager.columns - 1, gridManager.rows - 1).coordinates).toEqual({x: 2, y: 2});
  });

  it("the second cell of the first row should return coordinates {x: 1, y: 0} ", function() {
      expect(gridManager.getRow(0)[1].coordinates).toEqual({x: 1, y: 0});
  });

  it("the last cell of the last column should return coordinates {x: 2, y: 2} ", function() {
      expect(gridManager.getColumn(gridManager.columns - 1)[gridManager.rows - 1].coordinates).toEqual({x: 2, y: 2});
  });

  it("the last cell of left to right diagonal cells should return coordinates {x: 2, y: 2}", function() {
      expect(gridManager.getLeftToRight()[gridManager.getLeftToRight().length - 1].coordinates).toEqual({x: 2, y: 2});
  });

  it("the last cell of right to left diagonal cells should return coordinates {x: 0, y: 2}", function() {
      expect(gridManager.getRightToLeft()[gridManager.getRightToLeft().length - 1].coordinates).toEqual({x: 0, y: 2});
  });

  it("coordinate x of coordinate string id 00 should be {x: 0, y: 0}", function() {
      expect(gridManager.getCellByCoordinatesId("00").coordinates).toEqual({x: 0, y: 0});
  });

  it("should return total value of 16 when each cell value of the first row is set to 5 2 and 9 ", function() {
      gridManager.getCellByCoordinatesId("00").value = 5;
      gridManager.getCellByCoordinatesId("10").value = 2;
      gridManager.getCellByCoordinatesId("20").value = 9;

      expect(
          gridManager.countTotalValue(gridManager.getRow(0))
      ).toEqual(16);
  });

  it("should expect exactly one row that has the toal value of 16", function() {
  
    gridManager.getCellByCoordinatesId("00").value = 5;
    gridManager.getCellByCoordinatesId("10").value = 2;
    gridManager.getCellByCoordinatesId("20").value = 9;
    var total_value = 16;
    var rows_has_total_value = 0;

    for(var i = 0; i < gridManager.rows; i++)
    {
      if(gridManager.countTotalValue(gridManager.getRow(i)) == total_value)
      {
          rows_has_total_value++;
      }
    }
    expect(rows_has_total_value).toEqual(1);

  });

  it("should expect exactly one row when concat the string of X three times and test with /X{3}/ regex pattern", function() {
  
    gridManager.getCellByCoordinatesId("00").value = "X";
    gridManager.getCellByCoordinatesId("10").value = "X";
    gridManager.getCellByCoordinatesId("20").value = "X";

    var rows_has_total_value = 0;
    var pattern = "X{"+gridManager.rows+"}";
    var patt = new RegExp(pattern);
    for(var i = 0; i < gridManager.rows; i++)
    {
      if(gridManager.countTotalValue(gridManager.getRow(i)).toString().match(patt))
      {
          rows_has_total_value++;
      }
    }

     expect(rows_has_total_value).toEqual(1);
  });

  it("setting all left to right diagonal cell to 1 should return the sum of 3", function() {

      _.each(gridManager.getLeftToRight(), function(cell, index) {
          cell.value =  1;
      });

      var total_value = 0;
      
      _.each(gridManager.getLeftToRight(), function(cell, index) {
           total_value += cell.value;
      });

      expect(total_value).toEqual(3);

      expect(
        gridManager.getCellByCoordinatesId("00").value + 
        gridManager.getCellByCoordinatesId("11").value +
        gridManager.getCellByCoordinatesId("22").value  
      ).toEqual(3);

      expect(
        gridManager.getCellByCoordinatesId("10").value  
      ).toBe(null);
  });
  
});
