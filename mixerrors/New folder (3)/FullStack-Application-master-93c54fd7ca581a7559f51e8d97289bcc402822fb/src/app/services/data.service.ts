import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { dataStore } from "./dataStore";
// import  'rxjs/operators/toPromise';
// import 'rxjs/operators/catch';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

@Injectable()
export class DataService extends dataStore {
  parameter = new BehaviorSubject({});
  selectedChart = new BehaviorSubject([]);
  searchQuery = new BehaviorSubject("");
  imageToDisplay = new BehaviorSubject("");
  nlpUrl = "http://ec2-52-203-74-121.compute-1.amazonaws.com:8081/query?query=";
  loginUrl = "http://localhost:8008/v1/api/revenue/login";


  constructor(private http: HttpClient) {
    super();
    this.data();
  }
  setParameter(query) {

    this.parameter.next(query);
    console.log("this" + this.parameter);

  }


  getParameter() {
    return this.parameter.asObservable();
  }

  setUrl(query) {
    
        this.imageToDisplay.next(query);
        console.log("this" + this.parameter);
    
      }
    
    
      getUrl() {
        return this.imageToDisplay.asObservable();
      }
    

  login(user) {

    return this.http.post(this.loginUrl, user);

  }


  getData() {

    let files = JSON.parse(localStorage.getItem("files"));

    console.log("data ", files);

    return files;

  }


  setSearchQuery(query) {

    this.searchQuery.next(query);

  }


  getSearchQuery() {
    return this.searchQuery.asObservable();
  }

  getAnalysisGraphs() {
    return this.http.get("../../assets/db.json");
  }

  setSelectedChart(chartName) {
    this.selectedChart.next(chartName);
  }

  getSelectedChart() {
    return this.selectedChart.asObservable();
  }

  getVerRevenueData() {
    return this.http.get("http://localhost:8080/ver_revenue");
  }

  getAccRevenueData() {
    return this.http.get("http://localhost:8090/acc_revenue");
  }

  getAccTimelineData() {
    return this.http.get("http://localhost:8070/accountTimeLineData");
  }

  getSbuTimeLineData() {
    return this.http.get("http://localhost:8050/sbuTimeLine");
  }

  getVerticalTimeLineData() {
    return this.http.get("http://localhost:8050/verticalTimeLine");
  }

  destructureQuery(query: string) {
    return this.http.get(this.nlpUrl + query);
  }

  submitFeedback(feedback) { }

  getInitParamValue() {
    let sbu_mm,ver_mm;
    return this.http.get('../../assets/revData/sbu_vertical.json');
  }

  getInitPredictedRevenue(entity, entityName) {
    if(entity === "SBU"){
      return this.http.get("http://localhost:5000/getPredictions?sbu="+entityName+"&qtr=Q1");
    } else if(entity === "Vertical") {
      return this.http.get("http://localhost:5000/getPredictions?vertical="+entityName+"&qtr=Q1");
    }
  }

  getApiData(nlpResult) {
    let apiResult: any;
    if (nlpResult.intent === "revenueDetails") {
      return this.getRevenueDetails(nlpResult);
    } else if (nlpResult.intent === "revenueTimeline") {
      return this.getRevenueTimeLine(nlpResult);
    } else if (nlpResult.intent === "revenueCompare") {
      if (nlpResult.timeline.length == 0) {
        alert('Timeline is required to show the Relevant graph');
        return Observable.throw("No response");
      }
      return this.getRevenueCompare(nlpResult);
    } else if (nlpResult.intent === "sbuDetails") {
      return this.getSbuDetails(nlpResult);
    } else if (nlpResult.intent === "verticalDetails") {
      if (nlpResult.revenueState == "predicted" && (nlpResult.revenueProperty != "min growth" && nlpResult.revenueProperty != "max growth")) {
        return this.getRevenueDetails(nlpResult);
      } else if (nlpResult.revenueState == 'predicted' || nlpResult.revenueState != 'predicted') {
        return this.getVerticalDetails(nlpResult);
      }
    } else if (nlpResult.intent === "accountDetails") {
      return this.getAccountDetails(nlpResult);
    }
    return Observable.throw("No Response");
  }
  //  using api
  // getPredictionDetail(predictionData){
  //   if(predictionData.Entity == 'sbu'){
  //     return this.http.post("http://localhost:5000/getPredictions?sbu=" + predictionData.EntityName + "&qtr=" + predictionData.Qtr, );
  //   }

  // }
  getRevenueDetails(nlpResult) {
    if (nlpResult["revenueState"] === "predicted" && nlpResult.timeline.length > 0) {
      let qtr = nlpResult.timeline[1] + ',';
      if (nlpResult.sbu.length > 0)
        return this.http.post("http://localhost:5000/getPredictions?sbu=" + nlpResult.sbu[0] + "&qtr=" + qtr, nlpResult);
      if (nlpResult.vertical.length > 0)
        return this.http.post("http://localhost:5000/getPredictions?vertical=" + nlpResult.vertical[0] + "&qtr=" + qtr, nlpResult);
      if (nlpResult.sbu.length == 0 || nlpResult.vertical.length == 0 || nlpResult.account.length == 0)
        return this.http.get("http://localhost:5000/getPredictions?qtr=" + qtr);
    } else {
      if (nlpResult.revenueLevel === 'overall') {
        return this.http.get('http://localhost:5000/getHistoricRevenueDetails');
      } else if (nlpResult.revenueLevel == 'sbu' && nlpResult.sbu.length > 0) {
        return this.http.get('http://localhost:5000/getHistoricRevenueDetails?sbu=' + nlpResult.sbu);
      } if (nlpResult.revenueLevel == 'account' && nlpResult.account.length > 0) {
        return this.http.get('http://localhost:5000/getHistoricRevenueDetails?account=' + nlpResult.account);
      } else if (nlpResult.revenueProperty.trim() === 'growth') {
        return this.getRevenueCompare(nlpResult);
      } else if (nlpResult.account.length > 0) {
        return this.http.get('http://localhost:3000/revenueDetails/accounts/' + nlpResult.account[0]) // ...using put request
      } else if (nlpResult.sbu.length > 0 || nlpResult.account.length > 0 || nlpResult.vertical.length > 0) {
        let x = "";
        if (nlpResult.sbu.length > 0) { x = nlpResult.sbu[0] } else if (nlpResult.vertical.length > 0) { x = nlpResult.vertical[0] }
        return this.http.get('http://localhost:3000/revenueDetails/anysum/' + x) // ...using put request
      } else if (nlpResult.timeline.length > 0) {
        let x = "";
        if (nlpResult.sbu.length > 0) { x = nlpResult.sbu[0].toLowerCase(); } else if (nlpResult.vertical.length > 0) { x = nlpResult.vertical[0].toLowerCase() }
        return this.http.get('http://localhost:3000/revenueDetails/quarters/' + x + '/' + nlpResult.timeline[0] + '_FY18') // ...using put request
      } else if (nlpResult.account.length > 0) {
        return this.http.get('http://localhost:3000/revenueDetails/noquarter/' + nlpResult.account[0]) // ...using put request
      }
    }
    return Observable.throw("No response");
  }

  getRevenueCompare(nlpResult) {
    let url = "http://localhost:5000/compareRevenue";
    if (nlpResult.account.length > 0)
      return this.http.post(url + "?account=" + nlpResult.account.join(",") + ",", nlpResult);
    if (nlpResult.sbu.length > 0) {
      return this.http.post(url + "?sbu=" + nlpResult.sbu.join(",") + ",", nlpResult);
    }
    if (nlpResult.vertical.length > 0)
      return this.http.post(url + "?vertical=" + nlpResult.vertical.join(",") + ",", nlpResult);
    if (nlpResult.account.length == 0 && nlpResult.sbu.length == 0 && nlpResult.vertical.length == 0)
      return this.http.post(url, nlpResult);
    return Observable.throw("No response");
  }

  getRevenueTimeLine(nlpResult) {
    if (nlpResult.revenueState != "predicted") {
      if (nlpResult.sbu.length > 0 && nlpResult.revenueProperty) {
        return this.http.get('http://localhost:3000/revenueTimeline/sbus/quarters/' + nlpResult.sbu[0])
      }
      else if (nlpResult.vertical.length > 0 && nlpResult.revenueProperty) {
        return this.http.get('http://localhost:3000/revenueTimeline/verticals/' + nlpResult.vertical[0])
      }
    }
    return Observable.throw("No response");
  }

  getSbuDetails(nlpResult) {
    if (nlpResult.revenueState != "predicted") {
      if (nlpResult.timeline.length > 0 && nlpResult.revenueLevel === 'sbu' && nlpResult.sbu.length > 0) {
        return this.http.get('http://localhost:5000/getHistoricRevenueDetails?sbu=' + nlpResult.sbu);
        //return this.http.get('http://localhost:3000/sbuDetails/sbus/' + nlpResult.timeline[0] + '_FY18');
      }
    }
    return Observable.throw("No response");
  }

  getVerticalDetails(nlpResult) {
    if (nlpResult.revenueState != "predicted") {
      if (nlpResult.timeline.length > 0 && nlpResult.revenueLevel === 'sbu' && nlpResult.sbu.length > 0) {
        return this.http.get('http://localhost:5000/getHistoricRevenueDetails?sbu=' + nlpResult.sbu);
      }
      // if (nlpResult.timeline.length > 0) {
      //   return this.http.get('http://localhost:3000/verticalDetails/verticals/' + nlpResult.timeline[0] + '_FY18');
      // }
    }
    if (nlpResult.revenueState == "predicted" && (nlpResult.revenueProperty == 'min growth' || nlpResult.revenueProperty == 'max growth')) {
      return this.http.get('http://localhost:5000/getPredictions/revenueProperty?revProperty=' + nlpResult.revenueProperty)
    }
    return Observable.throw("No response");
  }

  getAccountDetails(nlpResult) {
    if (nlpResult.revenueState != "predicted") {
      if (nlpResult.sbu.length > 0 && nlpResult.timeline.length > 0) {
        let number = (nlpResult.number.length > 0) ? nlpResult.number : 5;
        if (nlpResult.revenueProperty == 'max') {
          return this.http.get('http://localhost:3000/accountDetails/top/' + nlpResult.sbu[0] + '/' + nlpResult.timeline[1] + '_FY18/' + number);
        } else if (nlpResult.revenueProperty == 'min') {
          return this.http.get('http://localhost:3000/accountDetails/bottom/' + nlpResult.sbu[0] + '/' + nlpResult.timeline[1] + '_FY18/' + number);
        } else if (nlpResult.revenueLevel === 'sbu') {
          return this.http.get('http://localhost:5000/getHistoricRevenueDetails?sbu=' + nlpResult.sbu + '&account=all');
        }
      } else if (nlpResult.vertical.length > 0) {
        if (nlpResult.revenueLevel == 'vertical') {
          return this.http.get('http://localhost:5000/getHistoricRevenueDetails?vertical=' + nlpResult.vertical[0]);
        }
      } else if (nlpResult.timeline.length > 0) {
        return this.http.get('http://localhost:3000/accountDetails/accounts/' + nlpResult.timeline[0] + '_FY18');
      }
    } else {
      // if (nlpResult.sbu.length > 0 && nlpResult.timeline.length > 0) {
      //  if(nlpResult.revenueProperty == 'max'){
      //    return this.http.get('http://localhost:3000//accountDetails/top/'+nlpResult.sbu[0]+'/'+nlpResult.timeline[1]+ '_FY18');
      //  }
      // }
      //return this.http.get('http://localhost:5000/getEntityDetails?entityType=' + nlpResult.revenueLevel + '&entity=' + nlpResult[nlpResult.revenueLevel][0] + '&timeline=' + nlpResult.timeline[0] ? nlpResult.timeline[0] : 'Q1');
    }
    return Observable.throw("No response");
  }

  getNewApi(api) {
    return this.http.get(api);
  }
}
