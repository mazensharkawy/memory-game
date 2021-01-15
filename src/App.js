import logo from "./logo.svg";
import React from "react";
import GameBoard from "./containers/GameBoard";
import styled from "styled-components";
import { connect } from "react-redux";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  margin: 0 auto;
  width: fit-content;
  h1,
  p {
    width: fit-content;
  }
`;
const Score = styled.p`
  width: 50vw;
  margin: 0 auto;
`;
const App = ({ cumulativeScore }) => (
  <MainContainer>
    <Title>
      <h1>Cool Memory Game</h1>
      <Score>Score: {cumulativeScore}</Score>
    </Title>
    <GameBoard />
  </MainContainer>
);
const mapStateToProps = ({ gameBoard }) => ({
  cumulativeScore: gameBoard.cumulativeScore
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
