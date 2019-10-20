import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Search } from 'styled-icons/icomoon/Search';
import { useDispatch, useSelector } from 'react-redux';
import { addUserCity, getAutoCompleteData, selectedCity } from '../redux/actions/index';
import useDebounce from '../customHooks/useDebounce';

const AutoCompleteContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    margin-top: 1em;
    width: 100%;
  `;

const Input = styled.input`
    border: 2px solid lightgrey;
    border-radius: 8px;
    padding: 0.7em;
    width: 25%;
    outline: none;
    text-indent: 30px;
    font-size: 1em;
    z-index: 1;
    font-weight: 100;
    @media (max-width: 768px) {
      width: 80%;
    }

   ::placeholder {
     color: black;
    
   }
   ::-webkit-input-placeholder {
     color: black;
     
   }
  `;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `;

const FaIcon = styled(Search)`
    color: lightgrey;
    width: 17px;
    height: 17px;
    position: relative;
    right: 9.5em;
    top: 1.9em;
    z-index: 5;

    @media (max-width: 768px) {
      right: 8.5em;
    }
  `;

const AutoCompleteSection = styled.ul`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    list-style: none;
    background: white;
    width: 27%;
    z-index: 0;
    margin: 0 ;
    color: black;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow-y: scroll;
    max-height: 8em;
    padding: 0;
    position: relative;
    bottom: 0.3em;

    @media (max-width: 768px) {
      width: 86%;
    }

    /* width */
    ::-webkit-scrollbar {
      width: 8px;
      z-index: -1;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: none;
      z-index: -1;
      
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: lightgrey;
      border-radius: 20px; 
      height: 30%;
      z-index: -1;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: grey; 
      z-index: -1;
    } 
  `;

const AutoCompleteItem = styled.li`
      font-weight: 100;
      width: 95%;
      height: 100%;
      padding: 0.5em;
      cursor: pointer;
      :hover {
        background: lightgrey;
      }
  `;


function AutoComplete() {
  const autoCompleteItems = useSelector((state) => state.autoCompleteCities);
  const userCity = useSelector((state) => state.userCity);
  const dispatch = useDispatch();
  const debouncedUserCity = useDebounce(userCity, 200);

  const handleInputChange = (e) => {
    dispatch(addUserCity(e.target.value));
  };

  useEffect(
    () => {
      if (debouncedUserCity) {
        dispatch(getAutoCompleteData(userCity));
      }
    },
    [debouncedUserCity],
  );

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
              autoCompleteItems.map((cityName) => (
                <AutoCompleteItem onClick={() => dispatch(selectedCity(cityName))} key={cityName}>
                  {cityName}
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
