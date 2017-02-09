import { Component, OnInit } from '@angular/core';
import {RolesService} from "../../../../../services/roles/roles.service";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.styl'],
  providers: [RolesService]
})
export class RolesComponent implements OnInit {

  permissions: any [];
  constructor(private rolesService: RolesService) {
    this.permissions = [];
  }

  ngOnInit() {
    this.getPermissions();
  }

  getPermissions(){
    this.rolesService
      .getPermissions()
      .then(res => {
        this.permissions = res;
      });
  }

}
