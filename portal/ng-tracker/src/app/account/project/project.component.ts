import {AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {interval, Observable, Subscription, timer} from "rxjs";
import {delay, map, tap} from "rxjs/operators";
import {AccountState} from "../../core/state/projects/account.state";
import {AccountService} from "../account.service";
import {
  OpenWriteProjectDialog,
  ResetSelectedProject,
  SetSelectedProject
} from "../../core/state/projects/account.actions";


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
  // state$: Observable<any> | undefined;
  @Select((state: any) => state.account.selectedProject) state$: Observable<any> | undefined;


  constructor(private route: ActivatedRoute, private router: Router, private store: Store, private accService: AccountService) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(async () => {
      const projectId = this.route.snapshot.paramMap.get('projectId') as string;

      // this.state$ = this.store.select(AccountState.selectedProjectIndex)
      //   .pipe(map(filterFn => filterFn(projectId)), tap(val => {
      //     // invalid route param so reroute to console
      //     if (val === -1) {
      //       this.router.navigate([`/`]);
      //     }
      //   }));

      // workaround for a known issue. Throws ExpressionChangedAfterItHasBeenCheckedError when dispatched in oninit
      // other fixes include dispatching in constructor, but that's bad practice
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
