import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import {ModalEditMachineComponent} from "./modal-edit-machine.component";

@Injectable()
export class ModalEditMachineService {

  private dialogRef: MatDialogRef<ModalEditMachineComponent>;
  private configModal: any;

  constructor(private _mdDialog: MatDialog) {
    this.setConfigModal();
  }

  public openModal(title: string, data: any): Observable<boolean> {

    this.dialogRef = this._mdDialog.open(ModalEditMachineComponent, this.configModal);
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.data = data;
    this.dialogRef.componentInstance.dialogRef = this.dialogRef;

    return this.dialogRef.afterClosed();
  }

  setConfigModal(){
    this.configModal = {
      disableClose: false,
      width: '550px',
      height: '',
      position: {
        top: '40px'
      }
    };
  }
}
