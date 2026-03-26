import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ftTableExpansion]',
  standalone: true
})
export class FtTableExpansionDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}
