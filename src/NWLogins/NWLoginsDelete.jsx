import React,{ Component } from 'react';
import '../App.css';


class NWCustomerDelete extends Component{
    constructor(props){
        super(props);
        this.state={asiakasObj:[],CustomerID:'',CompanyName:'',ContactName:'',ContactTitle:'',Address:'',PostalCode:'',City:'',Country:'',Phone:'',Fax:''};

        
      this.handleSubmit = this.handleSubmit.bind(this);
      this.dismiss = this.dismiss.bind(this);

    }

    dismiss(e){
        console.log(e.target.className)
        //condition tarkistaa mistä popup tuli ja suljee modalin jos tuli formin ulkopuolelta
        if(e.target.className==="popupDiv")
        {
            this.props.unmountMe();
        }
        else if(e.target.className==="deleteConfBtn"){
            this.PoistaKannasta();
            this.props.unmountMe();
        }
    }

//-------------------------------GETTING JSON BY ID
    NorthwindFetch(){
        let uri='https://localhost:5001/nw/customer/'+this.props.CustomerID;
        // let uri='https://localhost:5001/nw/orders/';
        
        console.log("NorthwindFetch " + uri);
        fetch(uri)
        .then(response => response.json())
        .then(json =>{
          console.log(json);
          this.setState({asiakasObj: json,},()=>this.fillFields());
          
        })
        
        // separate fetch to get max length so we can block from loading empty table lines
        // fetch(uri2)
        // .then(response => response.json())
        // .then(json =>{
        //   // console.log(json);
        //   this.setState({recordcount: json.length});
          
        // });
    }
    //------------------------------FILLIN UO DATAFIELDS FROM JSON TO SHOW WHAT WE ARE DELETING-----------------
    fillFields=(valami)=>{

        this.setState({
            CustomerID:this.state.asiakasObj.customerId ,
            CompanyName:this.state.asiakasObj.companyName,
            ContactName:this.state.asiakasObj.contactName,
            ContactTitle:this.state.asiakasObj.contactTitle,
            Address:this.state.asiakasObj.address,
            PostalCode:this.state.asiakasObj.postalCode,
            City:this.state.asiakasObj.city,
            Country:this.state.asiakasObj.country,
            Phone:this.state.asiakasObj.phone,
            Fax:this.state.asiakasObj.fax,
       
        })
    }
 //---------------------------------DELETE----------------------------
 handlePerformDelete(){
    console.log('NwDeleteRestApista......deleteissä', this.state.CustomerID2Del);
    this.NWDeleteRestApista();
  }



NWDeleteRestApista(){
  let apiUrl='https://localhost:5001/nw/customer/'+this.props.CustomerID2Del;
  console.log("NWDeleteRestApista " + apiUrl);
  fetch(apiUrl, {
    method:"DELETE",
    headers:{
      "Accept":"application/json",
     "Content-Type":"application/json" 
    },
    body:null
  }).then((response)=>response.json())
      .then((json)=>{
        const success=json;
        console.log('Response from server: ' +success);
        if(success){
          console.log('pyyntö asiakkaan poistamiseksi tehty-------');
           this.dismiss();
        }
      });
}       
//--------------------------------SUBMIT
    handleSubmit(event){
        event.preventDefault();
        this.PoistaKannasta();
    }
//-----------------------------------DID MOUNT
    componentDidMount(){
        console.log('delete MOUNTED : '+this.props.CustomerID)
        this.NorthwindFetch();
    }

    PoistaKannasta(){

        
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
                    console.log("Pyyntö asiakkaan poistamiseksi tehty-- -- -- -- --");
                    // this.dismiss();
                } 
            });
    }

    render(){
        let divs=[];
        let keys=Object.keys(this.state.asiakasObj);
        let i=0;
        // pushataan kaikki key nimit ja object valuet diveihin
        for(var field in this.state.asiakasObj){
            divs.push(<div key={field} className="labelDiv labelKeys"><label>{keys[i]}:   </label><label className="labelField">{this.state.asiakasObj[field]}</label></div>);
            i++;
        }
        return (
            <div className="popupDiv" onClick={this.dismiss.bind(this)}>
            <form className="box3pop" onSubmit={this.handleSubmit}>
            <h2>Haluatko varmasti poista asiakkaan?</h2><br/>
               {divs}

               <div className="buttonsDiv">
                    <button className="deleteConfBtn" type="submit">Poista asiakkaan</button>
                    <button className="peruutaBtn" onClick={this.props.unmountMe}>Peruuta</button>
                </div>
            </form>
            </div>
        )
    }
    

}
export default NWCustomerDelete;