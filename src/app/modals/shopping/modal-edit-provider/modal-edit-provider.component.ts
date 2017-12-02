import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material";
import {ProviderService} from "../../../services/shopping/providers.service";

@Component({
  selector: 'app-modal-edit-provider',
  templateUrl: './modal-edit-provider.component.html',
  styleUrls: ['./modal-edit-provider.component.styl'],
  providers: [ProviderService]
})
export class ModalEditProviderComponent implements OnInit {

  public providerForm: FormGroup;
  public title: string;
  public errorMessage: string;
  public data: any;
  public dialogRef: MatDialogRef<ModalEditProviderComponent>;

  constructor(
    private _providerService: ProviderService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.errorMessage = '';
    this.createForm();
    this.setDataForm();
  }

  createForm() {
    this.providerForm = this.fb.group({ // <-- the parent FormGroup
      id: ['', Validators.required ],
      nit: ['', Validators.required ],
      provider: ['', Validators.required],
      address: ['', Validators.required ],
      phone: ['', Validators.required ],
      fax: [''],
      email_provider: [''],
      name_contact: ['', Validators.required],
      lastname_contact: [''],
      phone_contact: ['', Validators.required],
      email_contact: ['']
    });
  }

  setDataForm(){
    this.providerForm.setValue({
      id: this.data.id,
      nit: this.data.nit,
      provider: this.data.empresa,
      address: this.data.direccion,
      phone: this.data.telefono,
      fax: this.data.fax,
      email_provider: this.data.correo_empresa,
      name_contact: this.data.nombre_contacto,
      lastname_contact: this.data.apellido_contacto,
      phone_contact: this.data.telefono_contacto,
      email_contact: this.data.correo_contacto
    });
  }

  update(){
    let data = {
      provider: {},
      error: {},
      valid: false,
      status: 0
    };
    if (this.providerForm.status === 'VALID') {
      let provider = {
        id: this.providerForm.get('id').value,
        nit: this.providerForm.get('nit').value,
        empresa: this.providerForm.get('provider').value,
        direccion: this.providerForm.get('address').value,
        telefono: this.providerForm.get('phone').value,
        fax: this.providerForm.get('fax').value,
        correo_empresa: this.providerForm.get('email_provider').value,
        nombre_contacto: this.providerForm.get('name_contact').value,
        apellido_contacto: this.providerForm.get('lastname_contact').value,
        telefono_contacto: this.providerForm.get('phone_contact').value,
        correo_contacto: this.providerForm.get('email_contact').value
      };
      this._providerService.update(provider)
        .subscribe(
          (res) => {
            data.provider = res.json();
            data.valid = true;
            this.dialogRef.close(data);
          },
          (err) => {
            data.status = err.status;
            data.error = err.json();
            data.valid = false;
            this.dialogRef.close(data);
          }
        );
    }else{
      this.errorMessage = 'Los campos marcados con * son obligatorios';
    }
  }

  closeModal(){
    let data = {
      provider: {},
      valid: false,
      status: 1
    };
    this.dialogRef.close(data);
  }

}
