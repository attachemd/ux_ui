import { Component } from '@angular/core';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'surface-color',
  templateUrl: './surface.color.component.html',
  imports: [
    NgForOf,
    NgStyle
  ],
  styleUrls: ['./surface.color.component.css']
})
export class SurfaceColorComponent {
  // Array of opacity levels
  surfaceLevels = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '15', '20', '25', '30', '35', '40', '45', '50', '55',
    '60', '65', '70', '75', '80', '85', '90', '100'
  ];
}
