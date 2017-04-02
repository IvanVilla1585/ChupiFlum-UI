import { Component, OnInit } from '@angular/core';
import {RolesService} from "../../../../../services/roles/roles.service";
import {Permission} from "../rol";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.styl'],
  providers: [RolesService]
})
export class RolesComponent implements OnInit {

  permissions: Permission [];
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
