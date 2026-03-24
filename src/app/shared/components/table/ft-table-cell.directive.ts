import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableCell]',
  standalone: true
})
export class FTTableCellDirective {
  @Input('appTableCell') columnKey!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
