import React,{ Component } from 'react';
import '../App.css';


class NWCustomerEdit extends Component{
    constructor(props){
        super(props);
        this.state={loginObj:[],CustomerID:'',CompanyName:'',ContactName:'',ContactTitle:'',Address:'',PostalCode:'',City:'',Country:'',Phone:'',Fax:''};

        this.handleChangeCustomerID=this.handleChangeCustomerID.bind(this);
        this.handleChangeCompanyName=this.handleChangeCompanyName.bind(this);
        this.handleChangeContactName=this.handleChangeContactName.bind(this);
        this.handleChangeContactTitle=this.handleChangeContactTitle.bind(this);
        this.handleChangeAddress=this.handleChangeAddress.bind(this);
        this.handleChangePostalCode=this.handleChangePostalCode.bind(this);
        this.handleChangeCity=this.handleChangeCity.bind(this);
        this.handleChangeCountry=this.handleChangeCountry.bind(this);
        this.handleChangePhone=this.handleChangePhone.bind(this);
        this.handleChangeFax=this.handleChangeFax.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.dismiss = this.dismiss.bind(this);

    }

    dismiss(e,dismiss){
        console.log(e.target.className)
        //condition tarkistaa mistä popup tuli ja suljee modalin jos tuli formin ulkopuolelta
        if(e.target.className==="popupDiv")
        {
            this.props.unmountMe();
        }
        else if(e.target.className==="confirmBtn"){
            this.InsertoiKantaan();
            this.props.unmountMe();
        }
    }
//----------------------------------------TEXTFIELD CHANGES
    handleChangeCustomerID(event){
        var syöte=event.target.value;
        this.setState({...this.state,CustomerID: syöte});
    }
    handleChangeCompanyName(event){
        var syöte=event.target.value;
        this.setState({...this.state,CompanyName: syöte});
    }
    handleChangeContactName(event){
        var syöte=event.target.value;
        this.setState({...this.state,ContactName: syöte});
    }
    handleChangeContactTitle(event){
        var syöte=event.target.value;
        this.setState({...this.state,ContactTitle: syöte});
    }
    handleChangeAddress(event){
        var syöte=event.target.value;
        this.setState({...this.state,Address: syöte});
    }
    handleChangePostalCode(event){
        var syöte=event.target.value;
        this.setState({...this.state,PostalCode: syöte});
    }
    handleChangeCity(event){
        var syöte=event.target.value;
        this.setState({...this.state,City: syöte});
    }
    handleChangeCountry(event){
        var syöte=event.target.value;
        this.setState({...this.state,Country: syöte});
    }
    handleChangePhone(event){
        var syöte=event.target.value;
        this.setState({...this.state,Phone: syöte});
    }
    handleChangeFax(event){
        var syöte=event.target.value;
        this.setState({...this.state,Fax: syöte});
    }
//--------------------------------SUBMIT
    handleSubmit(event){
        event.preventDefault();
        this.InsertoiKantaan();
    }
//-----------------------------------DID MOUNT
    componentDidMount(){
        let jwtoken = localStorage.getItem('token') // <-----------------
        if(jwtoken!==null)
        {
            console.log('EDIT MOUNTED : '+this.props.loginObj.customerId)
            this.setState({
                CustomerID:this.props.loginObj.customerId ,
                CompanyName:this.props.loginObj.companyName,
                ContactName:this.props.loginObj.contactName,
                ContactTitle:this.props.loginObj.contactTitle,
                Address:this.props.loginObj.address,
                PostalCode:this.props.loginObj.postalCode,
                City:this.props.loginObj.city,
                Country:this.props.loginObj.country,
                Phone:this.props.loginObj.phone,
                Fax:this.props.loginObj.fax,
       
            })
        }else{
            localStorage.clear();
            console.log('-----------------TOKEN HAS EXPIRED------------------')
           
            window.location.reload();
        }
    }
    InsertoiKantaan(){
        let jwtoken = localStorage.getItem('token') // <-----------------
        if(jwtoken!==null)
        {

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
                method:"PUT",
                headers:{
                    Authorization: "Bearer " + jwtoken,
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:asiakasJson
            }).then((response)=>response.json())
                .then((json)=>{
                    const success=json;
                    console.log("Response from server: "+ success +".");
                    if(success){
                        console.log("Pyyntö asiakkaan päivittämiseksi tehty-- -- -- -- --");
                        // this.dismiss(true);
                    } 
                });
            }else{
                localStorage.clear();
                console.log('-----------------TOKEN HAS EXPIRED------------------')
                window.location.reload();

      }
    }

    render(){
        let jwtoken = localStorage.getItem('token') // <-----------------

        if(jwtoken!==null)
        {
          let expDate=JSON.parse(atob(jwtoken.split('.')[1]))
              //tarkistetaan, onko token vielä voimassa
            if(Date.now()<expDate.exp*1000)
            {
                return (
                    <div className="popupDiv" onClick={this.dismiss.bind(this)}>
                    
                    <form className="box3pop" onSubmit={this.handleSubmit}>
                    <h2>Moukkaa asiakastiedot:</h2><br/>
                            <div className="labelDiv">
                                <label className="labelKeys">CustomerID: </label>
                                <input className="labelField" type="text" value={this.state.CustomerID || ""} placeholder="Customer Id" onChange={this.handleChangeCustomerID} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">CompanyName: </label>
                                <input className="labelField" type="text" value={this.state.CompanyName || ""} placeholder="Company Name" onChange={this.handleChangeCompanyName} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">ContactName: </label>
                                <input className="labelField" type="text" value={this.state.ContactName || ""} placeholder="Contact Name" onChange={this.handleChangeContactName} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">ContactTitle: </label>
                                <input className="labelField" type="text" value={this.state.ContactTitle || ""} placeholder="Contact Title" onChange={this.handleChangeContactTitle} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">Address: </label>
                                <input className="labelField" type="text" value={this.state.Address || ""} placeholder="Address" onChange={this.handleChangeAddress} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">PostalCode: </label>
                                <input className="labelField" type="text" value={this.state.PostalCode || ""} placeholder="PostalCode" onChange={this.handleChangePostalCode} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">City: </label>
                                <input className="labelField" type="text" value={this.state.City || ""} placeholder="City" onChange={this.handleChangeCity} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">Country: </label>
                                <input className="labelField" type="text" value={this.state.Country || ""} placeholder="Country" onChange={this.handleChangeCountry} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">Phone: </label>
                                <input className="labelField" type="text" value={this.state.Phone || ""} placeholder="Phone" onChange={this.handleChangePhone} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">Fax: </label>
                                <input className="labelField" type="text" value={this.state.Fax || ""} placeholder="Fax" onChange={this.handleChangeFax} /> </div>
                        <br/>
                    <div className="buttonsDiv">
                        <button className="confirmBtn" type="submit">Talleta muutokset</button>
                        <button className="peruutaBtn" onClick={this.props.unmountMe}>Peruuta</button>

                    </div>
                    </form>
                    </div>
                )
            }
            else{
            //setting empty value to nwrecords so render doesnt collapse
            this.setState({CustomerID:''})
            window.location.reload();

        }
    }
}

}
export default NWCustomerEdit;