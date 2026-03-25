import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableExpansion]',
  standalone: true
})
export class FTTableExpansionDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}
