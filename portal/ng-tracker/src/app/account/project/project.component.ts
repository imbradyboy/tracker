import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {GetAccount} from "../../core/state/projects/account.actions";
import {AccountState} from "../../core/state/projects/account.state";

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

  // @Select((state: any) => state.account[0]) state$: Observable<any> | undefined;
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('projectId') as unknown as number;

    // this.state$ = this.store.select(state => state.account);

    this.state$ = this.store.select(AccountState.getIndexed).pipe(map(filterFn => filterFn(projectId)));


    // this.store.dispatch(new GetAccount(''));
  }

}
