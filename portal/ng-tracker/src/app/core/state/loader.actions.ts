/**
 * Actions to control loading state
 */
export class SetLoading {
  static readonly type = '[loading] set loading';

  constructor(public payload: any) {
  }
}

export class StopLoading {
  static readonly type = '[loading] stop loading';
}

