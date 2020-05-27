const GlobalStateReducer = (state, action) => {
    switch (action.type) {
        case 'CLASS_CONNECT_ACTIVE':
            return {
                classConnectButton: 'imgConnectActive'
            };
        case 'CLASS_CONNECT_DISABLE':
            return {
                classConnectButton: 'imgConnect'
            };
        case 'ADDING_CARD':
            return {
                addingCardState : true
            };
        case 'ADDING_CARD_FINISH':
            return {
                addingCardState : false
            };
        default:
        return state;
    }
};

export default GlobalStateReducer;