import type { Type } from '@angular/core';

export type IconComponentBase = Record<string, never>;

export type IconComponent = Type<IconComponentBase>;
