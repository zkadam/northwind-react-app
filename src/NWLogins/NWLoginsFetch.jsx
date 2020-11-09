import React, {Component} from 'react';
import '../App.css';
import Helpit from '../helpit';
import NWLoginsAdd from './NWLoginsAdd';
class NWLoginsFetch extends Component {

  constructor(props){
    super(props);
    console.log("NWLoginsFetch: Constructor");
    this.state={
      nwRecords:[],
      recordcount: 0,
    //   offset:0,
    //   limit:10,
    sukunimi:"",
      visible:"table",
      renderChild:true
//NWLoginsAdd komponentti renderöideään jos this.state.renderChild=true
    };
    this.handleChildUnmount=this.handleChildUnmount.bind(this);
    this.handleChangeSukunimi=this.handleChangeSukunimi.bind(this);
  }

handleChildUnmount(){
  this.setState({renderChild:false});
  this.handleClickTable();//clicking table button
  this.NorthwindFetch();
}

//--------------------------------------------click functions
  handleClickTable=()=>{
    this.setState({visible:"table"});
  }

  handleClickAdd=()=>{
    this.setState({visible:"addform",renderChild:true});
  }

  handleClickHelp=()=>{
    this.setState({visible:"help"});
  }

  handleChangeSukunimi(event){
    let arvo=event.target.value;
    this.setState({sukunimi: arvo},this.NorthwindFetch);
  }
  

  componentDidMount(){
    console.log("NWLoginFetch: component did mount")
    this.NorthwindFetch();
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


  NorthwindFetch(){
    let uri2='https://localhost:5001/nw/logins/';
    let uri='https://localhost:5001/nw/logins/'+this.state.sukunimi;
    // let uri='https://localhost:5001/nw/orders/';

    console.log("NwLoginsfetch " + uri);
    fetch(uri)
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

  componentWillUnmount(){
    console.log("NorthwindFetch: componentWillUnmountissa")
  }


  render() {
    console.log("NorthwindFetch: renderissä")
    let viesti = "Rivejä " + this.state.recordcount

    let taulukko=[];
    let otsikko=[];
    if (this.state.nwRecords.length>0){
    //getting first row to get columnnames - HUOM: individual key have to be set for all table data
      var columnNames = this.state.nwRecords[0];
       for(var name in columnNames){
        otsikko.push(<th key={name}>{name}</th>)
        }

     
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
            rivi.push(<td key={avain + i.toString()} className="tData">{element[tieto]}</td>)
            i++;
          }
          
          //pushing row to table
           taulukko.push(<tr key={avain} className="nwBody">{rivi}</tr>)
           rivi=[];
        } 
        
    }
    else {
      viesti="Haetaan tietoja northwind Api:sta..."
    }

    if(this.state.visible==="table"){
       return (
      
        <div >
       <h1>Käyttäjät</h1>
          <button onClick={this.handleClickHelp}>Opasteet</button>
          <button onClick={this.handleClickAdd}>Lisää käyttäjä</button>
          <button onClick={this.handleClickPrev}>Edelliset</button>
          <button onClick={this.handleClickNext}>Seuraavat</button>
          <input type="text" placeholder="Filter by surname"  onChange={this.handleChangeSukunimi}/>
          {/* filling the table with the data */}
        <div className="NorthwindFetch">
          <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>
          </div>
          <p>{viesti}</p>
        </div>
      );
    }
    else if(this.state.visible==="addform")
      {
        return(
         <div className="box1">
           <h1>Uuden loginin lisäys</h1>
          <div>
            <button onClick={this.handleClickHelp}>Opasteet</button>
            <button onClick={this.handleClickTable}>Selaa logineja</button>
          </div>  
          {this.state.renderChild ? <NWLoginsAdd unmountMe={this.handleChildUnmount}/>:null}
          </div>
        );}
    else if(this.state.visible==="help")
      {
        return(
          <div className="box1">
            <h1>Sovelluksen opasteet</h1>
            <button onClick={this.handleClickAdd}>Lisää login</button>
            <button onClick={this.handleClickTable}>Selaa loginsit</button>
            <Helpit moduli="NWLoginsFetch"/>
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
}
export default NWLoginsFetch;
