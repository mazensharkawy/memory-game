import * as actionTypes from "../actions/actionTypes";
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
const initialState = {
  size: 4,
  tilesVisibleContent: [],
  tilesColors: []
};
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
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.INIT_BOARD:
      //2D array containing the State
      let tilesVisibleState = Array.apply(null, Array(state.size)).map(() =>
        Array.apply(null, Array(state.size)).map(() => false)
      );
      let tilesColors = getRandomTiles(state.size);
      return { ...state, ...payload, tilesColors, tilesVisibleState };
    case actionTypes.TILE_CLICKED:
      const { rowIndex, columnIndex } = payload;
      const visibleTiles = state.tilesVisibleState;
      visibleTiles[rowIndex][columnIndex] = !visibleTiles[rowIndex][
        columnIndex
      ];
      return { ...state, tilesVisibleState: [...visibleTiles] };

    default:
      return state;
  }
};
