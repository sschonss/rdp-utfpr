import { CompressaoRLE } from './CompressaoRLE';

console.log('=== EXERCÍCIO 24 - COMPRESSÃO RLE ===\n');

const testes = [
    [1, 1, 1, 2, 2, 3, 3, 3, 3],
    [5, 5, 5, 5, 5],
    [1, 2, 3, 4, 5],
    [7, 7, 3, 3, 3, 1, 1, 1, 1, 1]
];

testes.forEach((lista, i) => {
    console.log(`Teste ${i + 1}:`);
    console.log(`Original: [${lista.join(', ')}]`);
    
    const comprimida = CompressaoRLE.comprimir(lista);
    console.log(`Comprimida: [${comprimida.join(', ')}]`);
    
    const descomprimida = CompressaoRLE.descomprimir(comprimida);
    console.log(`Descomprimida: [${descomprimida.join(', ')}]`);
    
    const taxa = CompressaoRLE.calcularTaxaCompressao(lista, comprimida);
    console.log(`Taxa de compressão: ${taxa.toFixed(1)}%`);
    console.log(`Válida: ${JSON.stringify(lista) === JSON.stringify(descomprimida)}\n`);
});