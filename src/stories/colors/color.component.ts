import { Component } from '@angular/core';
import {NgForOf, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'colors',
  templateUrl: './color.component.html',
  imports: [
    NgForOf,
    NgStyle,
    NgIf
  ],
  styleUrls: ['./color.component.css']
})
export class ColorComponent {
  color: "common" | "surface" | "on-surface" = "common";
  CommonColors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];

  variations = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  surfaceLevels = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '15', '20', '25', '30', '35', '40', '45', '50', '55',
    '60', '65', '70', '75', '80', '85', '90', '100'
  ];
}
