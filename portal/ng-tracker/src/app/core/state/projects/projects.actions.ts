/**
 * Actions to control CRUD on projects. V1 will really only open the dialog
 */

// we put the open for the WriteProjectDialog in state because you can open this dialog from many components
export class OpenWriteProjectDialog {
  static readonly type = '[projects] open write project dialog';
  constructor() {}
}
