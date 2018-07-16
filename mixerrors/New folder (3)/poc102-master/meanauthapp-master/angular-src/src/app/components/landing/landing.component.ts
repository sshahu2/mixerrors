import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  img1="https://firebasestorage.googleapis.com/v0/b/souledstore-10830.appspot.com/o/array%2F-LBvMzmeFlwEOw-akxhy..png?alt=media&token=e8af51f2-3b59-4876-ab33-fd53a14c4a74";
  img2="https://firebasestorage.googleapis.com/v0/b/souledstore-10830.appspot.com/o/array%2F-LBvQvfbFjA-JNXQWXmn..jpg?alt=media&token=e7fc1438-e16c-4967-be57-13d8843e8b83";
  /*img1="file://ang.png";
  img2="file://react.png";*/
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    let wrapper = document.getElementById('wrapper');
    let topLayer = document.getElementById('top');
    let handle = document.getElementById('handle');
    let skew = 0;
    let delta = 0;
    if (wrapper.className.indexOf('skewed') != -1) {
      skew = 1000;
    }
    wrapper.addEventListener('mousemove', function (e) {
      delta = (e.clientX - window.innerWidth / 2) * 0.5;
      console.log(handle);
      handle.style.left = e.clientX + delta + 'px';
      topLayer.style.width = e.clientX + skew + delta + 'px';
    });
  }
  /*document.addEventListener('DOMContentLoaded', function(){
    let wrapper = document.getElementById('wrapper');
    let topLayer = wrapper.querySelector('.top');
    let handle = wrapper.querySelector('.handle');
    let skew = 0;
    let delta = 0;
  
    if(wrapper.className.indexOf('skewed') != -1){
      skew = 1000;
    }
    
    wrapper.addEventListener('mousemove', function(e){
      delta = (e.clientX - window.innerWidth / 2) * 0.5;
    
      handle.style.left = e.clientX + delta + 'px';
  
      topLayer.style.width= e.clientX + skew + delta + 'px';
    });
  });*/
}
