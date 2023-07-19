const checkUp = (canvaBoard: HTMLDivElement[], id: number = 1) => {
  let row = Math.floor((id + 1) / 16);
  let upSimilar = [] as HTMLDivElement[];
  if (row == 0) return [];
  let candy = canvaBoard[id].firstChild as HTMLImageElement;
  let candyType = candy.src;

  let previous = id - 16;
  row--;
  while (row >= 0 && previous >= 0) {
    let candy2 = canvaBoard[previous].firstChild as HTMLImageElement;
    let candyType2 = candy2.src;
    if (candyType2 == candyType) {
      upSimilar = [canvaBoard[previous], ...upSimilar];
    } else {
      return upSimilar;
    }
    previous -= 16;
    row--;
  }
  return upSimilar;
};
const checkDown = (canvaBoard: HTMLDivElement[], id: number = 1) => {
  let row = Math.floor((id + 1) / 16);
  let downSimilar = [] as HTMLDivElement[];
  if (row == 7) return [];
  let candy = canvaBoard[id].firstChild as HTMLImageElement;
  let candyType = candy.src;
  let next = id + 16;
  row++;
  while (row <= 7 && next <= 111) {
    let candy2 = canvaBoard[next].firstChild as HTMLImageElement;
    let candyType2 = candy2.src;
    if (candyType2 == candyType) {
      downSimilar = [...downSimilar, canvaBoard[next]];
    } else {
      return downSimilar;
    }
    next += 16;
    row++;
  }
  return downSimilar;
};

const checkColumn = (canvaBoard: HTMLDivElement[], id: number = 1) => {
  let up = checkUp(canvaBoard, id);
  up.sort();
  let down = checkDown(canvaBoard, id);
  down.sort();
  if (up.length + down.length < 2) return [] as HTMLDivElement[];
  return [...up, canvaBoard[id], ...down].sort();
};

const checkLeft = (canvaBoard: HTMLDivElement[], i: number = 1) => {
  if (i % 16 == 0) return [];
  let leftSimilair = [] as HTMLDivElement[];
  let column = i - 1;

  let candy = canvaBoard[i].firstChild as HTMLImageElement;
  let candyType = candy.src;
  while (column % 16 >= 0 && column >= 0) {
    let candy2 = canvaBoard[column].firstChild as HTMLImageElement;
    let candyType2 = candy2.src;

    if (candyType2 == candyType) {
      leftSimilair = [canvaBoard[column], ...leftSimilair];
    } else {
      return leftSimilair;
    }
    column--;
  }
  return leftSimilair;
};
const checkRight = (canvaBoard: HTMLDivElement[], i: number = 1) => {
  if (i % 16 == 15) return [];
  let rightSimilair = [] as HTMLDivElement[];
  let column = i + 1;
  let candy = canvaBoard[i].firstChild as HTMLImageElement;
  let candyType = candy.src;
  while (column % 16 <= 15 && column <= 111) {
    let candy2 = canvaBoard[column].firstChild as HTMLImageElement;
    let candyType2 = candy2.src;
    if (candyType2 == candyType) {
      rightSimilair = [...rightSimilair, canvaBoard[column]];
    } else {
      return rightSimilair;
    }

    column++;

    if (column % 16 == 0) break;
  }
  return rightSimilair;
};

const checkRow = (canvaBoard: HTMLDivElement[], id: number = 1) => {
  let left = checkLeft(canvaBoard, id);
  let right = checkRight(canvaBoard, id);
  if (left.length + right.length < 2) return [] as HTMLDivElement[];
  let pattern = [...left, canvaBoard[id], ...right];

  //   if (pattern.length < 2) return false;

  return pattern;
};

export const checkpattern = (canvaBoard: HTMLDivElement[], id: number = 1) => {
  let row = checkRow(canvaBoard, id);
  // console.log(id);

  let column = checkColumn(canvaBoard, id);
  console.log(row, column);
  if (row.length == 0 && column.length == 0)
    return { type: "none", data: [] as HTMLDivElement[] };
  if (row.length == 0) return { type: "column", data: column };
  if (column.length == 0) return { type: "row", data: row };
  return { type: "both", data: [...row, ...column] };

  // let pattern = [...row, ...column];
  // return pattern;
};

export const fetchnewcandies = (number: number) => {
  let candies = [] as HTMLDivElement[];
  for (let i = 0; i < number; i++) {
    // let div = document.createElement("div");
    // div.className = "box clickablelink";
    const cand = [
      "./blue candy.png",
      "./green candy.png",
      "./red candy.png",
      "./purple candy.png",
    ];

    let candy = document.createElement("img");
    candy.src = cand[Math.floor(Math.random() * cand.length)];
    candy.className = "candy";
    candies.push(candy);
    // candies.push(candy);
  }

  return candies;
};
export const getimages = (canvaBoard: HTMLDivElement[]) => {
  let images = [] as string[];
  console.log(canvaBoard);
  canvaBoard.forEach((div) => {
    let candy = div.firstChild as HTMLImageElement;
    images.push(candy.src);
  });
  return images;
};
export function shuffleArray(casenumber: number) {
  var boxes = Array.from({ length: casenumber }, (_, index) => index + 1);
  for (var i = boxes.length; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [boxes[i], boxes[j]] = [boxes[j], boxes[i]];
  }
  return boxes;
}
