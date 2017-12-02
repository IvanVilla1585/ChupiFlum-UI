import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import {ModalEditRawMaterialComponent} from "./modal-edit-raw-material.component";

@Injectable()
export class ModalEditRawMaterialService {

  private dialogRef: MatDialogRef<ModalEditRawMaterialComponent>;
  private configModal: any;

  constructor(private _mdDialog: MatDialog) {
    this.setConfigModal();
  }

  public openModal(title: string, data: any): Observable<boolean> {

    this.dialogRef = this._mdDialog.open(ModalEditRawMaterialComponent, this.configModal);
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
