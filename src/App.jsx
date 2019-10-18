import React from 'react';
import styled from 'styled-components';
import AutoComplete from './components/AutoComplete';

const GradientBackground = styled.div`
width: 100%;
height: 100%;
background-image: linear-gradient(to left top, #0c84a9d6, #a356a5);
background-repeat: no-repeat;
background-size: cover;
position: absolute;
top: 0;
z-index: -1;
margin: 0;
`;

const AppContainer = styled.main`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
margin-top: 10vh;
`;

const Title = styled.h1`
font-size: 2.5em;
font-weight: 400;
margin-top: 0em;
`;

const Content = styled.section`
font-size: 1.2em;
max-width: 500px;
text-align: center;
line-height: 1.5em;
`;

function App() {
  return (
    <>
      <GradientBackground />
      <AppContainer className="App">
        <Title>Compare your Air</Title>
        <Content>
          Compare the air quality between cities in the UK.
          <br />
          Select cities to compare using the search tool below.
        </Content>
        <AutoComplete />
      </AppContainer>
    </>
  );
}

export default App;
