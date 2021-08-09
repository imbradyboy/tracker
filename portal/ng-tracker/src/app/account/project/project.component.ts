import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {catchError, map, take, tap} from "rxjs/operators";
import {AccountState} from "../../core/state/projects/account.state";
import {AccountService} from "../account.service";
import {OpenWriteProjectDialog, SetSelectedProject} from "../../core/state/projects/account.actions";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

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

  // loading state
  state$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store, private accService: AccountService) {
  }

  async ngOnInit(): Promise<void> {
    const projectId = this.route.snapshot.paramMap.get('projectId') as unknown as number;

    this.state$ = this.store.select(AccountState.selectedProjectIndex)
      .pipe(map(filterFn => filterFn(projectId)), tap(val => {
        // invalid route param so reroute to console
        if (val === -1) {
          this.router.navigate([`/`]);
        }
      }));

    this.store.dispatch(new SetSelectedProject(projectId));


    // this.state$.pipe( tap(val => {
    //   console.warn(val);
    //   if (isNotNullOrUndefined(val)) {
    //     // this.store.dispatch(new SetSelectedProject(projectId));
    //   }
    // }))
  }

  async deleteProject(pro: any): Promise<void> {
    await this.accService.openDeleteProjectDialog(pro);
  }

  editProject(pro: any) {
    this.store.dispatch(new OpenWriteProjectDialog(pro));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SetSelectedProject(-1));
  }
}
