import logo from "./logo.svg";
import React from "react";
import GameBoard from "./containers/GameBoard";
import styled from "styled-components";
const MainContainer = styled.div`
display: flex;
flex-direction: column;
`
const Title = styled.h1`
  margin: 0 auto;
`;
function App() {
  return (
    <MainContainer>
      <Title>Cool Memory Game</Title>
      <GameBoard />
    </MainContainer>
  );
}

export default App;
