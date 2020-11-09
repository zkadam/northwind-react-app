import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import NWCustomerFetch from './NWCustomers/NWCustomerFetch'
import NWLoginsFetch from './NWLoginsFetch'






class Navigaatio extends Component {
    render() {
        return (
         <Router>
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <a className="navbar-brand" href="#">Northwind React Application 2019</a>

                <ul className="navbar-nav mr-auto">
                    <li><Link to={'/NWCustomers/NWCustomerFetch'} className="nav-link">NWCustomerFetch</Link></li>
                    <li><Link to={'/NWLoginsFetch'} className="nav-link">NWLoginsFetch</Link></li>

                </ul>    
                </nav>
                <hr/>

        <Switch>
            <Route path='/NWCustomers/NWCustomerFetch' component={NWCustomerFetch}/>
            <Route path='/NWLoginsFetch' component={NWLoginsFetch}/>

        </Switch>
            </div>
        </Router>
          );
    
      }
}
    export default Navigaatio;