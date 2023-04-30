import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from 'app/compras/services/compras.service';
import { ModalDetalheComponent } from 'app/shared/components/modalDetalhe/modalDetalhe.component';
import { PopupComponent } from 'app/shared/components/popup/popup.component';
import { Compra } from 'app/shared/model/compra';
import { Page } from 'app/shared/model/page';
import { Produto } from 'app/shared/model/produto';
import { Observable, catchError, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  lowValue: number = 0;
  highValue: number = 10;
  length : number = 0;

  compras$: Observable<Compra[]>;
  page: Page | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor (
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private comprasService : ComprasService
    ){
      this.compras$ = this.comprasService.list(this.highValue, this.lowValue)
    .pipe(
      map(page => {
        this.page = page;
        if (!page) {
          catchError(error => {
            this.openSnackBar('Erro ao carregar as compras', 'Entendido');
            console.log(error);
            return of([]);
          });
        } else {
          this.length = page.totalElements;
        }
        return page ? page.content : [];
      })
    );

      this.compras$.subscribe(result => {if(result.length==0){
      this.openSnackBar('Não há compras catalogados', 'Entendido');
    }});
  }

  openSnackBar(aviso: string, recado: string) {
    this._snackBar.open(aviso, recado, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  public getPaginatorData(event: PageEvent): PageEvent {

    this.lowValue = event.pageIndex ;
    this.highValue =  event.pageSize;
    this.reload();
    return event;
  }
  ngOnInit(): void {

  }

  onDetail(compra:Compra){

    this.dialog.open(ModalDetalheComponent,{
      data: {
        route: this.route,
        dataValue: "Detalhes da compra",
        compra: compra,
      }});

  }
  reload(){
    this.compras$ = this.comprasService.list(this.highValue,this.lowValue)
    .pipe(
      map(page => {
        this.page = page;
        if(page==null){
          catchError(error =>{
            this.openSnackBar('Erro ao carregar os produtos', 'Entendido');
            console.log(error);
            return of([]);
          })
        } this.length=page.totalElements;

        return page.content;
      })
    );
  }

}
