import React, {Component} from 'react';
import '../App.css';
import Helpit from '../helpit';
import NWCustomerAdd from './NWCustomerAdd';
import NWCustomerEdit from './NWCustomerEdit';
import NWCustomerDelete from './NWCustomerDelete';

class NWCustomerFetch extends Component {

  constructor(props){
    super(props);
    console.log("NWCustomerFetch: Constructor");
    this.state={
      nwRecords:[],
      recordcount: 0,
      country:"",
      offset:0,
      limit:10,
      visible:"table",
      renderChildAdd:true,
      renderChildEdit:true,
      renderChildDelete:true,
      yksiAsiakas:[],
      CustomerID:'',
      CustomerID2Del:''
    };
    this.handleChildUnmountAdd=this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit=this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete=this.handleChildUnmountDelete.bind(this);
    this.handleChangeCountry=this.handleChangeCountry.bind(this);


  }

//--------------------------------------------UNMOUNT CHILD FUNCTIONS
handleChildUnmountAdd(){
  this.setState({renderChildAdd:false,visible:"table",},()=>this.NorthwindFetch());

}

handleChildUnmountEdit(){
  this.setState({renderChildEdit:false,visible:"table",},()=>this.NorthwindFetch());
}

handleChildUnmountDelete(){
  // this.setState({renderChildDelete:false});
  this.setState({renderChildDelete:false,visible:"table",},()=>this.NorthwindFetch());
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
    console.log(dataObj);
    this.setState({
      yksiAsiakas:dataObj,
      visible:"editform",
      renderChildEdit:true
    },()=>console.log('visible: ' + this.state.visible +' yksiasiakas: ' + JSON.stringify(this.state.yksiAsiakas)));
  }
  
 //-----------------------------------------DELETE FUNCTIONS
  handleClickDelete=(poistettava,event)=>{
    console.log('handleClickDelete------------postan asiakkaan-------',poistettava);
    this.setState({
      CustomerID2Del:poistettava,
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
    if (offsetnumb>this.state.recordcount)
    {while(offsetnumb>=this.state.recordcount)
      {offsetnumb=offsetnumb-10}
    }
    
    this.setState({
      offset: offsetnumb,
    },()=>this.NorthwindFetch());
    
  }
  
  handleChangeCountry(event){
    let arvo=event.target.value;
    this.setState({country: arvo},this.NorthwindFetch);
  }

  NorthwindFetch(){

let jwtoken=localStorage.getItem('token');
if(jwtoken!==null)
{
  let uri2='https://localhost:5001/nw/customer/r?offset='+'&limit='+'&country='+this.state.country;
  let uri='https://localhost:5001/nw/customer/r?offset='+this.state.offset+'&limit='+this.state.limit+'&country='+this.state.country;
  // let uri='https://localhost:5001/nw/orders/';
  
  console.log("NorthwindFetch " + uri);
  fetch(uri,{
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
            alert("Pyyntö asiakkaan tallenttamiseksi tehty");
        }
    })
  .then(response => response.json())
  .then(json =>{
    console.log(json);
    this.setState({nwRecords: json});
    
  });
  // separate fetch to get max length so we can block from loading empty table lines
  fetch(uri2)
  .then(response => response.json())
  .then(json =>{
    // console.log(json);
    this.setState({recordcount: json.length});
    
  });


}
else{
  //setting empty value to nwrecords so render doesnt collapse
  this.setState({nwRecords:'',recordcount: 0})

}

  }
  //------------------------------------------DID MOUNT
    componentDidMount(){
      console.log("NWCustomerFetch: component did mount")
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
          rivi.push(<td key={"delete" + tieto[0].toString()}><button className="deleteBtn" onClick={this.handleClickDelete.bind(this,element.customerId)}>Poista</button></td>)

          //pushing row to table
           taulukko.push(<tr key={avain} className="nwBody">{rivi}</tr>)
           rivi=[];
        } 
        
    }
    else {
      viesti="Haetaan tietoja northwind Api:sta..."
    }
//-----------------------------------------------------------ASIAKAS TAULUKKO
   if (this.state.nwRecords!==''){
    if(this.state.visible==="table"){
      return (
     
       <div >
      <h1>Asiakkaat</h1>
         <button onClick={this.handleClickHelp}>Opasteet</button>
         <button onClick={this.handleClickAdd}>Lisää asiakas</button>
         <button onClick={this.handleClickPrev}>Edelliset</button>
         <button onClick={this.handleClickNext}>Seuraavat</button>
         <input type="text" placeholder="Filter by country"  onChange={this.handleChangeCountry}/>
         <p>{viesti}</p>

         {/* filling the table with the data */}
       <div className="NorthwindFetch">
         <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
         </div>
       </div>
     );
   }
   else if(this.state.visible==="addform")
     {
       return(
        <div className="box1">
          <h1>Uuden asiakkaan lisäys</h1>
         <div>
           <button onClick={this.handleClickHelp}>Opasteet</button>
           <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
         </div>  
         {this.state.renderChildAdd ? <NWCustomerAdd unmountMe={this.handleChildUnmountAdd}/>:null}
         </div>
       );}
 //----------------------------------------------------------EDIT----------------------------------------
   else if(this.state.visible==="editform")
   {
     return(
       <div>
       <div >
       <h1>Asiakkaat</h1>
          <button onClick={this.handleClickHelp}>Opasteet</button>
          <button onClick={this.handleClickAdd}>Lisää asiakas</button>
          <button onClick={this.handleClickPrev}>Edelliset</button>
          <button onClick={this.handleClickNext}>Seuraavat</button>
          {/* filling the table with the data */}
        <div className="NorthwindFetch">
          <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
          </div>
          <p>{viesti}</p>
          {this.state.renderChildEdit ? <NWCustomerEdit asiakasObj={this.state.yksiAsiakas} unmountMe={this.handleChildUnmountEdit}/>:null}         </div>
       </div>
     );}
       //----------------------------------------------------------DELETE----------------------------------------
   else if(this.state.visible==="deleteform")
   {
     return(
       <div>
       <div >
       <h1>Asiakkaat</h1>
          <button onClick={this.handleClickHelp}>Opasteet</button>
          <button onClick={this.handleClickAdd}>Lisää asiakas</button>
          <button onClick={this.handleClickPrev}>Edelliset</button>
          <button onClick={this.handleClickNext}>Seuraavat</button>
          {/* filling the table with the data */}
        <div className="NorthwindFetch">
          <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
          </div>
          <p>{viesti}</p>
        {this.state.renderChildDelete ? <NWCustomerDelete CustomerID={this.state.CustomerID2Del} unmountMe={this.handleChildUnmountDelete}/>:null}
        </div>
       </div>
  
     );}
 //----------------------------------------------------------HELP----------------------------------------
   else if(this.state.visible==="help")
     {
       return(
         <div className="box1">
           <h1>Sovelluksen opasteet</h1>
           <button onClick={this.handleClickAdd}>Lisää asiakas</button>
           <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
           <Helpit moduli="NWCustomerFetch"/>
        </div>  
       
       );
     }
   else{
     return(
       <div className="box1">
        <h1>Sovellusvirhe - lataa sivu uudelleen!</h1>
       </div>  
       );
   }
  } 
     else{return(
      <div className="box1">
       <h1>Kirjaudu sisään jos haluat nähdä tietoja!</h1>
      </div>  
      );}
   
  }
}
export default NWCustomerFetch;
