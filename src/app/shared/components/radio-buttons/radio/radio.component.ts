import { Component, Input, ViewEncapsulation, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ft-radio',
  templateUrl: './radio.component.html',
  imports: [
    NgClass,
    FormsModule
],
  styleUrls: ['./radio.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Ensure this is set (default)
})
export class FtRadioComponent {

  readonly isLabel = input(false);
  readonly label = input<string>();
  readonly isDescription = input(false);
  readonly description = input<string>();
  @Input() select = false;
  readonly inactive = input(false);
  readonly invalid = input(false);
  readonly size = input<'xs-size' | 'sm-size' | 'md-size' | 'lg-size'>('md-size');
  readonly state = input<'hover' | 'press' | 'focus' | 'rest' | 'disabled'>('rest');

  readonly name = input<string>('');
  readonly value = input<any>();
  readonly selectChange = output<boolean>();

  onRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.select = target.checked;
    this.selectChange.emit(this.select);
  }

}

