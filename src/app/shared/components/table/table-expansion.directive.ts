import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableExpansion]',
  standalone: true
})
export class FtTableExpansionDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}
