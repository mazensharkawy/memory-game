import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { initBoard, tileClicked } from "../actions";
import { MOBILE_BREAK_POINT } from "../config.js";

const Board = styled.div`
  margin: 0 auto;
  width: fit-content;
`;
const Row = styled.div`
  display: flex;
  width: fit-content;
`;
const Tile = styled.div`
  height: 10vw;
  width: 10vw;
  background-color: ${({ color }) => (color ? color : "white")};
  transition: background-color 0.5s ease-out;
  border: 1px solid gray;
  cursor: pointer;
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
    const { tilesColors, tilesVisibleState, tileClicked } = this.props;
    return (
      <Board>
        {tilesColors.map((row, rowIndex) => (
          <Row>
            {row.map((tile, columnIndex) => {
              return (
                <Tile
                  color={this.isTileVisible(rowIndex, columnIndex) && tile}
                  onClick={() => tileClicked(rowIndex, columnIndex)}
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
  temporarilyVisible: gameBoard.temporarilyVisible
});
const mapDispatchToProps = { initBoard, tileClicked };

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
