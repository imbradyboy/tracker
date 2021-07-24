/**
 * Loading state
 * Follow tutorial here: https://fireship.io/lessons/ngxs-quick-start-angular-state-management/ for setting it up
 */

import {Action, State, StateContext} from '@ngxs/store';
import {SetLoading, StopLoading} from './loader.actions';
import {ProgressBarMode} from "@angular/material/progress-bar";

export interface LoadingStateModel {
  mode: ProgressBarMode;
  value?: number;
  isVisible: boolean;
}

const defaults: LoadingStateModel = {
  mode: 'determinate',
  value: 100,
  isVisible: false
};

@State<LoadingStateModel>({
  name: 'loading',
  defaults
})

export class LoadingState {
  @Action(SetLoading)
  setLoading({patchState}: StateContext<LoadingStateModel>, {payload}: SetLoading): void {

    patchState({
      ...payload
    });
  }

  @Action(StopLoading)
  reset({ setState }: StateContext<LoadingStateModel>) {
    setState( { ...defaults });
  }
}


