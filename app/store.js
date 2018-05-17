import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerMiddleware, routerReducer as routing, push } from 'react-router-redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'

import myuser from './reducers/user'

import apiHost from './reducers/apiHost'
import photo from './reducers/photo'
import boomerang from './reducers/boomerang'
import emailInfo from './reducers/email'
import { reducer as reduxFormReducer } from 'redux-form'

import userActions from './actions/user'
import apiActions from './actions/apiHost'
import photoActions from './actions/photo'
import boomerangActions from './actions/boomerang'
import emailActions from './actions/email'

export default function configureStore (initialState, routerHistory) {
  const router = routerMiddleware(routerHistory)

  const actionCreators = {
    //...userActions,
    ...userActions,
    push,
    ...apiActions,
    ...photoActions,
    ...boomerangActions,
    ...emailActions,
  }

  const reducers = {
    myuser,
    apiHost,
    photo,
    boomerang,
    reduxFormReducer,
    emailInfo
  }

  const middlewares = [ thunk, router ]

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators })
    }
    return compose
  })()

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState())
  const rootReducer = combineReducers(reducers)

  return createStore(rootReducer, initialState, enhancer)
}
