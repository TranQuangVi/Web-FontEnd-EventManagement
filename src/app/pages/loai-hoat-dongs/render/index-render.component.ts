import { Component, Input } from '@angular/core';

@Component({
  template: '{{ value.index }}',
})
export class IndexRenderComponent {
  @Input() value: any;
  @Input() rowData: any;
}