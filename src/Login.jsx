import React, {Component} from 'react'
import './App.css'
import md5 from 'md5'


class Login extends Component{

constructor(props){
    super(props);
    this.state={
        userName:'',
        passWord:'',
        ShowLoginForm:true,
        LoggedInUser:''
    }

    this.handleChangeuserName=this.handleChangeuserName.bind(this);
    this.handleChangepassWord=this.handleChangepassWord.bind(this);
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

handleChangeuserName(event){
    var syöte=event.target.value;
    this.setState({...this.state, userName:syöte})
}

handleChangepassWord(event) {
    var syöte =event.target.value
    console.log(syöte)
    //var syöte = (event.target.value)
    this.setState({ ...this.state, passWord: syöte })
}

handleSubmit(event){
  event.preventDefault();
  this.LuoObjekti();
}

LuoObjekti(){
    const tunnukset={
        userName: this.state.userName,
        passWord:this.state.passWord
    }

    const tunnuksetJson=JSON.stringify(tunnukset);
        
    console.log("tunnuksetJson: "+tunnuksetJson);
    const apiUrl='https://localhost:5001/nw/Authentication';
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
            const succesStr=JSON.stringify(json);
            console.log(`Response from server: ${succesStr}.`);
            if(success.userName!==undefined){
                console.log("userName: "+ success.userName);
                localStorage.setItem('user',success.userName);
                localStorage.setItem('token',success.token)
            }
            else
            {
                console.log("Kirjautuminen epäonnistui.")

                alert("Kirjautuminen epäonnistui.")
            }
        })
        
}

    render(){
        if(this.state.ShowLoginForm===true){
            return (
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="userName" onChange={this.handleChangeuserName}/>
                    <input type="text" placeholder="passWord" onChange={this.handleChangepassWord}/>
                <br/>
                <button type="submit">Kirjaudu</button>
                </form>
            )
        }
        else{
            return(
                <div>
                    <h4>Kirjautunut käyttäjä {this.state.LoggedInUser}</h4>
                    <button onClick={()=>this.logout()}>Kirjaudu ulos</button>
                </div>
            )
        }
    }

} 
export default Login;
