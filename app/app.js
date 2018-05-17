import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { createMemoryHistory } from 'history'
import routes from './routes'
import configureStore from './store'
import Header from './components/Header'

const syncHistoryWithStore = (store, history) => {
  const { routing } = store.getState()
  if (routing && routing.location) {
    history.replace(routing.location)
  }
}

const apiHostInitialState = {
  title: 'default',
  description: 'default',
  price: 5.0,
  color: false,
  slide_show_of_previous_pictures: false,
  created_at: null,
  updated_at: null,
  static_background_image: null,
  print_logo_image: null
}

const initialState = {'apiHost': apiHostInitialState}
// const initialState = {"myuser":{},"routing":{},"api_host":{"id":7,"title":"Default"}};
const routerHistory = createMemoryHistory()
const store = configureStore(initialState, routerHistory)
console.log(store)
syncHistoryWithStore(store, routerHistory)

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>
      <div className='container'>
        <Header history={routerHistory} />
        {routes}
      </div>
    </ConnectedRouter>
  </Provider>,
  rootElement
)
