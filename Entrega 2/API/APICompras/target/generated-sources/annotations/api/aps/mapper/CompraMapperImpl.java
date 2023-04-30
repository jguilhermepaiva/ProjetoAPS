package api.aps.mapper;

import api.aps.domain.Compra;
import api.aps.requests.CompraPostRequestBody;
import api.aps.requests.CompraPutRequestBody;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-24T21:47:34-0300",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.6 (Amazon.com Inc.)"
)
@Component
public class CompraMapperImpl extends CompraMapper {

    @Override
    public Compra toCompra(CompraPostRequestBody compraPostRequestBody) {
        if ( compraPostRequestBody == null ) {
            return null;
        }

        Compra.CompraBuilder compra = Compra.builder();

        compra.valorTotal( compraPostRequestBody.getValorTotal() );
        List<Long> list = compraPostRequestBody.getProdutos();
        if ( list != null ) {
            compra.produtos( new ArrayList<Long>( list ) );
        }

        compra.quantidade( compraPostRequestBody.getQuantidade() );

        return compra.build();
    }

    @Override
    public Compra toCompra(CompraPutRequestBody compraPutRequestBody) {
        if ( compraPutRequestBody == null ) {
            return null;
        }

        Compra.CompraBuilder compra = Compra.builder();

        compra.id( compraPutRequestBody.getId() );
        compra.valorTotal( compraPutRequestBody.getValorTotal() );
        compra.quantidade( compraPutRequestBody.getQuantidade() );
        List<Long> list = compraPutRequestBody.getProdutos();
        if ( list != null ) {
            compra.produtos( new ArrayList<Long>( list ) );
        }

        return compra.build();
    }
}
