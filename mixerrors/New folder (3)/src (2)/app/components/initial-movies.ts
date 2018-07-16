export class Init {
    load() {
   // if (localStorage.getItem('Movies') === null || localStorage.getItem('Movies') == undefined) 
      {
        console.log("Creating the initial set of Movies ...");
        var Movies = [
          {
            name: "deadpool",
            votes:"95",
            img: "./../../assets/d.jpeg",
            theatre:[{
                name:"a",
                timing:["2.50","3.00","3.30","4.00"],
                seats:[{
                    type:"front",
                    status:"full",
                    price:250
                },
                {
                    type:"middle",
                    status:"partial",
                    price:300
                },
                {
                    type:"back",
                    status:"Almost Full",
                    price:350
                }
                
            ]
            },
            {
                name:"b",
                timing:["2.50","3.00","3.30","4.00"],
                seats:[{
                    type:"front",
                    status:"full",
                    price:230
                },
                {
                    type:"middle",
                    status:"partial",
                    price:300
                },
                {
                    type:"back",
                    status:"Almost Full",
                    price:350
                }
                
            ]
            }],},
            {
                name: "pari",
                votes:"85",
                img: "./../../assets/p.jpeg",
                theatre:[{
                    name:"c",
                    timing:["4.50","3.00","3.30","4.00"],
                    seats:[{
                        type:"front",
                        status:"full",
                        price:250
                    },
                    {
                        type:"middle",
                        status:"partial",
                        price:300
                    },
                    {
                        type:"back",
                        status:"Almost Full",
                        price:350
                    }
                    
                ]
                },
                {
                    name:"e",
                    timing:["2.50","3.00","3.30","4.00"],
                    seats:[{
                        type:"front",
                        status:"full",
                        price:230
                    },
                    {
                        type:"middle",
                        status:"partial",
                        price:300
                    },
                    {
                        type:"back",
                        status:"Almost Full",
                        price:350
                    }
                    
                ]
                }],}
        ];
        localStorage.setItem('Movies', JSON.stringify(Movies));
      }
    /*else {
        console.log("Loaded the Movies from local storage ...");
      }*/
    }
  }
  