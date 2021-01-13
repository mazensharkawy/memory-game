import * as actionTypes from "./actionTypes";
export const initBoard = () => ({
  type: actionTypes.INIT_BOARD
});
export const tileClicked = (rowIndex, columnIndex) => ({
  type: actionTypes.TILE_CLICKED,
  payload: { rowIndex, columnIndex }
});
