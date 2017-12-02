import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/permissions/user.service";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.component.html',
  styleUrls: ['./modal-edit-user.component.styl'],
  providers: [UserService]
})
export class ModalEditUserComponent implements OnInit {

  public userForm: FormGroup;
  public roles: any [];
  public title: string;
  public errorMessage: string;
  public data: any;
  public dialogRef: MatDialogRef<ModalEditUserComponent>;

  constructor(
    private _userService: UserService,
    private fb: FormBuilder
  ) {
    this.roles = [];
  }

  ngOnInit() {
    this.errorMessage = '';
    this.createForm();
    this.getGroups();
    this.setDataForm();
  }

  createForm() {
    this.userForm = this.fb.group({ // <-- the parent FormGroup
      id: ['', Validators.required ],
      first_name: ['', Validators.required ],
      last_name: '',
      email: ['', Validators.required ],
      group: ['', Validators.required ]
    });
  }

  getGroups(){
    this._userService.getGroups()
      .subscribe(
        res => {
          let data = res.json();
          this.roles = data;
        },
        err => {
        console.log(err.json())
          this.roles = [];
        }
      );
  }

  setDataForm(){
    debugger
    this.userForm.setValue({
      id: this.data.id,
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      email: this.data.email,
      group: ''
    });
  }

  update(){
    let data = {
      user: {},
      valid: false
    };
    if (this.userForm['_status'] === 'VALID') {
      let user = {
        id: this.userForm.get('id').value,
        first_name: this.userForm.get('first_name').value,
        last_name: this.userForm.get('last_name').value,
        email: this.userForm.get('email').value,
        group: this.userForm.get('group').value
      };
      data.user = user;
      data.valid = true;
      this.dialogRef.close(data);
    }else{
      this.errorMessage = 'Los campos marcados con * son obligatorios'
    }
  }

  closeModal(){
    let data = {
      user: {},
      valid: false
    };
    this.dialogRef.close(data);
  }
}
