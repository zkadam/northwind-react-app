
        let jwtoken = localStorage.getItem('token') // <-----------------
        if(jwtoken!==null)
        {
          let expDate=JSON.parse(atob(jwtoken.split('.')[1]))
              //tarkistetaan, onko token vielä voimassa
            if(Date.now()<expDate.exp*1000)
            {
                //luodaan asiakasobjekti       
                const asiakas={CustomerID:this.state.CustomerID,
                    CompanyName:this.state.CompanyName,
                    ContactName:this.state.ContactName,
                    ContactTitle:this.state.ContactTitle,
                    Address:this.state.Address,
                    PostalCode:this.state.PostalCode,
                    City:this.state.City,
                    Country:this.state.Country,
                    Phone:this.state.Phone,
                    Fax:this.state.Fax
                }
                const asiakasJson=JSON.stringify(asiakas);
                console.log("asiakasJson: "+asiakasJson);
                const apiUrl='https://webapiharjoituskoodi2020.azurewebsites.net/nw/customer';
                fetch(apiUrl,{
                    method:"POST",
                    headers:{
                        Authorization: "Bearer " + jwtoken,
                        "Accept":"application/json",
                        "Content-Type":"application/json"
                    },
                    body:asiakasJson
                    }).then((response)=>response.json())
                    .then((json)=>{
                        //store the data returned from the backend to the current state
                        const success=json;
                        console.log(`Response from server: ${success}.`);
                        if(success){
                            alert("Pyyntö asiakkaan tallenttamiseksi tehty");
                        }
                    })
            }else{
                localStorage.clear();
                console.log('-----------------TOKEN HAS EXPIRED------------------')
                this.setState({CustomerID:''})
                window.location.reload();

      }
    }
    else{
      //setting empty value to nwrecords so render doesnt collapse
      this.setState({CustomerID:''})
      window.location.reload();

}