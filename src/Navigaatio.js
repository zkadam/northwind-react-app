import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import NWCustomerFetch from './NWCustomerFetch'






class Navigaatio extends Component {
    render() {
        return (
         <Router>
            <div>
                <h2>Northwind React Application 2019</h2>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto">
                    <li><Link to={'/NWCustomerFetch'} className="nav-link">NWCustomerFetch</Link></li>
                </ul>    
                </nav>
                <hr/>

        <Switch>
            <Route path='/NWCustomerFetch' component={NWCustomerFetch}/>
        </Switch>
            </div>
        </Router>
          );
    
      }
}
    export default Navigaatio;