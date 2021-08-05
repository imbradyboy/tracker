import { Component, OnInit } from '@angular/core';
import {AccountService} from "./account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private accService: AccountService) { }

  ngOnInit(): void {
    this.accService.getAccountDoc();
  }

}
