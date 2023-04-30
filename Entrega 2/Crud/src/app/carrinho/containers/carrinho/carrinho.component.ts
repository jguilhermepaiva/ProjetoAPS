
import { CarrinhoService } from '../../services/carrinho.service';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatSnackBar,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
  import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { catchError, Observable, of, first, BehaviorSubject, from, forkJoin } from 'rxjs';;
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'app/shared/model/page';


import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PopupComponent } from 'app/shared/components/popup/popup.component';
import { Produto } from 'app/shared/model/produto';
import { ModalComponent } from 'app/estoque/containers/modal/modal.component';
import { ProdutosSelecionadosService } from 'app/shared/services/produtos-selecionados.service';
import { EstoqueService } from 'app/estoque/services/estoque.service';
import { ComprasService } from 'app/compras/services/compras.service';
import { Compra } from 'app/shared/model/compra';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit{
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  lowValue: number = 0;
  highValue: number = 10;
  length : number = 0;
  selectedProdutos: { produto: Produto, quantidade: number }[] = [];
  private carrinhoSubject = new BehaviorSubject<{ produto: Produto, quantidade: number }[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();
  qrCodeImageUrl?: string;
  page: Page | undefined;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor (private carrinhoService : CarrinhoService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private estoqueService : EstoqueService,
    private sharedService : ProdutosSelecionadosService,
    private comprasService : ComprasService,
    private cdr: ChangeDetectorRef
    ){
    this.carrinho$ = this.carrinhoService.list(this.highValue,this.lowValue)
    .pipe(
      map(page => {
        this.page = page;
        if(page==null){
          catchError(error =>{
            this.openSnackBar('Erro ao carregar os produtos', 'Entendido');
            return of([]);
          })
        } this.length=page.totalElements;

        return page.content;
      })
    );

      this.carrinho$.subscribe(result => {if(result.length==0){
      this.openSnackBar('Não há produtos catalogados', 'Entendido');
    }});
  }

  ngOnInit() {
    this.selectedProdutos = this.sharedService.getSelectedProdutos();

    this.carrinho$ = of(this.selectedProdutos).pipe(
      switchMap(produtos =>
        Promise.all(
          produtos.map(p =>
            this.estoqueService.findById(p.produto.id).pipe(
              map(produto => ({
                produto,
                quantidade: Math.min(p.quantidade, parseInt(produto.qtdDisponivel)),
              }))
            )
          )
        )
      ),
      mergeMap(produtos => forkJoin(produtos)),
      map(produtos =>
        produtos.filter(p => p.produto !== null && p.quantidade > 0).map(p => ({
          produto: p.produto!,
          quantidade: p.quantidade,
        }))
      )
    );
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

  realizarCompra(){
    const dialogRef = this.dialog.open(PopupComponent,{
      data: {
        mostrar: true,
      }
    });

    dialogRef.componentInstance.cepSelected.subscribe((cep: string) => {
      const cepData = this.handleCepSelected(cep);
      dialogRef.close({event:'enviar'});

      const selectedProdutos = this.sharedService.getSelectedProdutos();
      const produtosIds = selectedProdutos.map(p => p.produto.id);
      const quantidade = selectedProdutos.reduce((total, p) => total + p.quantidade, 0).toString();
      const valorTotal = selectedProdutos.reduce((total, p) => {
        const preco = p.produto.valorVenda.replace(/[^0-9,]/g, '').replace(',', '.');
        return total + p.quantidade * parseFloat(preco);
      }, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });



      const compra: Compra = {
        id: 0,
        quantidade: quantidade,
        valorTotal: valorTotal,
        produtos: produtosIds
      };


      this.comprasService.cep(cepData).subscribe(
        data => {
          if (data.cep != null) {
            this.comprasService.save(compra).subscribe(
              data => {
                this._snackBar.open('Pagamento enviado com sucesso! Atualizando Db...', '', {duration: 5000});
              },
              error => {
                this._snackBar.open("Não conseguiu salvar a compra", "Entendido");
              }
            );
          } else {
            this._snackBar.open("Cep inválido! Seu pagamento não foi enviado.", "Entendido");
          }
        },
        error => {
          this._snackBar.open("Não conseguiu enviar o pagamento", "Entendido");
        }
      );

    });
  }

  handleCepSelected(cep: string) {
    return cep;
  }

  onRemove(produto: Produto) {
    this.sharedService.removeProduto(produto);
    this.reload();
  }


  reload(){
    this.selectedProdutos = this.sharedService.getSelectedProdutos();
    if(this.selectedProdutos.length == 0) {
      this.openSnackBar('Não há produtos selecionados', 'Entendido');
    }
    this.carrinho$ = of(this.selectedProdutos).pipe(
      switchMap(produtos =>
        Promise.all(
          produtos.map(p =>
            this.estoqueService.findById(p.produto.id).pipe(
              map(produto => ({
                produto,
                quantidade: Math.min(p.quantidade, parseInt(produto.qtdDisponivel)),
              }))
            )
          )
        )
      ),
      mergeMap(produtos => forkJoin(produtos)),
      map(produtos =>
        produtos.filter(p => p.produto !== null && p.quantidade > 0).map(p => ({
          produto: p.produto!,
          quantidade: p.quantidade,
        }))
      )
    );
    this.carrinho$.subscribe(result => {
      if (result.length == 0) {
        this.openSnackBar('Não há produtos catalogados', 'Entendido');
      }
    });
  }

}
