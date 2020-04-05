import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Logon from './pages/Logon';
import Profile from './pages/Profile';
import IncidentRegister from './pages/IncidentRegister';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Logon}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/incidents/new" component={IncidentRegister}></Route>
      </Switch>
    </BrowserRouter>
  )
}
