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
    this.logout=this.logout.bind(this);
    this.LuoObjekti=this.LuoObjekti.bind(this);

}
componentDidMount(){
    const userFromLS= localStorage.getItem('user')
    if(userFromLS){
        this.setState({...this.state, ShowLoginForm:false,LoggedInUser:userFromLS})
    }
}

checkLoginStatus(){
    const userFromLS= localStorage.getItem('user')
    if(userFromLS){
        this.setState({...this.state, ShowLoginForm:false,LoggedInUser:userFromLS})
    }
}

logout(){
    localStorage.clear()

    this.setState({...this.state, LoggedInUser:'',ShowLoginForm:true},()=>this.checkLoginStatus())
    window.location.reload();

}

handleChangeuserName(event){
    var syöte=event.target.value;
    this.setState({...this.state, userName:syöte})
}

handleChangepassWord(event) {
    var syöte =event.target.value
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
                localStorage.setItem('token',success.token);
                this.setState({ShowLoginForm:true},()=>this.checkLoginStatus());
                //reloads page so if we log in we dont have to click the navlink again
                window.location.reload();


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
                <div className="popupDiv">
                <form className="box3pop"style={{height: '30%'}} onSubmit={this.handleSubmit}>
                <div className="labelDiv">
                <label className="labelKeys">User Name: </label>

                    <input className="labelField" type="text" placeholder="" onChange={this.handleChangeuserName}/>
                </div>
                <br/>
                <div className="labelDiv">
                <label className="labelKeys">Pass Word: </label>

                    <input  className="labelField" type="password" placeholder="" onChange={this.handleChangepassWord}/>
                </div>

                <div className="buttonsDiv">
                <button className="confirmBtn" type="submit">Kirjaudu</button>
                </div>
                </form>

                </div>
            )
        }
        else{
            return(
                <div>
                                       <button onClick={()=>this.logout()}>Kirjaudu ulos</button>
                </div>
            )
        }
    }

} 
export default Login;
