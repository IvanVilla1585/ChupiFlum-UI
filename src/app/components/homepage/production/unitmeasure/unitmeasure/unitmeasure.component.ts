import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { UnitmeasureService } from '../../../../../services/production/unitmeasure/unitmeasure.service';
import { ShowFeedback } from '../../../../../libs/showFeedback';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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

  constructor(private _unitmeasureService: UnitmeasureService, private _toast: ToastsManager, private _container: ViewContainerRef) {
    this.name = '';
    this.description = '';
    this.code = '';
    this.equivalence = '';
    this._toast.setRootViewContainerRef(_container);
  }

  ngOnInit() {
  }

  save(){
    debugger
    if (this.name && this.code && this.equivalence){
      let newUnit = {
        nombre: this.name,
        descripcion: this.description,
        code: this.code,
        equivalencia: this.equivalence
      };

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
