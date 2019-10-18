import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Search } from 'styled-icons/icomoon/Search';
import { useDispatch, useSelector } from 'react-redux';
import { addUserCity, getAutoCompleteData } from '../redux/actions/index';


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
    z-index: 1;

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

const AutoCompleteSection = styled.ul`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    list-style: none;
    padding: 0.65em;
    background: white;
    width: 100%;
    position: relative;
    bottom: 0.5em;
    z-index: 0;
    margin: 0%;
    color: black;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow-y: scroll;
    max-height: 4em;

    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: none;
      
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: lightgrey;
      border-radius: 20px; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: grey; 
    } 
  `;

const AutoCompleteItem = styled.li`
      margin: 0.5em 0em;
      font-weight: 100;
  `;


function AutoComplete() {
  const autoCompleteItems = useSelector((state) => state.autoCompleteCities);
  const userCity = useSelector((state) => state.userCity);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(addUserCity(e.target.value));
    dispatch(getAutoCompleteData(userCity));
  };


  return (
    <AutoCompleteContainer>
      <InputContainer>
        <FaIcon icon={Search} title="Search" />
        <Input autoComplete="off" onChange={handleInputChange} value={userCity} type="text" name="city" placeholder="Enter city name..." />

        {
         autoCompleteItems.length && userCity !== ''
           ? (
             <AutoCompleteSection>
               {
              autoCompleteItems.map((cityInfo) => (
                <AutoCompleteItem key={cityInfo.id}>
                  {cityInfo.location}
                </AutoCompleteItem>
              ))
            }
             </AutoCompleteSection>
           ) : null
        }

      </InputContainer>
    </AutoCompleteContainer>
  );
}

export default AutoComplete;
