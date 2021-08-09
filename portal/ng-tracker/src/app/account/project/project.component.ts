import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {AccountState} from "../../core/state/projects/account.state";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

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
  }

  async deleteProject(pro: any): Promise<void> {
    await this.accService.deleteProject(pro);
  }
}
