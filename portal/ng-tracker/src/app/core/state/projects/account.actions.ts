/**
 * Actions to control CRUD on projects. V1 will really only open the dialog
 */

// we put the open for the WriteProjectDialog in state because you can open this dialog from many components
export class OpenWriteProjectDialog {
  static readonly type = '[account] open write project dialog';
  constructor(public project: any = null) {}
}

export class OpenDeleteProjectDialog {
  static readonly type = '[account] open delete project dialog';
  constructor(public project: any) {}
}

export class GetAccount {
  public static readonly type = '[account] get account';
  constructor() {}
}

export class SetSelectedProject {
  public static readonly type = '[account] set selected project';
  constructor(public selectedProjectIndex: number) {}
}

export class ResetSelectedProject {
  public static readonly type = '[account] reset selected project';
  constructor() {}
}
