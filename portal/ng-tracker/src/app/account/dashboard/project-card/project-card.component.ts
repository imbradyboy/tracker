import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SetSelectedProject} from "../../../core/state/projects/account.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: any;
  @Input() index: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
  }

  async routeToProject(id: string): Promise<void> {
    await this.router.navigate([`projects/${id}`], {relativeTo: this.activatedRoute.parent});
  }

}
