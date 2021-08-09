/**
 * Loading state
 * Follow tutorial here: https://fireship.io/lessons/ngxs-quick-start-angular-state-management/ for setting it up
 */

import {Action, State, StateContext} from '@ngxs/store';
import {ResetLoading, SetLoading} from './loader.actions';
import {ProgressBarMode} from "@angular/material/progress-bar";
import {Injectable} from "@angular/core";

export interface LoadingStateModel {
  mode: ProgressBarMode;
  value: number;
  isVisible: boolean;
}

const defaults: LoadingStateModel = {
  mode: 'determinate',
  value: 100,
  isVisible: false,
};

@State<LoadingStateModel>({
  name: 'loading',
  defaults
})

@Injectable()
export class LoadingState {
  @Action(SetLoading)
  setLoading({setState}: StateContext<LoadingStateModel>, payload: SetLoading): void {
    setState({...payload});
  }

  @Action(ResetLoading)
  resetLoading({setState}: StateContext<LoadingStateModel>): void {
    setState({...defaults});
  }
}


