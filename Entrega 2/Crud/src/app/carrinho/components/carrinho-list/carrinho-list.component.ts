import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CarrinhoService } from 'app/carrinho/services/carrinho.service';
import { Page } from 'app/shared/model/page';
import { Produto } from 'app/shared/model/produto';
import { ProdutosSelecionadosService } from 'app/shared/services/produtos-selecionados.service';

@Component({
  selector: 'app-carrinho-list',
  templateUrl: './carrinho-list.component.html',
  styleUrls: ['./carrinho-list.component.scss']
})
export class CarrinhoListComponent{
  @Input() carrinho: { produto: Produto, quantidade: number }[]=[];
  @Output() remove = new EventEmitter(false);
  @Input() loggedIn: any;
  page: Page | undefined;


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  readonly displayedColumns = ['nome','valorVenda','qtdDisponivel','categoria','fornecedor','acoes'];

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ){

  }


  onRemove(produto: Produto){
    this.remove.emit(produto);
  }

  openSnackBar(aviso: string, recado: string) {
    this._snackBar.open(aviso, recado, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
