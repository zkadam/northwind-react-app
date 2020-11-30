import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import NWCustomerFetch from './NWCustomers/NWCustomerFetch'
import NWLoginsFetch from './NWLogins/NWLoginsFetch'
import NWProductsFetch from './NWProducts/NWProductsFetch'

import Login from './Login'






class Navigaatio extends Component {
    render() {
        return (
         <Router>
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <a className="navbar-brand" href="#">Northwind App</a>

                <ul className="navbar-nav mr-auto">
                    <li><Link to={'/NWCustomers/NWCustomerFetch'} className="nav-link">NW-CustomerFetch</Link></li>
                    <li><Link to={'/NWLogins/NWLoginsFetch'} className="nav-link">NW-LoginsFetch</Link></li>
                    <li><Link to={'/NWProducts/NWProductsFetch'} className="nav-link">NW-ProductsFetch</Link></li>

                </ul>  
                <Login/>

                </nav>

        <Switch>
            <Route path='/NWCustomers/NWCustomerFetch' component={NWCustomerFetch}/>
            <Route path='/NWLogins/NWLoginsFetch' component={NWLoginsFetch}/>
            <Route path='/NWProducts/NWProductsFetch' component={NWProductsFetch}/>

        </Switch>
            </div>
        </Router>
          );
    
      }
}
    export default Navigaatio;