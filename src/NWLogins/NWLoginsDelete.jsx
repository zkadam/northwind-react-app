import React,{ Component } from 'react';
import '../App.css';


class NWCustomerDelete extends Component{
    constructor(props){
        super(props);
        this.state={loginObj:[],loginId:'',firstname:'',lastname:'',email:'',userName:'',passWord:'',AccesslevelId:""};

        
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
        let jwtoken = localStorage.getItem('token') // <-----------------
        if(jwtoken!==null)
        {
          let expDate=JSON.parse(atob(jwtoken.split('.')[1]))
              //tarkistetaan, onko token vielä voimassa
            if(Date.now()<expDate.exp*1000)
            {
            let uri='https://localhost:5001/nw/logins/id/'+this.props.LoginID;
            console.log(uri);
            // let uri='https://localhost:5001/nw/orders/';
            
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
            this.setState({loginObj: json,},()=>this.fillFields());
            
            })
        }
        else{
            localStorage.clear();
            console.log('-----------------TOKEN HAS EXPIRED------------------')
            this.setState({CustomerID:''})
            window.location.reload();
            }
        }         
    }
    //------------------------------FILLIN UO DATAFIELDS FROM JSON TO SHOW WHAT WE ARE DELETING-----------------
    fillFields=(valami)=>{

        this.setState({
            loginId:this.state.loginObj.loginId ,
            firstname:this.state.loginObj.firstname,
            lastname:this.state.loginObj.lastname,
            email:this.state.loginObj.email,
            userName:this.state.loginObj.userName,
            passWord:this.state.loginObj.passWord,
            AccesslevelId:this.state.loginObj.accesslevelId||"",
       
        })
    }
 
   
//--------------------------------SUBMIT
    handleSubmit(event){
        event.preventDefault();
        this.PoistaKannasta();
    }
//-----------------------------------DID MOUNT
    componentDidMount(){
        console.log('delete MOUNTED : '+this.props.LoginID)
        this.NorthwindFetch();
    }

    PoistaKannasta(){

        let jwtoken = localStorage.getItem('token') // <-----------------
        if(jwtoken!==null)
        {
          let expDate=JSON.parse(atob(jwtoken.split('.')[1]))
              //tarkistetaan, onko token vielä voimassa
            if(Date.now()<expDate.exp*1000)
            {
                const apiUrl= 'https://localhost:5001/nw/logins/'+this.state.loginId;
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
                        console.log("Response from server: "+ success +".");
                        if(success){
                            console.log("Pyyntö asiakkaan poistamiseksi tehty-- -- -- -- --");
                            // this.dismiss();
                        } 
                    });
                }
            }else{
                localStorage.clear();
                console.log('-----------------TOKEN HAS EXPIRED------------------')
                this.setState({loginId:''})
                window.location.reload();
            }
    
    }

    render(){
        let divs=[];
        let keys=Object.keys(this.state.loginObj);
        let i=0;
        // pushataan kaikki key nimit ja object valuet diveihin
        for(var field in this.state.loginObj){
            divs.push(<div key={field} className="labelDiv labelKeys"><label>{keys[i]}:   </label><label className="labelField">{this.state.loginObj[field]}</label></div>);
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