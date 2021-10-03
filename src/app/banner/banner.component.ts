import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  mySwiper: Swiper | undefined;
  images: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container');
  }

}
