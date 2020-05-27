import React, {createContext, useReducer} from 'react';

import GlobalStateReducerAddingCard from '../reducers/GlobalStateReducerAddingCard';

/* Define a context and a reducer for updating the context */
export const GlobalStateContextAddingCard = createContext();

const initialState = {
    addingCardState : false
};

const GlobalStateProviderAddingCard = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalStateReducerAddingCard, initialState);

  return (
    <GlobalStateContextAddingCard.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContextAddingCard.Provider>
  );
};

export default GlobalStateProviderAddingCard;