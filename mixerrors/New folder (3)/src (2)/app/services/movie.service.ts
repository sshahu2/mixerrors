import { Injectable } from '@angular/core';
import { Init } from "./../components/initial-movies";
export class MovieService extends Init {
  constructor() {
    super();
    console.log("Initializing Movies service ...");
    this.load();
  }

  getMovieCount() {
    let Movies = JSON.parse(localStorage.getItem('Movies'));
    return Movies.length;
  }

  getMovies() {
    let Movies = JSON.parse(localStorage.getItem('Movies'));
    return Movies;
  }

  getMovie(name: any) {
    let Movies = JSON.parse(localStorage.getItem('Movies'));
    let Movie:any = null;
    for (let i = 0; i < Movies.length; i++) {
      if (Movies[i].name == name) {
        Movie = Movies[i];
        break;
      }
    }
    return Movie;
  }
 

  addMovie(newMovie: any) {
    let Movies = JSON.parse(localStorage.getItem('Movies'));
    Movies.push(newMovie);
    localStorage.setItem('Movies', JSON.stringify(Movies));
  }

  updateMovie(updatedMovie: any) {
    let Movies = JSON.parse(localStorage.getItem('Movies'));
    for (let i = 0; i < Movies.length; i++) {
      if (Movies[i].id == updatedMovie.id) {
        Movies[i] = updatedMovie;
      }
    }
    localStorage.setItem('Movies', JSON.stringify(Movies));
  }

  deleteMovie(id: any) {
    let Movies = JSON.parse(localStorage.getItem('Movies'));
    for (let i = 0; i < Movies.length; i++) {
      if (Movies[i].id == id) {
        Movies.splice(i, 1);
      }
       
    }
    localStorage.setItem('Movies', JSON.stringify(Movies));
  }
}
