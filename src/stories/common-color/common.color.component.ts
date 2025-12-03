import { Component } from '@angular/core';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'common-color',
  templateUrl: './common.color.component.html',
  imports: [
    NgForOf,
    NgStyle
  ],
  styleUrls: ['./common.color.component.css']
})
export class CommonColorComponent {
  colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];

  variations = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
}
