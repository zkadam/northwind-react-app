import React,{ Component } from 'react';
import '../App.css';


class NWProductDelete extends Component{
    constructor(props){
        super(props);
        this.state={tuoteObj:[],ProductID:null,ProductName:'',SupplierID:'',CategoryID:'',QuantityPerUnit:'',UnitPrice:'',UnitsInStock:'',UnitsOnOrder:'',Discontinued:true,ImageLink:'',CategoryList:[]};

        
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
        }
    }

//-------------------------------GETTING JSON BY ID
    NorthwindFetch(){
        let jwtoken = localStorage.getItem('token') // <-----------------
        if(jwtoken!==null)
        {
          let expDate=JSON.parse(atob(jwtoken.split('.')[1]))
              //tarkistetaan, onko token vielä voimassa
            if(Date.now()<expDate.exp*1000)
            {
                let uri='https://localhost:5001/nw/products/'+this.props.ProductID;
                
                console.log("NorthwindFetch " + uri);
                fetch(uri,{
                    method:"GET",
                    headers:{
                    Authorization:"Bearer "+jwtoken,
                        "Accept":"application/json",
                        "Content-Type":"application/json"
                    }
                })
                .then(response => response.json())
                .then(json =>{
                console.log(json);
                this.setState({tuoteObj: json,},()=>this.fillFields());
                
                })
                
            }else{
                localStorage.clear();
                console.log('-----------------TOKEN HAS EXPIRED------------------')
                this.setState({ProductID:''})
                window.location.reload();
            }
      }     
    }
    //------------------------------FILLIN UO DATAFIELDS FROM JSON TO SHOW WHAT WE ARE DELETING-----------------
    fillFields=(valami)=>{

        this.setState({
            ProductID:this.state.tuoteObj.productId ,
            ProductName:this.state.tuoteObj.productName,
            SupplierID:this.state.tuoteObj.supplierId,
            CategoryID:this.state.tuoteObj.categoryId,
            QuantityPerUnit:this.state.tuoteObj.quantityPerUnit,
            UnitPrice:this.state.tuoteObj.unitPrice,
            UnitsInStock:this.state.tuoteObj.unitsInStock,
            UnitsOnOrder:this.state.tuoteObj.unitsOnOrder,
            Discontinued:this.state.tuoteObj.discontinued,
            ImageLink:this.state.tuoteObj.imageLink,
       
        })
    }
 //---------------------------------DELETE----------------------------
 handlePerformDelete(){
    console.log('NwDeleteRestApista......deleteissä', this.state.ProductID2Del);
    this.NWDeleteRestApista();
  }



NWDeleteRestApista(){
    let jwtoken = localStorage.getItem('token') // <-----------------
        if(jwtoken!==null)
        {
          let expDate=JSON.parse(atob(jwtoken.split('.')[1]))
              //tarkistetaan, onko token vielä voimassa
            if(Date.now()<expDate.exp*1000)
            {
                const apiUrl='https://localhost:5001/nw/products/'+this.props.ProductID2Del;
                console.log("NWDeleteRestApista " + apiUrl);
                fetch(apiUrl,{
                    method:"DELETE",
                    headers:{
                        Authorization: "Bearer " + jwtoken,
                        "Accept":"application/json",
                        "Content-Type":"application/json"
                    },
                    body:null
                }).then((response)=>response.json())
                    .then((json)=>{
                        const success=json;
                        // console.log('Response from server: ' +success);
                        if(success){
                        // console.log('pyyntö asiakkaan poistamiseksi tehty-------');
                        this.props.unmountMe();

                        }
                    });
                }
        }else{
            localStorage.clear();
            console.log('-----------------TOKEN HAS EXPIRED------------------')
            this.setState({ProductID:''})
            window.location.reload();
        }

}       
//--------------------------------SUBMIT
    handleSubmit(event){
        event.preventDefault();
        
    }
//-----------------------------------DID MOUNT
    componentDidMount(){
        console.log('delete MOUNTED : '+this.props.ProductID)
        this.NorthwindFetch();
    }

    async PoistaKannasta(){
        let jwtoken = localStorage.getItem('token') // <-----------------
        if(jwtoken!==null)
        {
          let expDate=JSON.parse(atob(jwtoken.split('.')[1]))
              //tarkistetaan, onko token vielä voimassa
            if(Date.now()<expDate.exp*1000)
            {
                const apiUrl= 'https://localhost:5001/nw/products/'+this.state.ProductID;
               await fetch(apiUrl,{
                    method:"DELETE",
                    headers:{
                        Authorization: "Bearer " + jwtoken,
                        "Accept":"application/json",
                        "Content-Type":"application/json"
                    },
                    body:null
                }).then((response)=>response.json())
                    .then((json)=>{
                        const success=json;
                        console.log("Response from server: "+ success +".");
                        if(success){
                            // console.log("Pyyntö asiakkaan poistamiseksi tehty-- -- -- -- --");
                            this.props.unmountMe();
                        } 
                    });
                }
            }
            else{
                localStorage.clear();
                console.log('-----------------TOKEN HAS EXPIRED------------------')
                this.setState({ProductID:''})
                window.location.reload();
            }    
    }

    render(){
        let divs=[];
        let keys=Object.keys(this.state.tuoteObj);
        let i=0;
        // pushataan kaikki key nimit ja object valuet diveihin
        for(var field in this.state.tuoteObj){
            divs.push(<div key={field} className="labelDiv labelKeys"><label>{keys[i]}:   </label><label className="labelField">{this.state.tuoteObj[field]}</label></div>);
            i++;
        }
        return (
            <div className="popupDiv" onClick={this.dismiss.bind(this)}>
            <form className="box3pop" onSubmit={this.handleSubmit}>
            <h2>Haluatko varmasti poista tuotteen?</h2><br/>
               {divs}

               <div className="buttonsDiv">
                    <button className="deleteConfBtn" type="submit">Poista tuotteen</button>
                    <button className="peruutaBtn" onClick={this.props.unmountMe}>Peruuta</button>
                </div>
            </form>
            </div>
        )
    }
    

}
export default NWProductDelete;