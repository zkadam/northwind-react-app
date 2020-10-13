import React, {Component} from 'react';
import './App.css';
class NorthwindFetch extends Component {

  constructor(props){
    super(props);
    console.log("NorthwindFetch: Constructor");
    this.state={
      nwRecords:[],
      recordcount: 0,
      start:0,
      end:10

    };
  }

  componentDidMount(){
    console.log("NorthwindFetch: component did mount")
    this.NorthwindFetch();
  }

  // --------------------------------------PREVIOUS BUTTON CLICK------------------
  handleClickPrev=(event)=>{
   let startnumb=this.state.start-10;
      if (startnumb<10){startnumb=0}
    this.setState({
      start: startnumb,
      end: startnumb+10
  },()=>this.NorthwindFetch());


  }
  // --------------------------------------NEXT BUTTON CLICK------------------

  handleClickNext=(event)=>{
   
    let startnumb=this.state.start+10;
    let endnumb=startnumb+10;
    if (endnumb>this.state.recordcount)
    {while(startnumb>=this.state.recordcount)
      {startnumb=startnumb-1; endnumb=startnumb+10}
    }

      this.setState({
          start: startnumb,
          end: startnumb+10
      },()=>this.NorthwindFetch());
      
  }


  NorthwindFetch(){
    let uri2='https://localhost:5001/nw/customer';
    // let uri='https://jsonplaceholder.typicode.com/todos?_start='+this.state.start+'&_end='+this.state.end;
    let uri='https://localhost:5001/nw/customer';

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
    //getting first row to get columnnames
      var columnNames = this.state.nwRecords[0];
      
        for(var name in columnNames){
        otsikko.push(<th>{name}</th>)

        }
   
   
    
        var rivi=[];
    for(let index=0; index<this.state.nwRecords.length; index++){
      let avainBoole=true;
      let element = this.state.nwRecords[index];
      for(var tieto in element){
        if (avainBoole)
          {
            var avain=element[tieto];
            avainBoole=false;
          }
            rivi.push(<td>{element[tieto]}</td>)
          }
          // console.log(rivi[0;0])
          console.log(JSON.stringify(avain));
           taulukko.push(<tr key={avain}>{rivi}</tr>)
           rivi=[];
        } 
        
    }
    else {
      viesti="Haetaan tietoja northwind Api:sta..."
    }

    return (
      <div className="NorthwindFetch">
        <h3>{viesti}</h3>
        <button onClick={this.handleClickPrev}>Edelliset</button>
        <button onClick={this.handleClickNext}>Seuraavat</button>

        <table id="t01"><thead><tr>{otsikko}</tr></thead><tbody>{taulukko}</tbody></table>
      </div>
    );
  }
}
export default NorthwindFetch;
