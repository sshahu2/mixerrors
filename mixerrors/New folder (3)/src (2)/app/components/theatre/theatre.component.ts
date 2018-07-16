import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MovieService} from './../../services/movie.service';
@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {
  display: boolean = false;
  moviename:any;
  moviefetched:any;
  constructor(private movieservice:MovieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
        this.moviename = params['moviename'];
        
    }); 
  this.moviefetched=this.movieservice.getMovie(this.moviename);
}
}
