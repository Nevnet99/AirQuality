import React from 'react';
import styled from 'styled-components';

import { Search } from 'styled-icons/icomoon/Search';


function AutoComplete() {
  const AutoCompleteContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    margin-top: 1em;
    width: 25%;
  `;

  const Input = styled.input`
    border: 2px solid lightgrey;
    border-radius: 8px;
    padding: 0.7em;
    width: 100%;
    outline: none;
    text-indent: 30px;
    font-size: 0.8em;

   ::placeholder {
     color: black;
    
   }
   ::-webkit-input-placeholder {
     color: black;
     
   }
  `;
  const InputContainer = styled.div`
    width: 100%;
  `;

  const FaIcon = styled(Search)`
    color: lightgrey;
    width: 17px;
    height: 17px;
    position: relative;
    left: 1em;
    top: 1.6em;
    
  `;

  return (
    <AutoCompleteContainer>
      <InputContainer>
        <FaIcon icon={Search} title="Search" />
        <Input placeholder="Enter city name..." />
      </InputContainer>
    </AutoCompleteContainer>
  );
}

export default AutoComplete;
