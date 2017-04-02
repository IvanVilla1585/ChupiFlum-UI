import {Component, OnInit, ViewContainerRef, ViewChild} from '@angular/core';
import { UnitmeasureService } from '../../../../../services/production/unitmeasure/unitmeasure.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'app-unitmeasure',
  templateUrl: './unitmeasure.component.html',
  styleUrls: ['./unitmeasure.component.styl'],
  providers: [UnitmeasureService]
})
export class UnitmeasureComponent implements OnInit {

  public name: string;
  public description: string;
  public code: string;
  public equivalence: string;
  public unit: any;
  public unitForm: FormGroup;

  constructor(
    private _unitmeasureService: UnitmeasureService,
    private _container: ViewContainerRef,
    private fb: FormBuilder,
    private _toast: ToastsManager
  ){
    this.name = '';
    this.description = '';
    this.code = '';
    this.equivalence = '';
    this.unit = {};
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
      this.createForm();
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
      debugger
    if (this.unitForm['_status'] === 'VALID'){
      let newUnit = {
        nombre: this.unitForm['_value']['name'],
        descripcion: this.unitForm['_value']['description'],
        code: this.unitForm['_value']['code'],
        equivalencia: this.unitForm['_value']['equivalence']
      };

      console.log(this.unitForm);

      this._unitmeasureService.save(newUnit)
        .subscribe(
          (res) => {
            let data = res.json();
            this.clearForm();
            this._toast.success(`Se guradó la unidad de medida ${data.nombre}`, 'Unidad de Medida!');
            console.log(res.json())
          },
          (err) => {
            console.log(err.json())
          }
        );
    }else{
      this._toast.info('Todos los campos marcados con * son obligatorios', 'Campos obligatorios');
    }

  }

  clearForm(){
    this.name = '';
    this.description = '';
    this.code = '';
    this.equivalence = '';

  }

}
