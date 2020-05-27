const GlobalStateReducerAddingCard = (state, action) => {
    switch (action.type) {
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

export default GlobalStateReducerAddingCard;