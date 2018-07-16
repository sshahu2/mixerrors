export class predictionDetail{
    data(){
        if(localStorage.getItem('prediction') === null || localStorage.getItem('prediction')==undefined){
            console.log("Initialising Prediction List...");
	var prediction={SBU:[{
                	Name:'BFSI',
                    Price:74,
	                Qtr :'pdf'
            },
            {
                	Name:'EMU',
                    Revenue:40,
	                Qtr :'pdf'
            },
            {
                	Name:'CBU',
                    Price:51,

	                Qtr :'pdf'
            },   
            ],
            Vertical:[{
                Name:'Hp',
                Price:88,
                Qtr :'pdf'
        },
        {
                Name:'Morgan',
                Price:13,
                Qtr :'pdf'
        },
        {
                Name:'Apple',
                Price:72,
                Qtr :'pdf'
        },
        {
                Name:'HCL',
                Price:30,
        
                Qtr :'pdf'
        },
        {
                Name:'Samsung',
                Price:50,
                Qtr :'pdf'
        },
        {
                Name:'LG',
                Price:40,
                Qtr :'pdf'
        }
        
        ]};
			localStorage.setItem('prediction',JSON.stringify(prediction));

        }
		else{
			console.log("load prediction");
		}
    }
    
}