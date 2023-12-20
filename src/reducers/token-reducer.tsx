export interface TokenState {
    token?: string;
}

export type TokenAction = {
    type: string;
    value: string;
}

export default function tokenReducer(state: TokenState, action: TokenAction) {

    switch (action.type) {
        case 'token_generated': {
            return {
                ...state,
                token: action.value
            }
        }
        case 'get_token': {
            return state;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }

    }

}