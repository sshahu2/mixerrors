import {Injectable} from '@angular/core';
import {predictionDetail} from './prediction'
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

@Injectable()
export class PredictionService extends predictionDetail{
  nlpUrl = "http://ec2-52-203-74-121.compute-1.amazonaws.com:8081/query?query=";
  loginUrl = "http://localhost:8008/v1/api/revenue/login";
   EntityList = new BehaviorSubject({});
    constructor(private http: HttpClient){
        super();
        this.data();
       
    }
    getPredictionData(data:any){
      console.log(data.Entity);
      // let pdata=JSON.parse(data);
      console.log(typeof(data.Entity) + "this is mr x");
      // var x= data.intent.toString();
      // console.log(typeof(x) + "this is mr x");
        let prediction=JSON.parse(localStorage.getItem('prediction'));
          console.log("this is predicted data" + prediction[data.Entity][0].Name);
          for (let i = 0; i < prediction[data.Entity].length; i++) {
            if ( prediction[data.Entity][i].Name == data.EntityName) {
              console.log(prediction[data.Entity][i].Price + "i am revenue")
              return prediction[data.Entity][i].Price;
            }
          }
         return;
       
    }
    getPredictionDataApi(data:any){
      console.log("inside the sbu getPredictionDataApi" + data.Entity)
      if (data.Entity == 'SBU')
      {
          return  this.http.post("http://localhost:5000/getPredictions?sbu=" + data.EntityName + "&qtr=Q1", data);
      }
      else if (data.Entity == 'VERTICAL') 
      {
        //Q1 IS HARD CODED
         return this.http.post("http://localhost:5000/getPredictions?vertical=" + data.EntityName + "&qtr=Q1" , data);
     }
      else {
        return this.http.get("http://localhost:5000/getPredictions?qtr=" + data.Timeline);
      }

    }
    getRevenueCompareApi(data:any) {
      let url = "http://localhost:5000/compareRevenue";
      if (data.Entity == 'ACCOUNTS')
        return this.http.post(url + "?account=" + data.EntityName.join(",") + ",", data);
      else   if (data.Entity == 'SBU') {
        return this.http.post(url + "?sbu=" +data.EntityName.join(",") + ",", data);
      }
      else if (data.Entity == 'VERTICAL') 
        return this.http.post(url + "?vertical=" + data.EntityName.join.join(",") + ",", data);
     else if (data.Entity == 'OVERALL')
        return this.http.post(url, data);
      return Observable.throw("No response");
    }
    //////   without backend connection......................................
    //  getChangePredictionApi(data:any){
    //   let prediction=JSON.parse(localStorage.getItem('prediction'));
     
    //   var x= data.Input_Parameter;
    //   console.log("this is predicted data" +x.Man_Month, data);
    //   for (let i = 0; i < prediction['change'][data.Entity].length; i++) {
    //     if ( prediction['change'][data.Entity][i].Name == data.EntityName &&  prediction['change'][data.Entity][i].Man_Month == x.Man_Month   ) {
    //       console.log(prediction['change'][data.Entity][i].Price + "i am revenue")
        
    //       return prediction[data.Entity][i].Price;
    //     }
    //   }
    //  return;
    // }
    ///////////////////////////////////////////////////////\
    setAllEntities(entityList) {
       this.EntityList.next(entityList);
       console.log("this" +this.EntityList);
    
  }

    getAllEntities() {
         return this.EntityList.asObservable();
    }
    getAllEntityListApi(){
      return this.http.get("http://localhost:5000/getAllEntitiesList");
    }


    ////   WITH BACKENED CONNECTION ......................................
     getChangePredictionApi(data:any){
       var x= data.Input_Parameter;
       if(data.Entity=="SBU"){
           return this.http.get("http://localhost:5000/getCalcRev?sbu=" + data.EntityName + "&newMM=" + x.Man_Month )
       }
       else if(data.Entity =="VERTICAL"){
           return this.http.get("http://localhost:5000/getCalcRev?vertical=" + data.EntityName + "&newMM=" + x.Man_Month )
       }
       else{}
     
     }
getActualDataApi(data:any){
  console.log("inside actual api")
 if (data.Entity == 'SBU')
      {
           return this.http.get('http://localhost:5000/getHistoricRevenueDetails?sbu='+data.EntityName);
       
      }
      else if (data.Entity == 'VERTICAL')
      
      {
              return this.http.get('http://localhost:5000/getHistoricRevenueDetails?vertical='+data.EntityName);
     }
      else {
         return this.http.get('http://localhost:5000/getHistoricRevenueDetails');
      }
  
}
//     getBook(){
//         let books=JSON.parse(localStorage.getItem('books'));
       
//         return books;
//     }
//     addBook(newBook:any){
//         let books = JSON.parse(localStorage.getItem('books'));
//     books.push(newBook);
//     localStorage.setItem('books', JSON.stringify(books));
//     }

    

//     deleteBook(id: any) {
//     let books = JSON.parse(localStorage.getItem('books'));
//     for (let i = 0; i < books.length; i++) {
//       if (books[i].ISBN == id) {
//         books.splice(i, 1);
//       }
//     }
//   localStorage.setItem('books', JSON.stringify(books));
// }

// getBooks(id: any) {
//     let books = JSON.parse(localStorage.getItem('books'));
//     let book:any = null;
//     for (let i = 0; i <books.length; i++) {
//       if (books[i].ISBN == id) {
//         book =books[i];
//         break;
//       }
//     }
//     return book;
//   }

//   updateBook(book: any) {
//     let books= JSON.parse(localStorage.getItem('books'));
//     for (let i = 0; i < books.length; i++) {
//       if (books[i].ISBN == book.ISBN) {
//         books[i] = book;
//       }
//     }
//     localStorage.setItem('books', JSON.stringify(books));
//   }

 
  }
  