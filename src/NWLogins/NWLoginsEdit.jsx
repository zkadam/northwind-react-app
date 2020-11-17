import React,{ Component } from 'react';
import '../App.css';


class NWLoginsEdit extends Component{
    constructor(props){
        super(props);
        this.state={loginObj:[],loginId:'',firstname:'',lastname:'',email:'',userName:'',passWord:'',AccesslevelId:""};

        this.handleChangeloginId=this.handleChangeloginId.bind(this);
        this.handleChangefirstname=this.handleChangefirstname.bind(this);
        this.handleChangelastname=this.handleChangelastname.bind(this);
        this.handleChangeemail=this.handleChangeemail.bind(this);
        this.handleChangeuserName=this.handleChangeuserName.bind(this);
        this.handleChangepassWord=this.handleChangepassWord.bind(this);
        this.handleChangeAccesslevelId=this.handleChangeAccesslevelId.bind(this);
       
      this.handleSubmit = this.handleSubmit.bind(this);
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
            this.props.unmountMe();
        }
    }
//----------------------------------------TEXTFIELD CHANGES
    handleChangeloginId(event){
        var syöte=event.target.value;
        this.setState({...this.state,loginId: syöte});
    }
    handleChangefirstname(event){
        var syöte=event.target.value;
        this.setState({...this.state,firstname: syöte});
    }
    handleChangelastname(event){
        var syöte=event.target.value;
        this.setState({...this.state,lastname: syöte});
    }
    handleChangeemail(event){
        var syöte=event.target.value;
        this.setState({...this.state,email: syöte});
    }
    handleChangeuserName(event){
        var syöte=event.target.value;
        this.setState({...this.state,userName: syöte});
    }
    handleChangepassWord(event){
        var syöte=event.target.value;
        this.setState({...this.state,passWord: syöte});
    }
    handleChangeAccesslevelId(event){
        var syöte=event.target.value;
        this.setState({...this.state,AccesslevelId: syöte});
    }
   
   
//--------------------------------SUBMIT
    handleSubmit(event){
        event.preventDefault();
        this.InsertoiKantaan();
    }
//-----------------------------------DID MOUNT
    componentDidMount(){
        console.log('EDIT MOUNTED : '+JSON.stringify(this.props.loginObj))
        this.setState({
            loginId:this.props.loginObj.loginId ,
            firstname:this.props.loginObj.firstname,
            lastname:this.props.loginObj.lastname,
            email:this.props.loginObj.email,
            userName:this.props.loginObj.userName,
            passWord:this.props.loginObj.passWord,
            AccesslevelId:this.props.loginObj.accesslevelId||"",
           
       
        })
        console.log('Accesslevel id is :---------------------------------------- '+this.props.loginObj.AccesslevelId)
    }

    InsertoiKantaan(){

        const asiakas={loginId:this.state.loginId,
                        firstname:this.state.firstname,
                        lastname:this.state.lastname,
                        email:this.state.email,
                        userName:this.state.userName,
                        passWord:this.state.passWord,
                        AccesslevelId:parseInt(this.state.AccesslevelId)
                    }
        const asiakasJson=JSON.stringify(asiakas);

        const apiUrl= 'https://localhost:5001/nw/logins/'+this.state.loginId;
        fetch(apiUrl,{
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:asiakasJson
        }).then((response)=>response.json())
            .then((json)=>{
                const success=json;
                console.log("Response from server: "+ success +".");
                if(success){
                    console.log("Pyyntö asiakkaan päivittämiseksi tehty-- -- -- -- --");
                    // this.dismiss(true);
                } 
            });
    }

    render(){
        return (
            <div className="popupDiv" onClick={this.dismiss.bind(this)}>
            
            <form className="box3pop" onSubmit={this.handleSubmit}>
            <h2>Moukkaa asiakastiedot:</h2><br/>
                    <div className="labelDiv">
                        <label className="labelKeys">loginId: </label>
                        <input className="labelField"  disabled={true} type="text" value={this.state.loginId || ""} placeholder="loginId" onChange={this.handleChangeloginId} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">firstname: </label>
                        <input className="labelField" type="text" value={this.state.firstname || ""} placeholder="firstname" onChange={this.handleChangefirstname} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">lastname: </label>
                        <input className="labelField" type="text" value={this.state.lastname || ""} placeholder="lastname" onChange={this.handleChangelastname} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">email: </label>
                        <input className="labelField" type="text" value={this.state.email || ""} placeholder="email" onChange={this.handleChangeemail} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">userName: </label>
                        <input className="labelField" type="text" value={this.state.userName || ""} placeholder="userName" onChange={this.handleChangeuserName} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">passWord: </label>
                        <input className="labelField" type="text" value={this.state.passWord || ""} placeholder="passWord" onChange={this.handleChangepassWord} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">AccesslevelId: </label>
                        <input className="labelField" type="number" value={this.state.AccesslevelId || ""} placeholder="AccesslevelId" onChange={this.handleChangeAccesslevelId} /> </div>
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
export default NWLoginsEdit;