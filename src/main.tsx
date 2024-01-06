import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './index.css'

import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <Auth0Provider
      domain="gchat.au.auth0.com"
      clientId="1itSl1H2QlFiWHdWOaEzHLUiCzVlySRq"
      authorizationParams={{
        redirect_uri: window.location.href,
        audience: 'https://set-gorilla-83.hasura.app/v1/graphql'
      }}
    >
      <App />
    </Auth0Provider>

  </React.StrictMode>
)
