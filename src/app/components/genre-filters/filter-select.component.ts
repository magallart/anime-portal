import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, type MatSelectChange } from '@angular/material/select';
import './material-theme.css';
import { PANEL_CLASSES } from '../../constants/panel-classes';
import { FILTER_ALL } from '../../constants/filter-selection';
import type { SelectOption } from '../../constants/select-option';

@Component({
  selector: 'app-filter-select',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field
      appearance="outline"
      floatLabel="always"
      subscriptSizing="dynamic"
      class="w-full"
    >
      <mat-label>{{ label() }}</mat-label>
      <mat-select
        [value]="value()"
        [panelClass]="panelClass()"
        (selectionChange)="onSelectionChange($event)"
      >
        @if (includeAll()) {
          <mat-option [value]="allValue()">{{ allLabel() }}</mat-option>
        }
        @for (option of options(); track option.value) {
          <mat-option [value]="option.value">{{ option.label }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
})
export class FilterSelectComponent {
  readonly label = input.required<string>();
  readonly options = input.required<readonly SelectOption<string | number>[]>();
  readonly value = input<string | number>(FILTER_ALL);
  readonly panelClass = input<string>(PANEL_CLASSES.genreFilters);
  readonly includeAll = input(true);
  readonly allLabel = input('All');
  readonly allValue = input<string | number>(FILTER_ALL);
  readonly selectionChange = output<string | number>();

  onSelectionChange(event: MatSelectChange): void {
    this.selectionChange.emit(event.value as string | number);
  }
}
