import React,{ Component } from 'react';
import '../App.css';


class NWCustomerEdit extends Component{
    constructor(props){
        super(props);
        this.state={asiakasObj:[],LoginId:'',Firstname:'',Lastname:'',Email:'',UserName:'',PassWord:'',AccesslevelID:''};

        this.handleChangeLoginId=this.handleChangeLoginId.bind(this);
        this.handleChangeFirstname=this.handleChangeFirstname.bind(this);
        this.handleChangeLastname=this.handleChangeLastname.bind(this);
        this.handleChangeEmail=this.handleChangeEmail.bind(this);
        this.handleChangeUserName=this.handleChangeUserName.bind(this);
        this.handleChangePassWord=this.handleChangePassWord.bind(this);
        this.handleChangeAccesslevelID=this.handleChangeAccesslevelID.bind(this);
       
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
    handleChangeLoginId(event){
        var syöte=event.target.value;
        this.setState({...this.state,LoginId: syöte});
    }
    handleChangeFirstname(event){
        var syöte=event.target.value;
        this.setState({...this.state,Firstname: syöte});
    }
    handleChangeLastname(event){
        var syöte=event.target.value;
        this.setState({...this.state,Lastname: syöte});
    }
    handleChangeEmail(event){
        var syöte=event.target.value;
        this.setState({...this.state,Email: syöte});
    }
    handleChangeUserName(event){
        var syöte=event.target.value;
        this.setState({...this.state,UserName: syöte});
    }
    handleChangePassWord(event){
        var syöte=event.target.value;
        this.setState({...this.state,PassWord: syöte});
    }
    handleChangeAccesslevelID(event){
        var syöte=event.target.value;
        this.setState({...this.state,AccesslevelID: syöte});
    }
   
   
//--------------------------------SUBMIT
    handleSubmit(event){
        event.preventDefault();
        this.InsertoiKantaan();
    }
//-----------------------------------DID MOUNT
    componentDidMount(){
        console.log('EDIT MOUNTED : '+this.props.asiakasObj.LoginId)
        this.setState({
            LoginId:this.props.asiakasObj.LoginId ,
            Firstname:this.props.asiakasObj.Firstname,
            Lastname:this.props.asiakasObj.Lastname,
            Email:this.props.asiakasObj.Email,
            UserName:this.props.asiakasObj.UserName,
            PassWord:this.props.asiakasObj.PassWord,
            AccesslevelID:this.props.asiakasObj.AccesslevelID,
           
       
        })
    }

    InsertoiKantaan(){

        const asiakas={LoginId:this.state.LoginId,
                        Firstname:this.state.Firstname,
                        Lastname:this.state.Lastname,
                        Email:this.state.Email,
                        UserName:this.state.UserName,
                        PassWord:this.state.PassWord,
                        AccesslevelID:this.state.AccesslevelID
                    }
        const asiakasJson=JSON.stringify(asiakas);

        const apiUrl= 'https://localhost:5001/nw/customer/'+this.state.LoginId;
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
                        <label className="labelKeys">LoginId: </label>
                        <input className="labelField" type="text" value={this.state.LoginId || ""} placeholder="Customer Id" onChange={this.handleChangeLoginId} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">Firstname: </label>
                        <input className="labelField" type="text" value={this.state.Firstname || ""} placeholder="Company Name" onChange={this.handleChangeFirstname} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">Lastname: </label>
                        <input className="labelField" type="text" value={this.state.Lastname || ""} placeholder="Contact Name" onChange={this.handleChangeLastname} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">Email: </label>
                        <input className="labelField" type="text" value={this.state.Email || ""} placeholder="Contact Title" onChange={this.handleChangeEmail} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">UserName: </label>
                        <input className="labelField" type="text" value={this.state.UserName || ""} placeholder="UserName" onChange={this.handleChangeUserName} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">PassWord: </label>
                        <input className="labelField" type="text" value={this.state.PassWord || ""} placeholder="PassWord" onChange={this.handleChangePassWord} /> </div>
                    <div className="labelDiv">
                        <label className="labelKeys">AccesslevelID: </label>
                        <input className="labelField" type="text" value={this.state.AccesslevelID || ""} placeholder="AccesslevelID" onChange={this.handleChangeAccesslevelID} /> </div>
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
export default NWCustomerEdit;