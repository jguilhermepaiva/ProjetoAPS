package api.aps.mapper;

import api.aps.domain.Produto;
import api.aps.requests.ProdutoPostRequestBody;
import api.aps.requests.ProdutoPutRequestBody;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-16T14:32:30-0300",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.6 (Amazon.com Inc.)"
)
@Component
public class ProdutoMapperImpl extends ProdutoMapper {

    @Override
    public Produto toProduto(ProdutoPostRequestBody produtoPostRequestBody) {
        if ( produtoPostRequestBody == null ) {
            return null;
        }

        Produto.ProdutoBuilder produto = Produto.builder();

        produto.nome( produtoPostRequestBody.getNome() );
        produto.valorCompra( produtoPostRequestBody.getValorCompra() );
        produto.valorVenda( produtoPostRequestBody.getValorVenda() );
        produto.qtdDisponivel( produtoPostRequestBody.getQtdDisponivel() );
        produto.categoria( produtoPostRequestBody.getCategoria() );
        produto.fornecedor( produtoPostRequestBody.getFornecedor() );

        return produto.build();
    }

    @Override
    public Produto toProduto(ProdutoPutRequestBody produtoPutRequestBody) {
        if ( produtoPutRequestBody == null ) {
            return null;
        }

        Produto.ProdutoBuilder produto = Produto.builder();

        produto.id( produtoPutRequestBody.getId() );
        produto.nome( produtoPutRequestBody.getNome() );
        produto.valorCompra( produtoPutRequestBody.getValorCompra() );
        produto.valorVenda( produtoPutRequestBody.getValorVenda() );
        produto.qtdDisponivel( produtoPutRequestBody.getQtdDisponivel() );
        produto.categoria( produtoPutRequestBody.getCategoria() );
        produto.fornecedor( produtoPutRequestBody.getFornecedor() );

        return produto.build();
    }
}
