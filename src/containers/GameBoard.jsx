import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { initBoard } from "../actions";
import { MOBILE_BREAK_POINT } from "../config.js";
const Board = styled.div`
  width: 50vw;
  @media only screen and (max-width: ${MOBILE_BREAK_POINT}) {
    width: 90vw;
  }
`;
const Row = styled.div`
  display: flex;
`;
const Tile = styled.div`
  height: 10vw;
  width: 10vw;
  background-color: ${({color}) => (color ? color : "white")};
  border: 1px solid gray;
`;
class GameBoard extends Component {
  componentDidMount = () => {
    this.props.initBoard();
  };
  render() {
    const { tilesColors, tilesVisibleState } = this.props;
    return (
      <Board>
        {tilesColors.map((row, rowIndex) => (
          <Row>
            {row.map((tile, columnIndex) => {
              return (
                <Tile
                  color={tile
                    // tilesVisibleState[rowIndex][columnIndex] ? tile : undefined
                  }
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
const mapDispatchToProps = { initBoard };

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
