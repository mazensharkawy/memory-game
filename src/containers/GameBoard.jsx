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
  border: 1px solid gray;
`;
class GameBoard extends Component {
  componentDidMount = () => {
    this.props.initBoard();
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
                  color={
                    tilesVisibleState[rowIndex][columnIndex] && tile
                      ? tile
                      : undefined
                  }
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
  tilesVisibleState: gameBoard.tilesVisibleState
});
const mapDispatchToProps = { initBoard, tileClicked };

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
