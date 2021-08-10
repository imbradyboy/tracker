import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable, Subscription} from "rxjs";
import {catchError, debounceTime, delay, map, take, tap} from "rxjs/operators";
import {AccountState} from "../../core/state/projects/account.state";
import {AccountService} from "../account.service";
import {
  OpenWriteProjectDialog,
  ResetSelectedProject,
  SetSelectedProject
} from "../../core/state/projects/account.actions";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {startsWith} from "@rxweb/reactive-form-validators";
import {DisconnectAll} from "@ngxs-labs/firestore-plugin";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {

  saleData = [
    {name: "Mobiles", value: 105000},
    {name: "Laptop", value: 55000},
    {name: "AC", value: 15000},
    {name: "Headsets and Other Stuff for long title", value: 150000},
    {name: "Fridge", value: 20000}
  ];

  routeSubscription: Subscription | undefined; // subscribes to route parameters so we can listen to changes in id


  // loading state
  state$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store, private accService: AccountService) {
  }

  async ngOnInit(): Promise<void> {

    this.routeSubscription = this.route.params.subscribe(async () => {
      const projectId = this.route.snapshot.paramMap.get('projectId') as unknown as number;

      this.state$ = this.store.select(AccountState.selectedProjectIndex)
        .pipe(map(filterFn => filterFn(projectId)), tap(val => {
          // invalid route param so reroute to console
          if (val === -1) {
            this.router.navigate([`/`]);
          }
        }));

      // TODO find a more elegant fix for this expression has been changed after it was checked issue
      setTimeout(() => {
        this.store.dispatch(new SetSelectedProject(projectId));
      }, 0)
    });
  }

  async deleteProject(pro: any): Promise<void> {
    await this.accService.openDeleteProjectDialog(pro);
  }

  editProject(pro: any) {
    this.store.dispatch(new OpenWriteProjectDialog(pro));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetSelectedProject());
    this.routeSubscription?.unsubscribe();
  }
}
