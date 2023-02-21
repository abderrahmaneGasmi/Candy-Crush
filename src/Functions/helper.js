export const testNeighbour = (item1, item2) => {
  let row1 = Math.floor(item1 / 18);
  let row2 = Math.floor(item2 / 18);

  if (Math.abs(item1 - item2) == 1 && row1 == row2) return true;
  if (Math.abs(row1 - row2) == 1 && Math.abs(item1 - item2) == 18) return true;
  return false;
};
export const removeBackgroudBlack = (classElements = [], id1 = 0, id2 = 1) => {
  if (classElements[id1].style.backgroundColor)
    classElements[id1].style.backgroundColor = "";
  classElements[id2].style.backgroundColor = "";
};
export const removeChildern = (classList = "canvaBoard") => {
  let classElements = document.getElementsByClassName(classList);
  while (classElements.length > 0) {
    classElements[0].remove();
  }
};
export const changeCandyUi = (id1 = 0, id2 = 1) => {
  let classElements = document.getElementsByClassName("canvaBoard");
  removeBackgroudBlack(classElements, id1, id2);
  if (!testNeighbour(id1, id2)) return false;

  let swap = classElements[id1].src;
  classElements[id1].src = classElements[id2].src;
  classElements[id2].src = swap;
  return true;
};

export const permute = (test, operations) => {
  let k = {
    name: test[operations[0].id].name,
    type: test[operations[0].id].type,
  };
  // this is to only change the src and type and let the id of case is the same
  test[operations[0].id].name = test[operations[1].id].name;
  test[operations[0].id].type = test[operations[1].id].type;
  test[operations[1].id].name = k.name;
  test[operations[1].id].type = k.type;
  return test;
};
