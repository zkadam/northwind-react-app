import React,{ Component } from 'react';
import './App.css';


class NWCustomerDelete extends Component{
    constructor(props){
        super(props);
        this.state={asiakasObj:[],CustomerID:'',CompanyName:'',ContactName:'',ContactTitle:'',Address:'',PostalCode:'',City:'',Country:'',Phone:'',Fax:''};

        
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    dismiss(){
        this.props.unmountMe();
    }

//--------------------------------SUBMIT
    handleSubmit(event){
        event.preventDefault();
        this.PoistaKannasta();
    }
//-----------------------------------DID MOUNT
    componentDidMount(){
        console.log('delete MOUNTED : '+this.props.asiakasObj.customerId)
        this.setState({
            CustomerID:this.props.asiakasObj.customerId ,
            CompanyName:this.props.asiakasObj.companyName,
            ContactName:this.props.asiakasObj.contactName,
            ContactTitle:this.props.asiakasObj.contactTitle,
            Address:this.props.asiakasObj.address,
            PostalCode:this.props.asiakasObj.postalCode,
            City:this.props.asiakasObj.city,
            Country:this.props.asiakasObj.country,
            Phone:this.props.asiakasObj.phone,
            Fax:this.props.asiakasObj.fax,
       
        })
    }

    PoistaKannasta(){

        const asiakas={CustomerID:this.state.CustomerID,
                        CompanyName:this.state.CompanyName,
                        ContactName:this.state.ContactName,
                        ContactTitle:this.state.ContactTitle,
                        Address:this.state.Address,
                        PostalCode:this.state.PostalCode,
                        City:this.state.City,
                        Country:this.state.Country,
                        Phone:this.state.Phone,
                        Fax:this.state.Fax
                    }
        const asiakasJson=JSON.stringify(asiakas);

        const apiUrl= 'https://localhost:5001/nw/customer/'+this.state.CustomerID;
        fetch(apiUrl,{
            method:"DELETE",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:null
        }).then((response)=>response.json())
            .then((json)=>{
                const success=json;
                console.log("Response from server: "+ success +".");
                if(success){
                    console.log("Pyyntö asiakkaan päivittämiseksi tehty-- -- -- -- --");
                    this.dismiss();
                } 
            });
    }

    render(){
        return (
            <form className="box3" onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.CustomerID||""} placeholder="Customer Id" onChange={this.handleChangeCustomerID}/>
                <input type="text" value={this.state.CompanyName||""} placeholder="Company Name" onChange={this.handleChangeCompanyName}/>
                <input type="text" value={this.state.ContactName||""} placeholder="Contact Name" onChange={this.handleChangeContactName}/>
                <input type="text" value={this.state.ContactTitle||""} placeholder="Contact Title" onChange={this.handleChangeContactTitle}/>
                <input type="text" value={this.state.Address||""} placeholder="Address" onChange={this.handleChangeAddress}/>
                <input type="text" value={this.state.PostalCode||""} placeholder="PostalCode" onChange={this.handleChangePostalCode}/>
                <input type="text" value={this.state.City||""} placeholder="City" onChange={this.handleChangeCity}/>
                <input type="text" value={this.state.Country||""} placeholder="Country" onChange={this.handleChangeCountry}/>
                <input type="text" value={this.state.Phone||""} placeholder="Phone" onChange={this.handleChangePhone}/>
                <input type="text" value={this.state.Fax||""} placeholder="Fax" onChange={this.handleChangeFax}/>
                <br/>
                <button type="submit">Poista asiakkaan</button>
            </form>
        )
    }
    

}
export default NWCustomerDelete;