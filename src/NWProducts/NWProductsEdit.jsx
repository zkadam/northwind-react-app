import React,{ Component } from 'react';
import '../App.css';


class NWProductsEdit extends Component{
    constructor(props){
        super(props);
        this.state={tuoteObj:[],ProductID:null,ProductName:'',SupplierID:'',CategoryID:'',QuantityPerUnit:'',UnitPrice:'',UnitsInStock:'',UnitsOnOrder:'',Discontinued:true,ImageLink:'',CategoryList:[]};

        this.handleChangeProductID=this.handleChangeProductID.bind(this);
        this.handleChangeProductName=this.handleChangeProductName.bind(this);
        this.handleChangeSupplierID=this.handleChangeSupplierID.bind(this);
        this.handleChangeCategoryID=this.handleChangeCategoryID.bind(this);
        this.handleChangeQuantityPerUnit=this.handleChangeQuantityPerUnit.bind(this);
        this.handleChangeUnitPrice=this.handleChangeUnitPrice.bind(this);
        this.handleChangeUnitsInStock=this.handleChangeUnitsInStock.bind(this);
        this.handleChangeUnitsOnOrder=this.handleChangeUnitsOnOrder.bind(this);
        this.handleChangeDiscontinued=this.handleChangeDiscontinued.bind(this);
        this.handleChangeImageLink=this.handleChangeImageLink.bind(this);
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
           
        }
    }
//----------------------------------------TEXTFIELD CHANGES
    handleChangeProductID(event){
        var syöte=event.target.value;
        this.setState({...this.state,ProductID: syöte});
    }
    handleChangeProductName(event){
        var syöte=event.target.value;
        this.setState({...this.state,ProductName: syöte});
    }
    handleChangeSupplierID(event){
        var syöte=event.target.value;
        this.setState({...this.state,SupplierID: syöte});
    }
    handleChangeCategoryID(event){
        var syöte=event.target.value;
        this.setState({...this.state,CategoryID: syöte});
    }
    handleChangeQuantityPerUnit(event){
        var syöte=event.target.value;
        this.setState({...this.state,QuantityPerUnit: syöte});
    }
    handleChangeUnitPrice(event){
        var syöte=event.target.value;
        this.setState({...this.state,UnitPrice: syöte});
    }
    handleChangeUnitsInStock(event){
        var syöte=event.target.value;
        this.setState({...this.state,UnitsInStock: syöte});
    }
    handleChangeUnitsOnOrder(event){
        var syöte=event.target.value;
        this.setState({...this.state,UnitsOnOrder: syöte});
    }
    handleChangeDiscontinued(event){
    //   var syöte=event.target.value;
        // if(syöte){
        //     syöte=false
        // }
        // else{syöte=true}
        var syöte = event.target.checked ? true : false;

        this.setState({...this.state,Discontinued: syöte});
    }
    handleChangeImageLink(event){
        var syöte=event.target.value;
        this.setState({...this.state,ImageLink: syöte});
    }
//--------------------------------SUBMIT
    handleSubmit(event){
        event.preventDefault();
    }
//-----------------------------------DID MOUNT
      componentDidMount(){
          this.haeCategorit();
        let jwtoken = localStorage.getItem('token') // <-----------------
        if(jwtoken!==null)
        {
            console.log('EDIT MOUNTED : '+this.props.tuoteObj.discontinued)
            this.setState({
                ProductID:this.props.tuoteObj.productId ,
                ProductName:this.props.tuoteObj.productName,
                SupplierID:this.props.tuoteObj.supplierId,
                CategoryID:this.props.tuoteObj.categoryId,
                QuantityPerUnit:this.props.tuoteObj.quantityPerUnit,
                UnitPrice:this.props.tuoteObj.unitPrice,
                UnitsInStock:this.props.tuoteObj.unitsInStock,
                UnitsOnOrder:this.props.tuoteObj.unitsOnOrder,
                Discontinued:this.props.tuoteObj.discontinued,
                ImageLink:this.props.tuoteObj.imageLink,
       
            })
        }else{
            localStorage.clear();
            console.log('-----------------TOKEN HAS EXPIRED------------------')
           
            window.location.reload();
        }
    }
    async InsertoiKantaan(){
        let jwtoken = localStorage.getItem('token') // <-----------------
        if(jwtoken!==null)
        {
console.log(this.state.Discontinued)
            const tuote={productId:parseInt(this.state.ProductID),
                            productName:this.state.ProductName,
                            supplierId:parseInt(this.state.SupplierID),
                            categoryId:parseInt(this.state.CategoryID),
                            quantityPerUnit:this.state.QuantityPerUnit,
                            unitPrice:parseFloat(this.state.UnitPrice),
                            unitsInStock:parseInt(this.state.UnitsInStock),
                            unitsOnOrder:parseInt(this.state.UnitsOnOrder),
                            discontinued:this.state.Discontinued,
                            imageLink:this.state.ImageLink
                        }
            const tuoteJson=JSON.stringify(tuote);

            const apiUrl= 'https://localhost:5001/nw/products/'+this.state.ProductID;
            await fetch(apiUrl,{
                method:"PUT",
                headers:{
                    Authorization: "Bearer " + jwtoken,
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:tuoteJson
            }).then((response)=>response.json())
                .then((json)=>{
                    const success=json;
                    console.log("Response from server: "+ success +".");
                    if(success){
                        console.log("Pyyntö asiakkaan päivittämiseksi tehty-- -- -- -- --");
                        this.props.unmountMe();                    } 
                });
            }else{
                localStorage.clear();
                console.log('-----------------TOKEN HAS EXPIRED------------------')
                window.location.reload();

      }
   
    }
    async haeCategorit(){
          let catUri='https://localhost:5001/nw/categories'
          await fetch(catUri,{
            method:"GET",
            headers:{
              
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
          }).then((response)=>response.json())
            .then((json)=>{
                //store the data returned from the backend to the current state
                const success=json;
                console.log(`Response from server: ${success}.`);
                if(success){
                  this.setState({CategoryList: success},()=>console.log(this.state.CategoryList));
                }
            })
    }
    render(){
        let jwtoken = localStorage.getItem('token') // <-----------------

        if(jwtoken!==null)
        {
          let expDate=JSON.parse(atob(jwtoken.split('.')[1]))
              //tarkistetaan, onko token vielä voimassa
            if(Date.now()<expDate.exp*1000)
            {
                const catList=[];
console.log(this.state.CategoryList)
                // for(var tieto in this.state.CategoryList.length){

                //     catList.push(<option value={tieto[1]}>{tieto[2]}</option>)

                // }
                for(var i=0; i<this.state.CategoryList.length;i++){
                        let kategoria=this.state.CategoryList[i]
                       catList.push(<option key={"kateg"+i} value={kategoria.categoryId}>{kategoria.categoryName}</option>)
                }
                return (
                    <div className="popupDiv" onClick={this.dismiss.bind(this)}>
                    
                    
                    <form className="box3pop" onSubmit={this.handleSubmit}>
                    <h2>Moukkaa tuotetiedot:</h2><br/>
                            <div className="labelDiv">
                                <label className="labelKeys">ProductID: </label>
                                <input className="labelField" type="number" value={this.state.ProductID || ""} placeholder="Product Id" onChange={this.handleChangeProductID} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">ProductName: </label>
                                <input className="labelField" type="text" value={this.state.ProductName || ""} placeholder="Product Name" onChange={this.handleChangeProductName} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">SupplierID: </label>
                                <input className="labelField" type="number" value={this.state.SupplierID || ""} placeholder="Supplier ID" onChange={this.handleChangeSupplierID} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">CategoryID: </label>
    {/* --------------------------------------------------------------------------drobdownlist */}
                                <select value={this.state.CategoryID} onChange={this.handleChangeCategoryID}>
                                  {catList}
                                 </select></div>
                                {/* <input className="labelField" type="number" value={this.state.CategoryID || ""} placeholder="Category ID" onChange={this.handleChangeCategoryID} /> </div> */}
                            <div className="labelDiv">
                                <label className="labelKeys">QuantityPerUnit: </label>
                                <input className="labelField" type="text" value={this.state.QuantityPerUnit || ""} placeholder="QuantityPerUnit" onChange={this.handleChangeQuantityPerUnit} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">UnitPrice: </label>
                                <input className="labelField" type="number" value={this.state.UnitPrice || ""} placeholder="UnitPrice" onChange={this.handleChangeUnitPrice} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">UnitsInStock: </label>
                                <input className="labelField" type="number" value={this.state.UnitsInStock || ""} placeholder="UnitsInStock" onChange={this.handleChangeUnitsInStock} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">UnitsOnOrder: </label>
                                <input className="labelField" type="number" value={this.state.UnitsOnOrder || ""} placeholder="UnitsOnOrder" onChange={this.handleChangeUnitsOnOrder} /> </div>
                            <div className="labelDiv">
                                <label className="labelKeys">Discontinued: </label>
                                <input id="discCheck" className="labelField" type="checkbox" defaultChecked={this.props.tuoteObj.discontinued}  onChange={this.handleChangeDiscontinued} /> </div>

                            <div className="labelDiv">
                                <label className="labelKeys">ImageLink: </label>
                                <input className="labelField" type="text" name="Imagelink" value={this.state.ImageLink || ""} placeholder="ImageLink" onChange={this.handleChangeImageLink} /> </div>
                        <br/>
                    <div className="buttonsDiv">
                        <button className="confirmBtn" type="submit">Talleta muutokset</button>
                        <button className="peruutaBtn" onClick={this.props.unmountMe}>Peruuta</button>

                    </div>
                    </form>
                    </div>
                )
            }
            else{
            //setting empty value to nwrecords so render doesnt collapse
            this.setState({ProductID:''})
            window.location.reload();

        }
    }
}

}
export default NWProductsEdit;