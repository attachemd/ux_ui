import { Directive, TemplateRef, input } from '@angular/core';

@Directive({
  selector: '[appTableCell]',
  standalone: true
})
export class FtTableCellDirective {
  readonly columnKey = input.required<string>({ alias: "appTableCell" });

  constructor(public templateRef: TemplateRef<any>) {}
}
