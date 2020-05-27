import {useContext} from 'react';

import { GlobalStateContextAddingCard } from '../context/GlobalStateContextAddingCard';

const useGlobalStateAddingCard = () => {
  let [state, dispatch] = useContext(GlobalStateContextAddingCard);

  const addingCard = function whenAddingCard () {
    dispatch({ type: 'ADDING_CARD' });
  };

  const addingCardFinish = function whenAddingCardFinish() {
    dispatch({ type: 'ADDING_CARD_FINISH' });
  }

  return { addingCard, addingCardFinish, addingCardState : state.addingCardState };
}

export default useGlobalStateAddingCard;