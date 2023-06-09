import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/reducers'

const enhancers = applyMiddleware(thunk)
const store = createStore(reducers, enhancers)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
      <App />
  </Provider>,
)
