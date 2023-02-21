const checkUp = (canvaBoard, id = 1) => {
  let row = Math.floor(id / 18);
  let upSimilar = [];
  if (row == 0) return [];
  let candyType = canvaBoard[id].type;
  let previous = id - 18;
  row--;
  while (row >= 0) {
    if (canvaBoard[previous].type == candyType) {
      upSimilar = [canvaBoard[previous].id, ...upSimilar];
    } else {
      return upSimilar;
    }
    previous -= 18;
    row--;
  }
  return upSimilar;
};
const checkDown = (canvaBoard, id = 1) => {
  let row = Math.floor(id / 18);
  let downSimilar = [];
  if (row == 8) return [];
  let candyType = canvaBoard[id].type;
  let next = id + 18;
  row++;
  while (row <= 8) {
    if (canvaBoard[next].type == candyType) {
      downSimilar = [...downSimilar, canvaBoard[next].id];
    } else {
      return downSimilar;
    }
    next += 18;
    row++;
  }
  return downSimilar;
};
export const checkColumn = (canvaBoard, id = 1) => {
  let up = checkUp(canvaBoard, id);
  up.sort();
  let down = checkDown(canvaBoard, id);
  down.sort();
  if (up.length + down.length < 2) return false;
  return [...up, ...down].sort();
};

const checkLeft = (canvaBoard, i = 1) => {
  if (i % 18 == 0) return [];
  let leftSimilair: Number[] = [];
  let column = i - 1;
  let candyType = canvaBoard[i].type;

  while (column % 18 >= 0) {
    if (canvaBoard[column].type == candyType) {
      leftSimilair = [column, ...leftSimilair];
    } else {
      return leftSimilair;
    }
    column--;
  }
  return leftSimilair;
};
const checkRight = (canvaBoard, i = 1) => {
  if (i % 18 == 17) return [];
  let rightSimilair = [];
  let column = i + 1;
  let candyType = canvaBoard[i].type;

  while (column % 18 <= 17 && column < 162) {
    console.log(column);
    if (canvaBoard[column].type == candyType) {
      rightSimilair = [...rightSimilair, column];
    } else {
      return rightSimilair;
    }
    column++;
  }
  return rightSimilair;
};

export const checkRow = (canvaBoard, id = 1) => {
  let left = checkLeft(canvaBoard, id);
  let right = checkRight(canvaBoard, id);
  let pattern = [...left, ...right];

  if (pattern.length < 2) return false;

  return pattern;
};
