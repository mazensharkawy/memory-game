import * as actionTypes from "./actionTypes";

let timeout;
const TIMEOUT_MS = 500;
export const initBoard = () => ({
  type: actionTypes.INIT_BOARD
});

const setTilesVisibility = (visibleTiles, temporarilyVisible) => ({
  type: actionTypes.SET_TILES,
  payload: { visibleTiles, temporarilyVisible }
});
const lockBoard = () => ({
  type: actionTypes.LOCK_BOARD
});

export const tileClicked = (rowIndex, columnIndex) => {
  return (dispatch, getState) => {
    const {
      tilesColors,
      temporarilyVisible,
      tilesVisibleState,
      isBoardLocked
    } = getState()?.gameBoard;
    if (isBoardLocked || tilesVisibleState[rowIndex][columnIndex]) return;
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
    } else dispatch(lockBoard());
    timeout = setTimeout(
      () => dispatch(setTilesVisibility(tilesVisibleState, [])),
      TIMEOUT_MS
    );
  };
};
