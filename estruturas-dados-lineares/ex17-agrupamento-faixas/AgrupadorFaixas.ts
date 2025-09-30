/**
 * Classe que implementa agrupamento de valores em faixas
 */
export class AgrupadorFaixas {
    
    /**
     * Agrupa elementos da lista em k faixas dentro do intervalo [minValor, maxValor]
     * @param lista lista de elementos
     * @param k número de faixas
     * @param minValor valor mínimo do intervalo
     * @param maxValor valor máximo do intervalo
     * @returns array com contagem de elementos em cada faixa
     */
    public static agruparEmFaixas(lista: number[], k: number, minValor: number, maxValor: number): number[] {
        if (k <= 0 || minValor >= maxValor) {
            return [];
        }
        
        const resultado = new Array(k).fill(0);
        const tamanhoFaixa = (maxValor - minValor) / k;
        
        for (const elemento of lista) {
            // Ignora elementos fora do intervalo
            if (elemento < minValor || elemento > maxValor) {
                continue;
            }
            
            // Calcula qual faixa o elemento pertence
            let indiceFaixa = Math.floor((elemento - minValor) / tamanhoFaixa);
            
            // Elemento igual ao maxValor vai para a última faixa
            if (indiceFaixa >= k) {
                indiceFaixa = k - 1;
            }
            
            resultado[indiceFaixa]++;
        }
        
        return resultado;
    }
    
    /**
     * Retorna os limites de cada faixa
     * @param k número de faixas
     * @param minValor valor mínimo
     * @param maxValor valor máximo
     * @returns array com os limites [início, fim] de cada faixa
     */
    public static obterLimitesFaixas(k: number, minValor: number, maxValor: number): Array<[number, number]> {
        const limites: Array<[number, number]> = [];
        const tamanhoFaixa = (maxValor - minValor) / k;
        
        for (let i = 0; i < k; i++) {
            const inicio = minValor + i * tamanhoFaixa;
            const fim = i === k - 1 ? maxValor : inicio + tamanhoFaixa;
            limites.push([inicio, fim]);
        }
        
        return limites;
    }
}