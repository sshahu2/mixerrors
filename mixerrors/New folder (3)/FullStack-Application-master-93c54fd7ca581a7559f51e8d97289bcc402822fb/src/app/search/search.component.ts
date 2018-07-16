import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { DataService } from "../services/data.service";


@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  query = "";

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
  }

  // submit(query) {
  //   if (query.length > 0) {
  //     this.dataService.setSearchQuery(query);
  //     this.router.navigate(["search-result","search"]);
  //   } else {
  //     alert("Please rephrase your query");
  //   }
  // }

  animate() {
       if (this.query.length > 0) {
        console.log("Please rephrase your query")
      this.dataService.setSearchQuery(this.query);
      this.router.navigate(["/searchResult"]);
    } else {
      alert("Please rephrase your query");
    }
  }
}
