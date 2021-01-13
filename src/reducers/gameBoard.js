import * as actionTypes from "../actions/actionTypes";
const COLORS_LIST = [
  "gray",
  "black",
  "maroon",
  "white",
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
  "deepskyblue",
];
const initialState = {
  size: 4,
  tilesVisibleContent: [],
  tilesColors: [],
};
const getRandomColor = (colorsLeft, size) => {
  let notFound = true,
    color;
  while (notFound) {
    const randomIndex = Math.floor(Math.random() * size);
    const colorObject = colorsLeft[randomIndex];
    if (colorObject && colorObject.remaining > 0) {
      color = colorObject.color;
      notFound = false;
    }
  }
  return color;
};
const getRandomTiles = (size) => {
  let colorsLeft = COLORS_LIST.slice(0, size).map((color) => ({
    color,
    remaining: 2,
  }));

  let tilesColors = Array.apply(null, Array(size)).map(() =>
    Array.apply(null, Array(size)).map(() => getRandomColor(colorsLeft, size))
  );
  return tilesColors;
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.INIT_BOARD:
      //2D array containing the State
      let tilesVisibleState = Array.apply(null, Array(state.size)).map(() =>
        Array.apply(null, Array(state.size)).map(() => true)
      );
      let tilesColors = getRandomTiles(state.size);
      return { ...state, ...payload, tilesColors, tilesVisibleState };

    default:
      return state;
  }
};
