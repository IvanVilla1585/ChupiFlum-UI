import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material";
import {ProcessService} from "../../../services/production/process.service";

@Component({
  selector: 'app-modal-edit-process',
  templateUrl: './modal-edit-process.component.html',
  styleUrls: ['./modal-edit-process.component.styl'],
  providers: [ProcessService]
})
export class ModalEditProcessComponent implements OnInit {

  public formProcess: FormGroup;
  public machines: any [];
  public title: string;
  public errorMessage: string;
  public data: any;
  public dialogRef: MatDialogRef<ModalEditProcessComponent>;

  constructor(
    private _processService: ProcessService,
    private fb: FormBuilder
  ) {
    this.machines = [];
  }

  ngOnInit() {
    this.errorMessage = '';
    this.createForm();
    this.getUnits();
    this.setDataForm();
  }

  createForm() {
    this.formProcess = this.fb.group({ // <-- the parent FormGroup
      id: ['', Validators.required ],
      name: ['', Validators.required ],
      description: '',
      machine: ['', Validators.required ],
      time: ['', Validators.required ]
    });
  }

  getUnits(){
    this._processService.findAllMachines().subscribe(
      (res) => {
        let data = res.json();
        this.machines = data;
      },
      (err) => {
        this.machines = [];
        console.log(err.json())
      }
    );
  }

  setDataForm(){
    this.formProcess.setValue({
      id: this.data.id,
      name: this.data.nombre,
      description: this.data.descripcion,
      machine: this.data.maquina.id,
      time: this.data.tiempo
    });
  }

  update(){
    let data = {
      process: {},
      valid: false,
      status: 0
    };
    if (this.formProcess['_status'] === 'VALID') {
      let process = {
        id: this.formProcess.get('id').value,
        nombre: this.formProcess.get('name').value,
        descripcion: this.formProcess.get('description').value,
        maquina: this.formProcess.get('machine').value,
        tiempo: this.formProcess.get('time').value
      };
      data.process = process;
      data.valid = true;
      this.dialogRef.close(data);
    }else{
      this.errorMessage = 'Los campos marcados con * son obligatorios'
    }
  }

  closeModal(){
    let data = {
      process: {},
      valid: false
    };
    this.dialogRef.close(data);
  }

}
