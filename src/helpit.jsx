import React, {Component} from 'react';
import './App.css';
class Helpit extends Component {
render() {
  if(this.props.moduli==="NWCustomerFetch") {
    return (
        <div className="Helpit">
         <p>Voit hakea asiakkaita ja liätä tai muokata niiden perustietoja...</p>
        </div>
      );
  }
  
  else{
    return (
        <div className="Helpit">
         <p>Helppiä ei löydy:(</p>
        </div>
      );

  }
}
}
export default Helpit;
