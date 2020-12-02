import React, {Component} from 'react';
import '../App.css';
import Helpit from '../helpit';
import NWProductsAdd from './NWProductsAdd';
import NWProductsEdit from './NWProductsEdit';
import NWProductsDelete from './NWProductsDelete';

class NWProductsFetch extends Component {

  constructor(props){
    super(props);
    console.log("NWProductFetch: Constructor");
    this.state={
      nwRecords:[],
      recordcount: 0,
      ProdName:"",
      offset:0,
      limit:10,
      visible:"table",
      renderChildAdd:true,
      renderChildEdit:true,
      renderChildDelete:true,
      yksiTuote:[],
      ProductID:'',
      ProductID2Del:''
    };
    this.handleChildUnmountAdd=this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit=this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete=this.handleChildUnmountDelete.bind(this);
    this.handleChangeProdName=this.handleChangeProdName.bind(this);


  }

//--------------------------------------------UNMOUNT CHILD FUNCTIONS
handleChildUnmountAdd(){
  this.setState({...this.state,renderChildAdd:false,visible:"tableNew",},()=>this.componentDidMount());

}

handleChildUnmountEdit(){
  this.setState({...this.state,renderChildEdit:false,visible:"tableNew",},()=>this.NorthwindFetch());
}

handleChildUnmountDelete(){
  // this.setState({renderChildDelete:false});
  this.setState({...this.state,renderChildDelete:false,offset:0,visible:"tableNew",},()=>this.NorthwindFetch());
}


//--------------------------------------------button click functions
  handleClickTable=()=>{
    this.setState({visible:"table"});
  }

  handleClickAdd=()=>{
    this.setState({visible:"addform",renderChildAdd:true});
  }

  handleClickHelp=()=>{
    this.setState({visible:"help"});
  }
//-----------------------------------------EDIT BUTTON
  handleClickEdit=(dataObj,event)=>{
    console.log(JSON.stringify(dataObj));
    this.setState({
      yksiTuote:dataObj,
      visible:"editform",
      renderChildEdit:true
    },()=>console.log('visible: ' + this.state.visible +' yksituote: ' + JSON.stringify(this.state.yksiTuote)));
  }
  
 //-----------------------------------------DELETE FUNCTIONS
  handleClickDelete=(poistettava,event)=>{
    console.log('handleClickDelete------------postan asiakkaan-------',poistettava);
    this.setState({
      ProductID2Del:poistettava,
      visible:"deleteform",
      renderChildDelete:true

    })
  }
  
  
 
  // --------------------------------------PREVIOUS BUTTON CLICK------------------
  handleClickPrev=(event)=>{
    let offsetnumb=this.state.offset-10;
    if (offsetnumb<10){offsetnumb=0}
    this.setState({
      offset: offsetnumb,
     },()=>this.NorthwindFetch());
    
    
  }
  // --------------------------------------NEXT BUTTON CLICK------------------
  
  handleClickNext=(event)=>{
    
    
    let offsetnumb=this.state.offset+10;
    if(offsetnumb<this.state.recordcount)
    {

      this.setState({
        offset: offsetnumb,
      },()=>this.NorthwindFetch());
      

    }
    
    }
    
  
  handleChangeProdName(event){
    let arvo=event.target.value;
    this.setState({ProdName: arvo, offset:0},()=>this.NorthwindFetch());
  }

  async NorthwindFetch(){

    let jwtoken=localStorage.getItem('token');
    // let refresh_token= localStorage.getItem('refresh_token')
    // console.log('refresh token is -----------' + refresh_token)
    // tarkistetaan, onko token
    if(jwtoken!==null)
    {
      let expDate=JSON.parse(atob(jwtoken.split('.')[1]))
    
      //tarkistetaan, onko token vielä voimassa
      if(Date.now()<expDate.exp*1000)
      {
        console.log('----------- THE TOKEN HASNT EXPIRED YET------------------')
        // let uri2='https://webapiharjoituskoodi2020.azurewebsites.net/nw/products/';
        // let uri='https://webapiharjoituskoodi2020.azurewebsites.net/nw/products/';
        // let uri='https://webapiharjoituskoodi2020.azurewebsites.net/nw/orders/';
        let uri2='https://webapiharjoituskoodi2020.azurewebsites.net/nw/products/r?offset='+'&limit='+'&ProdName='+this.state.ProdName;
        let uri='https://webapiharjoituskoodi2020.azurewebsites.net/nw/products/r?offset='+this.state.offset+'&limit='+this.state.limit+'&ProdName='+this.state.ProdName;
        // // let uri='https://webapiharjoituskoodi2020.azurewebsites.net/nw/orders/';
        
        console.log("NorthwindFetch " + uri);
        await fetch(uri,{
          method:"GET",
          headers:{
            Authorization:"Bearer "+jwtoken,
              "Accept":"application/json",
              "Content-Type":"application/json"
          }
        }).then((response)=>response.json())
          .then((json)=>{
              //store the data returned from the backend to the current state
              const success=json;
              console.log('Response from server: ', success);
              if(success){
                  this.setState({nwRecords: json});
              }
          })
      
        // separate fetch to get max length so we can block from loading empty table lines
        await fetch(uri2,{
          method:"GET",
          headers:{
            Authorization:"Bearer "+jwtoken,
              "Accept":"application/json",
              "Content-Type":"application/json"
          }
        }).then((response)=>response.json())
          .then((json)=>{
              //store the data returned from the backend to the current state
              const success=json;
              console.log(`Response from server: ${success}.`);
              if(success){
                this.setState({recordcount: json.length});
              }
          })

      }
      else{
        localStorage.clear();
        console.log('-----------------TOKEN HAS EXPIRED------------------')
        this.setState({nwRecords:'',recordcount: 0})
        window.location.reload();

      }
    }
    else{
      //setting empty value to nwrecords so render doesnt collapse
      this.setState({nwRecords:'',recordcount: 0})

}

  }
  //------------------------------------------DID MOUNT
    componentDidMount(){
      console.log("NWProductFetch: component did mount")
      this.NorthwindFetch();
    }
  
  componentWillUnmount(){
    console.log("NorthwindFetch: componentWillUnmountissa")
  }


  render() {
    console.log("NorthwindFetch: renderissä")
    let viesti = "Rivejä " + this.state.recordcount

    let taulukko=[];
    let otsikko=[];
    let apucounter=0;
    if (this.state.nwRecords.length>0){
    //getting first row to get columnnames - HUOM: individual key have to be set for all table data
      var columnNames = this.state.nwRecords[0];
       for(var name in columnNames){
         if(apucounter<9){
           otsikko.push(<th key={name}>{name}</th>)
         }
        apucounter=apucounter+1;
        }
        
        otsikko.push(<th key="edit"></th>)
        otsikko.push(<th key="delete"></th>)

        var rivi=[];
      //for each object-aka row  
        for(let index=0; index<this.state.nwRecords.length; index++){
          let avainBoole=true;
          let element = this.state.nwRecords[index];
          let i =0;
      //get values
        for(var tieto in element){
        //catching id for key
          if (avainBoole)
          {
            var avain=element[tieto];
            avainBoole=false;
          }
        //building row by pushing value to td fields  
        if(i<9)
          {
            rivi.push(<td key={avain + i.toString()} className="tData">{element[tieto]}</td>)
          }
            i++;
          }
          rivi.push(<td className="thBtn" key={"edit" + tieto[0].toString()}><button className="editBtn" onClick={this.handleClickEdit.bind(this,element)}>Muokkaa</button></td>)
          rivi.push(<td key={"delete" + tieto[0].toString()}><button className="deleteBtn" onClick={this.handleClickDelete.bind(this,element.productId)}>Poista</button></td>)

          //pushing row to table
           taulukko.push(<tr key={avain} className="nwBody">{rivi}</tr>)
           rivi=[];
        } 
        
    }
    else {
      viesti="Haetaan tietoja northwind Api:sta..."
    }
//-----------------------------------------------------------TUOTE TAULUKKO
   if (this.state.nwRecords!==''){
    if(this.state.visible==="table"||this.state.visible==="tableNew"){
      return (
     
       <div >
      <h1 className="tuotteet">Tuotteet</h1>
         <button  className="tuotteet perusBtn"onClick={this.handleClickHelp}>Opasteet</button>
         <button  className="tuotteet perusBtn"onClick={this.handleClickAdd}>Lisää tuote</button>
         <button  className="tuotteet perusBtn"onClick={this.handleClickPrev}>Edelliset</button>
         <button  className="tuotteet perusBtn"onClick={this.handleClickNext}>Seuraavat</button>
         <input type="text" placeholder="Filter by Product name"  onChange={this.handleChangeProdName}/>
         <p>{viesti}</p>

         {/* filling the table with the data */}
       <div className="NorthwindFetch">
         <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
         </div>
       </div>
     );
   }
   //-----------------------------------------------ADD FORM--------------
   else if(this.state.visible==="addform")
     {
       return(
        <div className="box1">
          <h1 className="tuotteet">Uuden tuotteen lisäys</h1>
         <div>
           <button  className="tuotteet perusBtn"onClick={this.handleClickHelp}>Opasteet</button>
           <button  className="tuotteet perusBtn"onClick={this.handleClickTable}>Selaa asiakkaita</button>
         </div>  
         <div className="NorthwindFetch">
          <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
          </div>
         {this.state.renderChildAdd ? <NWProductsAdd unmountMe={this.handleChildUnmountAdd}/>:null}
         </div>
       );}
 //----------------------------------------------------------EDIT----------------------------------------
   else if(this.state.visible==="editform")
   {
     return(
       <div>
       <div >
       <h1 className="tuotteet">Tuotteet</h1>
          <button  className="tuotteet perusBtn"onClick={this.handleClickHelp}>Opasteet</button>
          <button  className="tuotteet perusBtn"onClick={this.handleClickAdd}>Lisää tuote</button>
          <button  className="tuotteet perusBtn"onClick={this.handleClickPrev}>Edelliset</button>
          <button  className="tuotteet perusBtn"onClick={this.handleClickNext}>Seuraavat</button>
          {/* filling the table with the data */}
        <div className="NorthwindFetch">
          <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
          </div>
          <p>{viesti}</p>
          {this.state.renderChildEdit ? <NWProductsEdit tuoteObj={this.state.yksiTuote} unmountMe={this.handleChildUnmountEdit}/>:null}         </div>
       </div>
     );}
       //----------------------------------------------------------DELETE----------------------------------------
   else if(this.state.visible==="deleteform")
   {
     return(
       <div>
       <div >
       <h1 className="tuotteet">Tuotteet</h1>
          <button  className="tuotteet perusBtn"onClick={this.handleClickHelp}>Opasteet</button>
          <button  className="tuotteet perusBtn"onClick={this.handleClickAdd}>Lisää tuote</button>
          <button  className="tuotteet perusBtn"onClick={this.handleClickPrev}>Edelliset</button>
          <button  className="tuotteet perusBtn"onClick={this.handleClickNext}>Seuraavat</button>
          {/* filling the table with the data */}
        <div className="NorthwindFetch">
          <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
          </div>
          <p>{viesti}</p>
        {this.state.renderChildDelete ? <NWProductsDelete ProductID={this.state.ProductID2Del} unmountMe={this.handleChildUnmountDelete}/>:null}
        </div>
       </div>
  
     );}
 //----------------------------------------------------------HELP----------------------------------------
   else if(this.state.visible==="help")
     {
       return(
         <div className="box1">
           <h1 className="tuotteet">Sovelluksen opasteet</h1>
           <button  className="tuotteet perusBtn"onClick={this.handleClickAdd}>Lisää tuote</button>
           <button  className="tuotteet perusBtn"onClick={this.handleClickTable}>Selaa asiakkaita</button>
           <Helpit moduli="NWProductFetch"/>
        </div>  
       
       );
     }
   else{
     return(
       <div className="box1">
        <h1 className="tuotteet">Sovellusvirhe - lataa sivu uudelleen!</h1>
       </div>  
       );
   }
  } 
     else{return(
      <div className="box1">
       <h1 className="tuotteet">Kirjaudu sisään jos haluat nähdä tietoja!</h1>
      </div>  
      );}
   
  }
}
export default NWProductsFetch;
