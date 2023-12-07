import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
customOptions: any;

}
// import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  // imports: [ CarouselModule ],
})
export class SomeModule { }