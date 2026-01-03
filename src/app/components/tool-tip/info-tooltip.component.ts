// info-tooltip.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-tooltip',
  standalone: true,
  template: `
    <span class="tooltip-container">
      ⓘ
      <span class="tooltip-text">{{ text }}</span>
    </span>
  `,
  styleUrls: ['./info-tooltip.component.css']
})
export class InfoTooltipComponent {
  @Input() text = '';
}
