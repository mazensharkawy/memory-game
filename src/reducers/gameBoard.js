import * as actionTypes from "../actions/actionTypes";

const initialState = {
  size: 2,
  currentScore: 0,
  cumulativeScore: 0,
  tilesVisibleState: [],
  tilesColors: [],
  temporarilyVisible: [],
  isBoardLocked: false
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.INIT_BOARD:
      //2D array containing the State
      return { ...state, ...payload };
    case actionTypes.SET_TILES:
      const { visibleTiles, temporarilyVisible } = payload;
      return {
        ...state,
        tilesVisibleState: [...visibleTiles],
        temporarilyVisible: [...temporarilyVisible],
        isBoardLocked: false
      };
    case actionTypes.LOCK_BOARD:
      return {
        ...state,
        isBoardLocked: true
      };
    case actionTypes.INCREMENT_SCORE:
      return {
        ...state,
        currentScore: state.currentScore + 2,
        cumulativeScore: state.cumulativeScore + 2
      };
    case actionTypes.NEXT_LEVEL:
      localStorage.setItem("size", ""+state.cumulativeScore);
      return {
        ...state,
        size: state.size < 8 ? state.size * 2 : 2
      };
    default:
      return state;
  }
};
