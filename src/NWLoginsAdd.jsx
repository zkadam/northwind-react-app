import React, {Component} from "react";
import './App.css';

class NWLoginsAdd extends Component {
    constructor(props){
        super(props);
        this.state={firstname:'',lastname:'',email:'',userName:'',passWord:'',accesslevelId:null};

        // this.handleChangeloginId=this.handleChangeLoginId.bind(this);
        this.handleChangeFirstname=this.handleChangeFirstname.bind(this);
        this.handleChangeLastname=this.handleChangeLastname.bind(this);
        this.handleChangeEmail=this.handleChangeEmail.bind(this);
        this.handleChangeUserName=this.handleChangeUserName.bind(this);
        this.handleChangePassword=this.handleChangePassword.bind(this);
        this.handleChangeAccessLevelId=this.handleChangeAccessLevelId.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
   
    dismiss(){
        this.props.unmountMe();
    }
    
    // handleChangeLoginId(e){
    //     var syöte =e.target.value;
    //     this.setState({...this.state,loginId: syöte.toUpperCase()});
    // }

    handleChangeFirstname(e){
        var syöte=e.target.value;   
        this.setState({...this.state,firstname: syöte});
    }

    handleChangeLastname(e){
        var syöte=e.target.value;
        this.setState({...this.state,lastname: syöte});
    }
    handleChangeEmail(e){
        var syöte=e.target.value;
        this.setState({...this.state,email: syöte});
    }
    handleChangeUserName(e){
        var syöte=e.target.value;
        this.setState({...this.state,userName: syöte});
    }
    handleChangePassword(e){
        var syöte=e.target.value;
        this.setState({...this.state,passWord: syöte});
    }
    handleChangeAccessLevelId(e){
        var syöte=e.target.value;
        this.setState({...this.state,accesslevelId: parseInt(syöte)});
    }
    handleSubmit(event){
        alert('Lähetettiin uusi login: '+this.state.loginId);
        event.preventDefault();
        this.InsertoiKantaan();
    }

    InsertoiKantaan(){
        //luodaan kayttaja objekti
        const kayttaja = {loginId:this.state.loginId,
                        firstname:this.state.firstname,
                        lastname:this.state.lastname,
                        email:this.state.email,
                        userName:this.state.userName,
                        passWord:this.state.passWord,
                        accesslevelId:this.state.accesslevelId
                    };
        const kayttajaJson=JSON.stringify(kayttaja);
        
        console.log("kayttajaJson: "+kayttajaJson);
        const apiUrl='https://localhost:5001/nw/logins';
        fetch(apiUrl,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:kayttajaJson
        }).then((response)=>response.json())
            .then((json)=>{
                //store the data returned from the backend to the current state
                const success=json;
                console.log(`Response from server: ${success}.`);
                if(success){
                    alert("Pyyntö käyttäjän tallenttamiseksi tehty");
                    this.dismiss();
                }
            })
    }

    render(){
console.log('add käyttäjä render-----------')
        return (
  
    <form className="box30" onSubmit={this.handleSubmit}>
       <input type="text" placeholder="firstname"  onChange={this.handleChangeFirstname}/>
       <input type="text" placeholder="lastname"  onChange={this.handleChangeLastname}/>
       <input type="text" placeholder="e-mail"  onChange={this.handleChangeEmail}/>
       <input type="text" placeholder="user name"  onChange={this.handleChangeUserName}/>
       <input type="text" placeholder="password"  onChange={this.handleChangePassword}/>
       <input type="number" placeholder="acceslevel id"  onChange={this.handleChangeAccessLevelId}/>
        <br/>
         <button type="submit">Tallenna käyttäjä</button>
   </form>
  )
    }
}

export default NWLoginsAdd;
