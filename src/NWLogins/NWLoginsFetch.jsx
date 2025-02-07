import React, {Component} from 'react';
import '../App.css';
import Helpit from '../helpit';
import NWLoginsAdd from './NWLoginsAdd';
import NWLoginsEdit from './NWLoginsEdit';
import NWLoginsDelete from './NWLoginsDelete';

class NWLoginsFetch extends Component {

  constructor(props){
    super(props);
    console.log("NWLoginsFetch: Constructor");
    this.state={
      nwRecords:[],
      recordcount: 0,
      surname:"",
      offset:0,
      limit:10,
      visible:"table",
      renderChildAdd:true,
      renderChildEdit:true,
      renderChildDelete:true,
      yksiLogin:[],
      LoginsID:'',
      LoginsID2Del:''
    };
    this.handleChildUnmountAdd=this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit=this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete=this.handleChildUnmountDelete.bind(this);
    this.handleChangeSurname=this.handleChangeSurname.bind(this);


  }

//--------------------------------------------UNMOUNT CHILD FUNCTIONS
handleChildUnmountAdd(){
  this.setState({...this.state,renderChildAdd:false,visible:"table",},()=>this.NorthwindFetch());
  
}

handleChildUnmountEdit(){
  this.setState({...this.state,renderChildEdit:false,visible:"table",},()=>this.NorthwindFetch());
}

handleChildUnmountDelete(){
  // this.setState({renderChildDelete:false});
  this.setState({...this.state,renderChildDelete:false,visible:"table",},()=>this.NorthwindFetch());
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
      yksiLogin:dataObj,
      visible:"editform",
      renderChildEdit:true
    },()=>console.log('visible: ' + this.state.visible +' yksiLogin: ' + JSON.stringify(this.state.yksiLogin)));
  }
  
 //-----------------------------------------DELETE FUNCTIONS
  handleClickDelete=(poistettava,event)=>{
    console.log('handleClickDelete------------postan asiakkaan-------',poistettava);
    this.setState({
      LoginsID2Del:poistettava,
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
  
  handleChangeSurname(event){
    let arvo=event.target.value;
    this.setState({surname: arvo},()=>this.NorthwindFetch);
  }

 async NorthwindFetch(){
   
let jwtoken=localStorage.getItem('token');
if(jwtoken!==null)
    {
      let expDate=JSON.parse(atob(jwtoken.split('.')[1]))
    
      //tarkistetaan, onko token vielä voimassa
      if(Date.now()<expDate.exp*1000)
      {
        let uri2='https://localhost:5001/nw/Logins/'+this.state.surname;
        let uri='https://localhost:5001/nw/Logins/'+this.state.surname;
        // let uri='https://localhost:5001/nw/orders/';
        
      
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
                console.log(`Response from server: ${success}.`);
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
      console.log("NWLoginsFetch: component did mount")
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
          rivi.push(<td key={"delete" + tieto[0].toString()}><button className="deleteBtn" onClick={this.handleClickDelete.bind(this,element.loginId)}>Poista</button></td>)

          //pushing row to table
           taulukko.push(<tr key={avain} className="nwBody">{rivi}</tr>)
           rivi=[];
        } 
        
    }
    else {
      viesti="Haetaan tietoja northwind Api:sta..."
    }
//-----------------------------------------------------------Login TAULUKKO
   if (this.state.nwRecords!==''){
    if(this.state.visible==="table"){
            return (
     
       <div >
      <h1 className="kayttajat">Käyttäjät</h1>
         <button className="perusBtn kayttajat" onClick={this.handleClickHelp}>Opasteet</button>
         <button className="perusBtn kayttajat"onClick={this.handleClickAdd}>Lisää Login</button>
         {/* <button onClick={this.handleClickPrev}>Edelliset</button>
         <button onClick={this.handleClickNext}>Seuraavat</button> */}
         <input type="text" placeholder="Filter by surname"  onChange={this.handleChangeSurname}/>
         <p>{viesti}</p>

         {/* filling the table with the data */}
       <div className="NorthwindFetch">
         <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
         </div>
       </div>
     );
   }
//----------------------------------------------------ADD FORM--------------------------   
   else if(this.state.visible==="addform")
     {
       return(
        <div className="box1">
          <h1 className="kayttajat">Uuden käyttäjän lisäys</h1>
         <div>
           <button className="perusBtn kayttajat"onClick={this.handleClickHelp}>Opasteet</button>
           <button className="perusBtn kayttajat"onClick={this.handleClickTable}>Selaa asiakkaita</button>
         </div>  
         {this.state.renderChildAdd ? <NWLoginsAdd unmountMe={this.handleChildUnmountAdd}/>:null}
         </div>
       );}
 //----------------------------------------------------------EDIT----------------------------------------
   else if(this.state.visible==="editform")
   {
     return(
       <div>
       <div >
       <h1 className="kayttajat">Asiakkaat</h1>
          <button className="perusBtn kayttajat"onClick={this.handleClickHelp}>Opasteet</button>
          <button className="perusBtn kayttajat"onClick={this.handleClickAdd}>Lisää Login</button>
          {/* <button onClick={this.handleClickPrev}>Edelliset</button>
          <button onClick={this.handleClickNext}>Seuraavat</button> */}
          {/* filling the table with the data */}
        <div className="NorthwindFetch">
          <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
          </div>
          <p>{viesti}</p>
          {this.state.renderChildEdit ? <NWLoginsEdit loginObj={this.state.yksiLogin} unmountMe={this.handleChildUnmountEdit}/>:null}         </div>
       </div>
     );}
       //----------------------------------------------------------DELETE----------------------------------------
   else if(this.state.visible==="deleteform")
   {
     return(
       <div>
       <div >
       <h1 className="kayttajat">Asiakkaat</h1>
          <button className="perusBtn kayttajat"onClick={this.handleClickHelp}>Opasteet</button>
          <button className="perusBtn kayttajat"onClick={this.handleClickAdd}>Lisää login</button>
          {/* <button onClick={this.handleClickPrev}>Edelliset</button>
          <button onClick={this.handleClickNext}>Seuraavat</button> */}
          {/* filling the table with the data */}
        <div className="NorthwindFetch">
          <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
          </div>
          <p>{viesti}</p>
        {this.state.renderChildDelete ? <NWLoginsDelete LoginID={this.state.LoginsID2Del} unmountMe={this.handleChildUnmountDelete}/>:null}
        </div>
       </div>
  
     );}
 //----------------------------------------------------------HELP----------------------------------------
   else if(this.state.visible==="help")
     {
       return(
         <div className="box1">
           <h1 className="kayttajat">Sovelluksen opasteet</h1>
           <button onClick={this.handleClickAdd}>Lisää login</button>
           <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
           <Helpit moduli="NWLoginsFetch"/>
        </div>  
       
       );
     }
   else{
     return(
       <div className="box1">
        <h1 className="kayttajat">Sovellusvirhe - lataa sivu uudelleen!</h1>
       </div>  
       );
   }
  } 
     else{return(
      <div className="box1">
       <h1 className="kayttajat">Kirjaudu sisään jos haluat nähdä tietoja!</h1>
      </div>  
      );}
   
  }
}
export default NWLoginsFetch;
