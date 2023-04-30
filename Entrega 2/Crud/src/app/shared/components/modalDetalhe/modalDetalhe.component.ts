
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Produto } from 'app/estoque/model/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EstoqueService } from 'app/estoque/services/estoque.service';

@Component({
  selector: 'app-modal-detalhe',
  templateUrl: './modalDetalhe.component.html',
  styleUrls: ['./modalDetalhe.component.scss']
})
export class ModalDetalheComponent implements OnInit {
  valor: string = '';
  produtos: Produto[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private service: EstoqueService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.valor = JSON.stringify(this.data.dataValue).slice(1, -1);
    this.getProdutos();
  }

  onCancel() {

  }

  private getProdutos() {
    const ids = this.data.compra.produtos;
    for (let id of ids) {
      this.service.findById(id).subscribe((produto) => {
        this.produtos.push(produto);
        console.log(this.produtos);
      });
    }
  }
}
export class DialogElementsExampleDialog {}
