import { useAuth0 } from '@auth0/auth0-react';
import './App.css'
import Login from './views/login'
import Home from './views/home';
import { useEffect, useReducer } from 'react';
import tokenReducer from './reducers/token-reducer';
import { ApolloContext } from './apollo-client';

function App() {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const initialState = {
    token: ''
  }
  const [tokenState, dispatch] = useReducer(tokenReducer, initialState);


  useEffect(() => {

    getAccessTokenSilently().then((response) => {

      dispatch(
        {
          type: 'token_generated',
          value: response
        }
      )

    });

  }, [getAccessTokenSilently, user?.sub])


  if (isLoading) {

    return <div>Loading ...</div>;

  } else if (isAuthenticated && tokenState.token) {

    return (
      <ApolloContext token={tokenState.token}>
        <Home />
      </ApolloContext>
    )

  } else {

    return <Login />

  }

}

export default App
