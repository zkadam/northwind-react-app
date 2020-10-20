import React, {Component} from "react";
import './App.css';

class NWCustomerAdd extends Component {
    constructor(props){
        super(props);
        this.state={CustomerID:'', ContactName:'',ContactTitle:'',Address:'',Phone:'',Fax:''};
        this.handleChangeCustomerID=this.handleChangeCustomerID.bind(this);
        this.handleChangeCompanyName=this.handleChangeCompanyName.bind(this);
        this.handleChangeContactName=this.handleChangeContactName.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
   
    dismiss(){
        this.props.unmountMe();
    }
    
    handleChangeCustomerID(e){
        var syöte =e.target.value;
        this.setState({...this.state,CustomerID: syöte.toUpperCase()});
    }

    handleChangeCompanyName(e){
        var syöte=e.target.value;   
        this.setState({...this.state,CompanyName: syöte});
    }

    handleChangeContactName(e){
        var syöte=e.target.value;
        this.setState({...this.state,ContactName: syöte});
    }

    handleSubmit(event){
        alert('Lähetettiin asiakas: '+this.state.CustomerID);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan(){
        //luodaan asiakasobjekti
        const asiakas = {CustomerID:this.state.CustomerID,
                        CompanyName:this.state.CompanyName,
                        ContactName:this.state.ContactName};
        const asiakasJson=JSON.stringify(asiakas);
        
        console.log("asiakasJson: "+asiakasJson);
        const apiUrl='https://localhost:5001/nw/customer';
        fetch(apiUrl,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:asiakasJson
        }).then((response)=>response.json())
            .then((json)=>{
                //store the data returned from the backend to the current state
                const success=json;
                console.log(`Response from server: ${success}.`);
                if(success){
                    alert("Pyyntö asiakkaan tallenttamiseksi tehty");
                    this.dismiss();
                }
            })
    }

    render(){
console.log('add asiakas render-----------')
        return (
  
    <form className="box30" onSubmit={this.handleSubmit}>
       <input type="text" title="Syötä asiakastunnus" placeholder="CustomerID"  onChange={this.handleChangeCustomerID}/>
       <input type="text" placeholder="CompanyName"  onChange={this.handleChangeCompanyName}/>
       <input type="text" placeholder="ContactName"  onChange={this.handleChangeContactName}/>
        <br/>
         <button type="submit">Tallenna asiakas</button>
   </form>
  )
    }
}

export default NWCustomerAdd;
