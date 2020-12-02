import React, {Component} from 'react';
import '../App.css';
class NWCustomerFetch extends Component {

  constructor(props){
    super(props);
    console.log("NWCustomerFetch: Constructor");
    this.state={
      nwRecords:[],
      recordcount: 0,
      offset:0,
      limit:10

    };
  }

  componentDidMount(){
    console.log("NWCustomerFetch: component did mount")
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
    let uri2='https://webapiharjoituskoodi2020.azurewebsites.net/nw/customer';
    // let uri='https://webapiharjoituskoodi2020.azurewebsites.net/nw/customer/r?offset='+this.state.offset+'&limit='+this.state.limit;
    let uri='https://webapiharjoituskoodi2020.azurewebsites.net/nw/customer/';

    console.log("NorthwindFetch " + uri);
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

    return (
      <div >
        <h3>{viesti}</h3>
        <button onClick={this.handleClickPrev}>Edelliset</button>
        <button onClick={this.handleClickNext}>Seuraavat</button>
{/* filling the table with the data */}
      <div className="NorthwindFetch">
        <table className={"nwTable"} id="t01"><thead><tr key={"headerKey"}>{otsikko}</tr></thead><tbody className="nwBody">{taulukko}</tbody></table>

      </div>
      </div>
    );
  }
}
export default NWCustomerFetch;
