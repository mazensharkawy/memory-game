import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { initBoard, tileClicked } from "../actions";
import {
  MOBILE_BREAK_POINT,
  TABLET_CONDITION,
  LARGE_SCREEN_BREAK_POINT
} from "../config.js";

const Board = styled.div`
  margin: 0 auto;
  width: fit-content;
`;
const Row = styled.div`
  display: flex;
  width: fit-content;
`;
const Tile = styled.div`
  width: ${({ size }) => 40.0 / size}vw;
  height: ${({ size }) => 40.0 / size}vw;
  background-color: ${({ color }) => (color ? color : "white")};
  transition: background-color 0.5s ease-out;
  border: 1px solid gray;
  cursor: pointer;
  @media only screen and (max-width: ${MOBILE_BREAK_POINT}) {
    width: ${({ size }) => 90.0 / size}vw;
    height: ${({ size }) => 90.0 / size}vw;
  }
  @media only screen and ${TABLET_CONDITION} {
    width: ${({ size }) => 70.0 / size}vw;
    height: ${({ size }) => 70.0 / size}vw;
  }
  @media only screen and (min-width: ${LARGE_SCREEN_BREAK_POINT}) {
    width: ${({ size }) => 760.0 / size}px;
    height: ${({ size }) => 760.0 / size}px;
  }
`;
class GameBoard extends Component {
  componentDidMount = () => {
    this.props.initBoard();
  };
  isTileVisible = (currentRow, currentColumn) => {
    const { tilesVisibleState, temporarilyVisible } = this.props;
    const isVisible =
      tilesVisibleState[currentRow][currentColumn] ||
      temporarilyVisible.find(
        ({ rowIndex, columnIndex }) =>
          rowIndex === currentRow && columnIndex === currentColumn
      );
    return isVisible;
  };
  render() {
    const { tilesColors, tilesVisibleState, tileClicked, size } = this.props;
    return (
      <Board>
        {tilesColors.map((row, rowIndex) => (
          <Row>
            {row.map((tile, columnIndex) => {
              return (
                <Tile
                  color={this.isTileVisible(rowIndex, columnIndex) && tile}
                  onClick={() => tileClicked(rowIndex, columnIndex)}
                  size={size}
                />
              );
            })}
          </Row>
        ))}
      </Board>
    );
  }
}
const mapStateToProps = ({ gameBoard }) => ({
  tilesColors: gameBoard.tilesColors,
  tilesVisibleState: gameBoard.tilesVisibleState,
  temporarilyVisible: gameBoard.temporarilyVisible,
  size: gameBoard.size
});
const mapDispatchToProps = { initBoard, tileClicked };

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
