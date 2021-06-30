import React from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Welcome from "./Welcome";
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import notFound from "./notFound"
const App = () => {
  return (
    <Router>  
      <AuthProvider>
        
          <Switch>
            <Route path="/" exact component = {Welcome}/>
            <Route path="/login" component = {Login}/>   
            <Route path="/register" component = {Register}/> 
            <Route path="/forgot-password" component = {ForgotPassword}/>
            <PrivateRoute path="/dashboard" component = {Dashboard}/>     
            <Route path="" component = {notFound}/>           
          </Switch>
  
      </AuthProvider>
    </Router>
  )
}

export default App
