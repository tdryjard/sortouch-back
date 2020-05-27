import {useContext} from 'react';

import { GlobalStateContext } from '../context/GlobalStateContext';

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  const connectClassActive = function changeClassButtonConnect () {
    dispatch({ type: 'CLASS_CONNECT_ACTIVE' });
  };

  const connectClassDisable = function disableConnectButton() {
    dispatch({ type: 'CLASS_CONNECT_DISABLE' });
  }

  return { connectClassActive, connectClassDisable, classConnectButton: state.classConnectButton };
}

export default useGlobalState;