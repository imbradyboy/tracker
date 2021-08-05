import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: any;
  @Input() index: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  async routeToIndex(): Promise<void> {
    await this.router.navigate([`projects/${this.index}`], {relativeTo: this.activatedRoute.parent});
  }

}
