import { AfterViewInit,ChangeDetectorRef,Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EstoqueService } from 'app/estoque/services/estoque.service';
import { Page } from 'app/shared/model/page';
import { Produto } from 'app/shared/model/produto';
import { ProdutoQuantidadeComponent } from '../produto-quantidade/produto-quantidade.component';
import { ProdutosSelecionadosService } from 'app/shared/services/produtos-selecionados.service';

@Component({
  selector: 'app-vitrine-list',
  templateUrl: './vitrine-list.component.html',
  styleUrls: ['./vitrine-list.component.scss']
})
export class VitrineListComponent implements OnInit,AfterViewInit {

  @Input() estoque: Produto[]=[];
  @Output() selectedProdutosChange = new EventEmitter<{ produto: Produto, quantidade: number }[]>();
  @Input() loggedIn: any;
  quantidade:number = 0;
  page: Page | undefined;
  @ViewChildren(ProdutoQuantidadeComponent) produtoQuantidades!: QueryList<ProdutoQuantidadeComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  readonly displayedColumns = ['nome','valorVenda','categoria','fornecedor','quantidade', 'acoes'];


  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private sharedService: ProdutosSelecionadosService,
    private estoqueService : EstoqueService
  ) {

  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.produtoQuantidades.forEach((pq: ProdutoQuantidadeComponent) => {
      pq.quantidadeChange.subscribe();
    });
  }

  addToCart() {
  const selectedProdutos: { produto: Produto, quantidade: number }[] = [];
  this.produtoQuantidades.forEach((pq: ProdutoQuantidadeComponent) => {
    if (pq.quantidade > 0) {
      const id = pq.produto.id;
      const quantidade = pq.quantidade;
      this.estoqueService.findById(id).subscribe(
        (data) => {
          if (data && parseInt(data.qtdDisponivel) >= quantidade) {
            selectedProdutos.push({ produto: pq.produto, quantidade });
          }
        }
      );
    }
  });
  setTimeout(() => {
    this.sharedService.setSelectedProdutos(selectedProdutos);
  }, 0);
}
  openSnackBar(aviso: string, recado: string) {
    this._snackBar.open(aviso, recado, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
