describe("GridChecker", function() {
  
  var gridManager;


  beforeEach(function() {
    gridManager =  new GridManager({
      rows: 3, columns: 3
    }); gridManager.createGrid();

    GridChecker.initialize({
        gridManager: gridManager,
        value: "X"
    });

  });

  afterEach(function() {

  });

  it("grid check must initialize gridManager and value to check", function() {
        expect((GridChecker.gridManager instanceof GridManager)).toBe(true);
        expect(GridChecker.value).toEqual("X");
  });

  it("when the first row is all marked with X it should return a completed object with rowIndex = 0", function() {
   
     gridManager.getCellByCoordinatesId("02").value = "X";
     gridManager.getCellByCoordinatesId("12").value = "X";
     gridManager.getCellByCoordinatesId("22").value = "X";
     
    GridChecker.checkCompleted("getAllRows");
    expect(GridChecker.getCompleted()).not.toBe(null);

  });

 it("when we begin with clean grid, none of the row should be marked as completed", function() {
    GridChecker.checkCompleted("getAllRows");
    expect(GridChecker.getCompleted()).toBe(null);
  });

  it("when we only marked the row cells check checkCompletedColumn should return completed object", function() {
     
      gridManager.getCellByCoordinatesId("02").value = "X";
      gridManager.getCellByCoordinatesId("12").value = "X";
      gridManager.getCellByCoordinatesId("22").value = "X";

      GridChecker.checkCompleted("getAllColumns");
      expect(GridChecker.getCompleted()).toBe(null);
  });

  it("all cells of the first column is marked with X, this should return a completed object ", function() {
     
      gridManager.getCellByCoordinatesId("00").value = "X";
      gridManager.getCellByCoordinatesId("01").value = "X";
      gridManager.getCellByCoordinatesId("02").value = "X";

      GridChecker.checkCompleted("getAllColumns");
      expect(GridChecker.getCompleted()).not.toBe(null);
  });

  it("left to right succesfully check completed", function() {
     
     _.map(gridManager.getLeftToRight(), function(gridCell) {
        gridCell.value = "X";
     });

      GridChecker.checkCompleted("getLeftToRight");
      expect(GridChecker.getCompleted()).not.toBe(null);

  });

  it("right to left succesfully check completed", function() {
     
     _.map(gridManager.getRightToLeft(), function(gridCell) {
        gridCell.value = "X";
     });

      GridChecker.checkCompleted("getRightToLeft");
      expect(GridChecker.getCompleted()).not.toBe(null);

  });

  it("even we combined all checks the result have to be one completed object", function() {
     
    gridManager.getCellByCoordinatesId("02").value = "X";
    gridManager.getCellByCoordinatesId("12").value = "X";
    gridManager.getCellByCoordinatesId("22").value = "X";

    GridChecker.checkCompleted("getAllRows");
    GridChecker.checkCompleted("getAllColumns");
    GridChecker.checkCompleted("getRightToLeft");
    GridChecker.checkCompleted("getLeftToRight");
   
    expect(GridChecker.getCompleted()).not.toBe(null);
   
    expect(GridChecker.getCompleted().cells[0].coordinates_id).toEqual("02");
    expect(GridChecker.getCompleted().cells[1].coordinates_id).toEqual("12");
    expect(GridChecker.getCompleted().cells[2].coordinates_id).toEqual("22");

  });

  it("random free cell should work", function() {
     
    _.map(_.flatten(gridManager.grid), function(gridCell) {
        if(gridCell.coordinates_id !== "22")
            return gridCell.value = "X";
    });

    expect((GridChecker.getRandomFreeCell() instanceof GridCell)).toBe(true);
    expect((GridChecker.getRandomFreeCell()).coordinates_id).toEqual("22");
    

  });

  xit("search for a potentonial winner field.", function() {
     
    gridManager.getCellByCoordinatesId("02").value = "X";
    gridManager.getCellByCoordinatesId("12").value = "X";

    gridManager.getCellByCoordinatesId("00").value = "X";
    gridManager.getCellByCoordinatesId("10").value = "X";
   
    GridChecker.checkCompleted("getAllRows");
    GridChecker.checkCompleted("getAllColumns");
    GridChecker.checkCompleted("getRightToLeft");
    GridChecker.checkCompleted("getLeftToRight");

    expect(GridChecker.getCompleted()).toBe(null);

  });

  
});

