import React, {Component} from "react";
import '../App.css';

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
        this.dismiss = this.dismiss.bind(this);

    }
   
    dismiss(e,dismiss){
        console.log(e.target.className)
        //condition tarkistaa mistä popup tuli ja suljee modalin jos tuli formin ulkopuolelta
        if(e.target.className==="popupDiv")
        {
            this.props.unmountMe();
        }
        else if(e.target.className==="confirmBtn"){
          





            this.InsertoiKantaan();
            // this.props.unmountMe();
        }
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
    }

    async InsertoiKantaan() {
        let jwtoken = localStorage.getItem('token') // <-----------------
        if (jwtoken !== null) {
            let expDate = JSON.parse(atob(jwtoken.split('.')[1]))
            //tarkistetaan, onko token vielä voimassa
            if (Date.now() < expDate.exp * 1000) {
                //luodaan kayttaja objekti
                const kayttaja = {
                    loginId: this.state.loginId,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    userName: this.state.userName,
                    passWord: this.state.passWord,
                    accesslevelId: this.state.accesslevelId
                };
                const kayttajaJson = JSON.stringify(kayttaja);

                console.log("kayttajaJson: " + kayttajaJson);
                const apiUrl = 'https://localhost:5001/nw/logins';
                 await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + jwtoken,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: kayttajaJson
                }).then((response) => response.json())
                    .then((json) => {
                        //store the data returned from the backend to the current state
                        const success = json;
                        console.log(`Response from server: ${success}.`);
                        if (success) {
                            alert("Pyyntö käyttäjän tallenttamiseksi tehty");
                            // this.dismiss();
                        }
                    })
                    
                    this.props.unmountMe();
            } else {
                localStorage.clear();
                console.log('-----------------TOKEN HAS EXPIRED------------------')
                this.setState({ CustomerID: '' })
                window.location.reload();

            }
        }
    }

    render(){
console.log('add käyttäjä render-----------')
        return (
  
            <div className="popupDiv" onClick={this.dismiss.bind(this)}>
            
            <form className="box3pop" onSubmit={this.handleSubmit}>
            <h2>Moukkaa asiakastiedot:</h2><br/>
                    <div className="labelDiv">
                        <label className="labelKeys">loginId: </label>
                        <input className="labelField"  disabled={true} type="text" value={this.state.loginId || ""} placeholder="loginId" onChange={this.handleChangeloginId} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">firstname: </label>
                        <input className="labelField" type="text" value={this.state.firstname || ""} placeholder="firstname" onChange={this.handleChangeFirstname} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">lastname: </label>
                        <input className="labelField" type="text" value={this.state.lastname || ""} placeholder="lastname" onChange={this.handleChangeLastname} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">email: </label>
                        <input className="labelField" type="text" value={this.state.email || ""} placeholder="email" onChange={this.handleChangeEmail} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">userName: </label>
                        <input className="labelField" type="text" value={this.state.userName || ""} placeholder="userName" onChange={this.handleChangeUserName} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">passWord: </label>
                        <input className="labelField" type="text" value={this.state.passWord || ""} placeholder="passWord" onChange={this.handleChangePassword} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">AccesslevelId: </label>
                        <input className="labelField" type="number" value={this.state.AccesslevelId || ""} placeholder="AccesslevelId" onChange={this.handleChangeAccessLevelId} /> </div>
                <br/>
            <div className="buttonsDiv">
                <button className="confirmBtn" type="submit">Talleta muutokset</button>
                <button className="peruutaBtn" onClick={this.props.unmountMe}>Peruuta</button>

            </div>
   </form>
   </div>
  )
    }
}

export default NWLoginsAdd;
