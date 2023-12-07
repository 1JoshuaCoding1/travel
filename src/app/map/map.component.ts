import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setMapboxAccessToken } from './mapbox-config';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls:[ './map.component.css']
})
export class MapComponent implements OnInit {

  ngOnInit(): void {
    const map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiaXprdW1iZXJkdSIsImEiOiJjbHA1ZXV6d3kxbXY1Mm9xdWM3Nmg3bG1nIn0.kEkGXezKiCHmcwVgTHpqOA',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  }
}
