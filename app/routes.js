import React from 'react'
import { Switch, Route } from 'react-router'

//import LoginPage from './containers/LoginPage'
//import LoggedInPage from './containers/LoggedInPage'
import Start from './components/Start'
import StartPage from './containers/StartPage'
import PhotoBooth from './components/photobooth'
import Boomerang from './components/boomerang'
import BoomerangTakePage from './containers/BoomerangTakePage'
import PhotoTakePage from './containers/PhotoTakePage'
import ProcessingPage from './containers/ProcessingPage'
import BoomerangPlayerPage from './containers/BoomerangPlayerPage'
import EmailSettingPage from './containers/EmailSettingPage'

export default (
  <div>
    <Switch>
      <Route exact path='/' component={StartPage} />
      <Route exact path='/photobooth' component={PhotoBooth} />
      <Route exact path='/photobooth/take' component={PhotoTakePage} />
      <Route exact path='/photobooth/processing' component={ProcessingPage} />
      <Route exact path='/boomerang' component={Boomerang} />
      <Route exact path="/setting/email" component={EmailSettingPage}/>	
      <Route exact path='/boomerang/take' component={BoomerangTakePage} />
      <Route exact path='/boomerang/player' component={BoomerangPlayerPage} />
    </Switch>
  </div>
)
