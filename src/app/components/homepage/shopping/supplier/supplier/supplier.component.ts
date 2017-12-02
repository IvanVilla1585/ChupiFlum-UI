import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {ProviderService} from "../../../../../services/shopping/providers.service";
import {ExtracErrorMessages} from "../../../../../utils/ExtracMessages";


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.styl'],
  providers: [ProviderService, ExtracErrorMessages]
})
export class SupplierComponent implements OnInit {

  providerForm: FormGroup;
  keys: any [];
  message: string;

  constructor(
    private _providerService: ProviderService,
    private _container: ViewContainerRef,
    private fb: FormBuilder,
    private _toast: ToastsManager,
    private _extracErrorMessages: ExtracErrorMessages
  ) {
    this.keys = [];
    this.message = '';
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.createForm();
    this.keys = ['nombre', 'cantidad', 'categoria', 'stock']
  }

  createForm() {
    this.providerForm = this.fb.group({ // <-- the parent FormGroup
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

  save(){
    if (this.providerForm.status === 'VALID'){
      let provider = {
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
      this._providerService.save(provider).subscribe(
        (res) => {
          let data = res.json();
          this.providerForm.reset();
          this._toast.success(`El proveedor ${data.empresa} fue guardada`, 'Proveedores!');
        },
        (err) => {
          if (err.status === 400){
            this.message = this._extracErrorMessages.getMessages(err.json(), this.keys);
            this._toast.info(this.message, 'Proveedores!', {toastLife: 10000})
          }else{
            this._toast.error('Ocurrio un error al crear', 'Proveedor!')
          }
          console.log(err)
        }
      );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Proveedor!')
    }
  }

}
