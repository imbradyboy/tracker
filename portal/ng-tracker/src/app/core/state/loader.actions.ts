/**
 * Actions to control loading state
 */
import {ProgressBarMode} from "@angular/material/progress-bar";

export class SetLoading {
  static readonly type = '[loading] set loading';
  constructor(public mode: ProgressBarMode, public value: number = 100, public isVisible = true) {}
}

export class ResetLoading {
  static readonly type = '[loading] reset loading';
  constructor() {}
}

