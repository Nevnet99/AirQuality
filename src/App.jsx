import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Bounce from 'react-reveal/Bounce';
import AutoComplete from './components/AutoComplete';
import CardList from './components/CardList';
import { clearErrors } from './redux/actions';

const GradientBackground = styled.div`
width: 100%;
height: 100%;
min-height: 100vh;
background-image: linear-gradient(to left top, #0c84a9d6, #a356a5);
background-repeat: no-repeat;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
position: relative;
top: 0;
margin: 0;

`;

const AppContainer = styled.main`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
width: 100%;
height: 100%;
`;

const Title = styled.h1`
font-size: 2.5em;
font-weight: 400;
margin-top: 2em;
`;

const Content = styled.section`
font-size: 1.2em;
max-width: 500px;
text-align: center;
line-height: 1.5em;
`;

const ErrorContainer = styled.div`
* {
  position: fixed;
  top: 0em;
  left: 3em;
  width: 45%;
}
`;

const ErrorMessage = styled.p`
 background: #e22b2bbd;
  color: white;
  border-radius: 4px;
  padding: 1em;
`;

function App() {
  const errors = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const handleErrorTimeOut = () => {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  };

  useEffect(() => {
    if (errors.length) {
      handleErrorTimeOut();
    }
  });

  return (
    <GradientBackground>
      <AppContainer className="App">
        <ErrorContainer>
          {
            errors.map((error) => <Bounce><ErrorMessage>{error}</ErrorMessage></Bounce>)
          }
        </ErrorContainer>
        <Title>Compare your Air</Title>
        <Content>
          Compare the air quality between cities in the UK.
          <br />
          Select cities to compare using the search tool below.
        </Content>
        <AutoComplete />
        <CardList />
      </AppContainer>
    </GradientBackground>
  );
}

export default App;
