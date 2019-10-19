import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import AutoComplete from './components/AutoComplete';
import CardList from './components/CardList';
import { clearErrors } from './redux/actions';

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

const ErrorContainer = styled.div`
`;

const ErrorMessage = styled.p`
 background: #e22b2bbd;
  color: white;
  border-radius: 4px;
  padding: 1em;
  position: absolute;
  top: 0em;
  left: 3em;
`;

function App() {
  const errors = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const handleErrorTimeOut = () => {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 3000);
  }

  useEffect(() => {
    if (errors.length) {
      handleErrorTimeOut();
    }
  });

  return (
    <>
      <GradientBackground />
      <AppContainer className="App">
        <ErrorContainer>
          {
              errors.map((error) => <ErrorMessage>{error}</ErrorMessage>)
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
    </>
  );
}

export default App;
