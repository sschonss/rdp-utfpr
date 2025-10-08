/**
 * Exercício 24 - Compressão RLE (Run-Length Encoding)
 * 
 * Implemente compressão e descompressão RLE para listas de inteiros.
 * Formato: [valor, quantidade, valor, quantidade, ...]
 */
export class CompressaoRLE {
    
    public static comprimir(lista: number[]): number[] {
        if (lista.length === 0) return [];
        
        const resultado: number[] = [];
        let valorAtual = lista[0];
        let contador = 1;
        
        for (let i = 1; i < lista.length; i++) {
            if (lista[i] === valorAtual) {
                contador++;
            } else {
                resultado.push(valorAtual, contador);
                valorAtual = lista[i];
                contador = 1;
            }
        }
        
        resultado.push(valorAtual, contador);
        return resultado;
    }
    
    public static descomprimir(listaComprimida: number[]): number[] {
        if (listaComprimida.length % 2 !== 0) {
            throw new Error('Lista comprimida deve ter número par de elementos');
        }
        
        const resultado: number[] = [];
        
        for (let i = 0; i < listaComprimida.length; i += 2) {
            const valor = listaComprimida[i];
            const quantidade = listaComprimida[i + 1];
            
            for (let j = 0; j < quantidade; j++) {
                resultado.push(valor);
            }
        }
        
        return resultado;
    }
    
    public static calcularTaxaCompressao(original: number[], comprimida: number[]): number {
        if (original.length === 0) return 0;
        return (1 - comprimida.length / original.length) * 100;
    }
}