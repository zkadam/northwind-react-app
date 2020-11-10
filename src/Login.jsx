import React, {Component} from 'react'
import './App.css'

class Login extends Component{

constructor(props){
    super(props);
    this.state={
        UserName:'',
        PassWord:'',
        ShowLoginForm:true,
        LoggedInUser:''
    }

    this.handleChangeUserName=this.handleChangeUserName.bind(this);
    this.handleChangePassword=this.handleChangePassword.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}
componentDidMount(){
    const userFromLS= localStorage.getItem('user')
    if(userFromLS){
        this.setState({...this.state, ShowLoginForm:false,LoggedInUser:userFromLS})
    }
}

logout(){
    localStorage.clear()
    this.setState({...this.state, LoggedInUser:'',ShowLoginForm:true})
}

handleChangeUserName(event){
    var syöte=event.target.value;
    this.setState({...this.state, UserName:syöte})
}

handleChangePassword(event){
    var syöte=event.target.value;
    this.setState({...this.state, PassWord:syöte})
}

handleSubmit(event){
  event.preventDefault();
  this.LuoObjekti();
}

LuoObjekti(){
    const tunnukset={
        UserName: this.state.UserName,
        PassWord:this.state.PassWord
    }

    const tunnuksetJson=JSON.stringify(tunnukset);
        
    console.log("tunnuksetJson: "+tunnuksetJson);
    const apiUrl='https://localhost:5001/nw/authentication';
    fetch(apiUrl,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:tunnuksetJson
    }).then((response)=>response.json())
        .then((json)=>{
            //store the data returned from the backend to the current state
            const success=json;
            console.log(`Response from server: ${success}.`);
            if(success.UserName){
                console.log("Username: "+ success.UserName);
                localStorage.setItem('user',success.UserName);
                localStorage.setItem('token',success.token)
            }
            else
            {
                alert("Kirjautuminen epäonnistui.")
            }
        })
        
}

    render(){
        if(this.state.ShowLoginForm===true){
            return (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="UserName" onChange={this.handleChangeUserName}/>
                    <input type="text" placeholder="PassWord" onChange={this.handleChangePassword}/>
                <br/>
                <button type="submit">Kirjaudu</button>
                </form>
            )
        }
        else{
            return(
                <div>
                    <h3>Kirjautunut käyttäjä {this.state.LoggedInUser}</h3>
                    <button onClick={()=>this.logout()}>Kirjaudu ulos</button>
                </div>
            )
        }
    }

} 
export default Login;
