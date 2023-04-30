import { Injectable } from '@angular/core';
import { Produto } from 'app/estoque/model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosSelecionadosService {

  selectedProdutos: { produto: Produto, quantidade: number }[] = [];

  setSelectedProdutos(produtos: { produto: Produto, quantidade: number }[]) {
    this.selectedProdutos = produtos;
  }

  getSelectedProdutos() {
    return this.selectedProdutos;
  }

  removeProduto(produto: Produto) {
    this.selectedProdutos = this.selectedProdutos.filter(p => p.produto.id !== produto.id);
  }
}
