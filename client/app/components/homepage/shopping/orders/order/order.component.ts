import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.styl']
})
export class OrderComponent implements OnInit {

  arrayMaterial: Array<any>;
  bodyTable: any;

  constructor() {
    this.arrayMaterial = [];
  }

  ngOnInit() {
    this.bodyTable = document.getElementById('layout-body-order');
    //this.addRow();
  }

  addRow(){
    this.bodyTable.insertAdjacentHTML('beforeend',this.rowTemplate())
  }

  rowTemplate(){
    return "<div class='row-order'>" +
      "<div class='t-body raw-material' _ngcontent-awl-10=''>" +
        "<div class='input'>" +
          "<input type='text' placeholder='Materia Prima'>" +
        "</div>" +
      "</div>" +
      "<div class='t-body unit-measure' _ngcontent-awl-10=''>" +
        "<div class='input'>" +
          "<select name='unit' id=''>" +
            "<option value=''>Seleccione una unidad</option>" +
          "</select>" +
        "</div>" +
      "</div>" +
      "<div class='t-body quantity' _ngcontent-awl-10=''>" +
        "<div class='input'>" +
         "<input type='text' placeholder='Cantidad'>" +
        "</div>" +
      "</div>" +
      "<div class='t-body price' _ngcontent-awl-10=''>" +
       "<div class='input'>" +
          "<input type='text' placeholder='Valor Unit.'>" +
        "</div>" +
      "</div>" +
      "<div class='t-body actions' _ngcontent-awl-10=''>" +
        "<figure class='container-icons' (click)='addRow()'>" +
          "<img src='assets/images/icons/add_icon.png' alt=''>" +
       "</figure>" +
        "<figure class='container-icons' (click)='deleteRow()'>" +
          "<img src='assets/images/icons/delete_icon.png' alt=''>" +
        "</figure>" +
      "</div>" +
    "</div>";
  }
}
