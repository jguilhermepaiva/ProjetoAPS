import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ComprasService } from 'app/compras/services/compras.service';
import { Compra } from 'app/shared/model/compra';
import { Page } from 'app/shared/model/page';
import { Produto } from 'app/shared/model/produto';
import { ProdutosSelecionadosService } from 'app/shared/services/produtos-selecionados.service';

@Component({
  selector: 'app-compras-list',
  templateUrl: './compras-list.component.html',
  styleUrls: ['./compras-list.component.scss']
})
export class ComprasListComponent {
  @Input() compras: Compra[]=[];
  @Output() add = new EventEmitter(false);
  @Output() detail = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);
  @Input() loggedIn: any;
  page: Page | undefined;


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  readonly displayedColumns = ['valorTotal','quantidade','acoes'];

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,


  ){

  }


  onDetail(compra: Compra){
    this.detail.emit(compra);
  }


  openSnackBar(aviso: string, recado: string) {
    this._snackBar.open(aviso, recado, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
