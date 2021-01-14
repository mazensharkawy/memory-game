import * as actionTypes from "./actionTypes";

const COLORS_LIST = [
  "gray",
  "black",
  "maroon",
  "Cornsilk",
  "pink",
  "indigo",
  "fuchsia",
  "cyan",
  "teal",
  "lime",
  "olive",
  "olivedrab",
  "yellow",
  "lemonchiffon",
  "darkorange",
  "red",
  "darkred",
  "deepskyblue"
];

const TIMEOUT_MS = 500;

const getRandomColor = colorsLeft => {
  let notFound = true,
    color;
  let counter = 300;
  while (notFound) {
    const randomIndex = Math.floor(Math.random() * colorsLeft.length);
    const colorObject = colorsLeft[randomIndex];
    if (colorObject && colorObject.remaining > 0) {
      color = colorObject.color;
      colorObject.remaining = colorObject.remaining - 1;
      notFound = false;
    }
    counter--;
    if (counter < 0) return undefined;
  }
  return color;
};

const getRandomTiles = size => {
  const colorsNeeded = (size * size) / 2;
  let colorsLeft = COLORS_LIST.slice(0, colorsNeeded).map(color => ({
    color,
    remaining: 2
  }));

  let tilesColors = Array.apply(null, Array(size)).map(() =>
    Array.apply(null, Array(size)).map(() => getRandomColor(colorsLeft))
  );
  return tilesColors;
};

export const initBoard = size => {
  return (dispatch, getState) => {
    size = size || getState()?.gameBoard?.size;
    let tilesVisibleState = Array.apply(null, Array(size)).map(() =>
      Array.apply(null, Array(size)).map(() => false)
    );
    let tilesColors = getRandomTiles(size);
    dispatch(setBoard({ tilesVisibleState, tilesColors, size }));
  };
};

export const setBoard = payload => ({
  type: actionTypes.INIT_BOARD,
  payload
});
const setTilesVisibility = (visibleTiles, temporarilyVisible) => ({
  type: actionTypes.SET_TILES,
  payload: { visibleTiles, temporarilyVisible }
});
const lockBoard = () => ({
  type: actionTypes.LOCK_BOARD
});
const incrementScore = () => ({
  type: actionTypes.INCREMENT_SCORE
});

export const tileClicked = (rowIndex, columnIndex) => {
  return (dispatch, getState) => {
    const {
      tilesColors,
      temporarilyVisible,
      tilesVisibleState,
      isBoardLocked
    } = getState()?.gameBoard;
    const isAlreadyClicked =
      temporarilyVisible.length === 1 &&
      temporarilyVisible[0].columnIndex === columnIndex &&
      temporarilyVisible[0].rowIndex === rowIndex;

    if (
      isBoardLocked ||
      tilesVisibleState[rowIndex][columnIndex] ||
      isAlreadyClicked
    )
      return;

    temporarilyVisible.push({ rowIndex, columnIndex });
    dispatch(setTilesVisibility(tilesVisibleState, temporarilyVisible));

    if (temporarilyVisible.length < 2) return;

    const tile1 = temporarilyVisible[0];
    const tile2 = temporarilyVisible[1];
    if (
      tilesColors[tile1.rowIndex][tile1.columnIndex] ===
      tilesColors[tile2.rowIndex][tile2.columnIndex]
    ) {
      tilesVisibleState[tile1.rowIndex][tile1.columnIndex] = true;
      tilesVisibleState[tile2.rowIndex][tile2.columnIndex] = true;
      dispatch(setTilesVisibility(tilesVisibleState, []));
      dispatch(incrementScore());
    } else dispatch(lockBoard());
    setTimeout(
      () => dispatch(setTilesVisibility(tilesVisibleState, [])),
      TIMEOUT_MS
    );
  };
};
