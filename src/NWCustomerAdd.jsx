import React, {Component} from "react";
import './App.css';

class NWCustomerAdd extends Component {
    render(){
console.log('add asiakas------------')
        return (
            <form  onSubmit={this.handleSubmit}>
       <input type="text" title="Syötä asiakastunnus" placeholder="CustomerID"  onChange={this.handleChangeCustomerID}/>
       <input type="text" placeholder="CompanyName"  onChange={this.handleChangeCompanyName}/>
       <input type="text" placeholder="ContactName"  onChange={this.handleChangeContactName}/>
    <br/>
    <button type="submit">Tallenna asiakas</button>

   </form>
  );
    }
}

export default NWCustomerAdd;
