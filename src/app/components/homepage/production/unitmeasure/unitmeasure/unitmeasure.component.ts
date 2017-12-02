import {Component, OnInit, ViewContainerRef, ViewChild} from '@angular/core';
import { UnitmeasureService } from '../../../../../services/production/unitmeasure.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ExtracErrorMessages} from '../../../../../utils/ExtracMessages';

@Component({
  selector: 'app-unitmeasure',
  templateUrl: './unitmeasure.component.html',
  styleUrls: ['./unitmeasure.component.styl'],
  providers: [UnitmeasureService, ExtracErrorMessages]
})
export class UnitmeasureComponent implements OnInit {

  public name: string;
  public keys: any [];
  public description: string;
  public code: string;
  public equivalence: string;
  public unit: any;
  public unitForm: FormGroup;

  constructor(
    private _unitmeasureService: UnitmeasureService,
    private _container: ViewContainerRef,
    private fb: FormBuilder,
    private _toast: ToastsManager,
    private _extracErrorMessages: ExtracErrorMessages
  ){
    this.keys = [];
    this.name = '';
    this.description = '';
    this.code = '';
    this.equivalence = '';
    this.unit = {};
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
    this.createForm();
    this.keys = ['nombre', 'equivalencia', 'code']
  }

  createForm() {
    this.unitForm = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required ],
      description: '',
      code: ['', Validators.required ],
      equivalence: ['', Validators.required ]
    });
  }

  save(){
    if (this.unitForm['_status'] === 'VALID'){
      let newUnit = {
        nombre: this.unitForm.get('name').value,
        descripcion: this.unitForm.get('description').value,
        code: this.unitForm.get('code').value,
        equivalencia: this.unitForm.get('equivalence').value
      };

      console.log(this.unitForm);

      this._unitmeasureService.save(newUnit)
        .subscribe(
          (res) => {
            let data = res.json();
            this.unitForm.reset();
            this._toast.success(`Se guradó la unidad de medida ${data.nombre}`, 'Unidad de Medida!');
            console.log(res.json())
          },
          (err) => {
            if (err.status === 400){
              let message = '';
              message = this._extracErrorMessages.getMessages(err.json(), this.keys);
              this._toast.info(message, 'Unidad de Medida!', {toastLife: 10000})
            }else{
              this._toast.error('Ocurrio un error al crear', 'Unidad de Medida!')
            }
            console.log(err.json())
          }
        );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Campos obligatorios');
    }

  }

  cancel(){
    this.unitForm.reset();
  }

}
