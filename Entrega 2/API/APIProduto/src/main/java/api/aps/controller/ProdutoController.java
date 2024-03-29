package api.aps.controller;

import api.aps.domain.Produto;
import api.aps.facade.ProdutoFacade;
import api.aps.requests.ProdutoPostRequestBody;
import api.aps.requests.ProdutoPutRequestBody;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("apiProdutos/produtos")
@CrossOrigin(origins = "http://localhost:4200")
@Log4j2
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoFacade produtoFacade;

    @GetMapping
    public ResponseEntity<Page<Produto>> list(Pageable pageable) throws InterruptedException {
        return ResponseEntity.ok(produtoFacade.listAll(pageable));
    }

    @GetMapping(path= "/findByQtdDisponivel")
    public ResponseEntity<Page<Produto>> findByQtdDisponivel() throws InterruptedException {
        final Page<Produto> page = new PageImpl<>(produtoFacade.findByQtdDisponivel("0"));
        return ResponseEntity.ok(page);
    }

    @GetMapping(path= "/findFornecedorDistinctByQtdDisponivel")
    public ResponseEntity<Page<String>> findDistinctByQtdDisponivel() throws InterruptedException {
        final Page<String> page = new PageImpl<>(produtoFacade.findDistinctByQtdDisponivel("0"));
        return ResponseEntity.ok(page);
    }

    @GetMapping(path= "/{id}")
    public ResponseEntity<Produto> findById(@PathVariable Long id) throws InterruptedException {
        return ResponseEntity.ok(produtoFacade.findByIdOrThrowBadRequestException(id));
    }

    @GetMapping(path= "/findCategoria")
    public ResponseEntity<Page<Produto>> findByCategoria( @RequestParam (required = false) String categoria) throws InterruptedException {
        final Page<Produto> page = new PageImpl<>(produtoFacade.findByCategoria(categoria));
        return ResponseEntity.ok(page);
    }

    @GetMapping(path= "/findCategoriaAsc")
    public ResponseEntity<Page<Object>> findByOrderByCategoriaAsc() throws InterruptedException {
        final Page<Object> page = new PageImpl<>(produtoFacade.findByOrderByCategoriaAsc());
        return ResponseEntity.ok(page);
    }

    @GetMapping(path= "/findFornecedor")
    public ResponseEntity<Page<Produto>> findByFornecedor( @RequestParam (required = false) String fornecedor) throws InterruptedException {
        final Page<Produto> page = new PageImpl<>(produtoFacade. findByFornecedor(fornecedor));
       return ResponseEntity.ok( page );
    }

    @GetMapping(path= "/findFornecedorAsc")
    public ResponseEntity<Page<Produto>> findByOrderByFornecedorAsc() throws InterruptedException {
        final Page<Produto> page = new PageImpl<>(produtoFacade.findByOrderByFornecedorAsc());
        return ResponseEntity.ok(page);
    }

    @PostMapping
    public ResponseEntity<Produto> save(@RequestBody @Valid ProdutoPostRequestBody produtoPostRequestBody){
       return new ResponseEntity<>(produtoFacade.save(produtoPostRequestBody), HttpStatus.CREATED);
    }

    @DeleteMapping(path= "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        produtoFacade.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody @Valid ProdutoPutRequestBody produtoPutRequestBody) {
        produtoFacade.replace(produtoPutRequestBody);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
