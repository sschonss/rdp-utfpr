/**
 * Classe que implementa operações de interseção e união de listas de inteiros
 * 
 * Regras implementadas:
 * - Interseção: Se um valor aparece r vezes em 'a' e s vezes em 'b', 
 *   aparecerá min(r, s) vezes na interseção
 * - União: Contém todos os elementos que aparecem em 'a' ou 'b',
 *   com frequência igual à soma das aparições em ambas as listas
 * - Ordem: Elementos de 'a' primeiro, depois elementos de 'b' não contidos em 'a'
 */
export class OperacoesLista {
    
    /**
     * Calcula a interseção de duas listas
     * @param a primeira lista
     * @param b segunda lista
     * @returns nova lista com elementos comuns
     */
    public static intersecao(a: number[], b: number[]): number[] {
        const resultado: number[] = [];
        const frequenciaA = this.contarFrequencias(a);
        const frequenciaB = this.contarFrequencias(b);
        
        // Para cada elemento único em A
        for (const [elemento, freqA] of frequenciaA.entries()) {
            const freqB = frequenciaB.get(elemento) || 0;
            
            // Se o elemento também está em B
            if (freqB > 0) {
                // Adiciona min(freqA, freqB) vezes
                const quantidadeNaIntersecao = Math.min(freqA, freqB);
                for (let i = 0; i < quantidadeNaIntersecao; i++) {
                    resultado.push(elemento);
                }
            }
        }
        
        return resultado;
    }
    
    /**
     * Calcula a união de duas listas
     * @param a primeira lista
     * @param b segunda lista
     * @returns nova lista com todos os elementos
     */
    public static uniao(a: number[], b: number[]): number[] {
        const resultado: number[] = [];
        const frequenciaA = this.contarFrequencias(a);
        const frequenciaB = this.contarFrequencias(b);
        const elementosProcessados = new Set<number>();
        
        // Adiciona elementos de A primeiro
        for (const [elemento, freqA] of frequenciaA.entries()) {
            const freqB = frequenciaB.get(elemento) || 0;
            const totalFrequencia = freqA + freqB;
            
            for (let i = 0; i < totalFrequencia; i++) {
                resultado.push(elemento);
            }
            
            elementosProcessados.add(elemento);
        }
        
        // Adiciona elementos de B que não estão em A
        for (const [elemento, freqB] of frequenciaB.entries()) {
            if (!elementosProcessados.has(elemento)) {
                for (let i = 0; i < freqB; i++) {
                    resultado.push(elemento);
                }
            }
        }
        
        return resultado;
    }
    
    /**
     * Conta a frequência de cada elemento na lista
     * @param lista lista de elementos
     * @returns mapa com elemento -> frequência
     */
    private static contarFrequencias(lista: number[]): Map<number, number> {
        const frequencias = new Map<number, number>();
        
        for (const elemento of lista) {
            const freq = frequencias.get(elemento) || 0;
            frequencias.set(elemento, freq + 1);
        }
        
        return frequencias;
    }
    
    /**
     * Versão alternativa da interseção que preserva a ordem original
     * @param a primeira lista
     * @param b segunda lista
     * @returns nova lista com elementos comuns na ordem de 'a'
     */
    public static intersecaoOrdemPreservada(a: number[], b: number[]): number[] {
        const resultado: number[] = [];
        const frequenciaB = this.contarFrequencias(b);
        const usadosDeB = new Map<number, number>();
        
        for (const elemento of a) {
            const freqB = frequenciaB.get(elemento) || 0;
            const jaUsados = usadosDeB.get(elemento) || 0;
            
            // Se ainda há elementos desse tipo em B para usar
            if (jaUsados < freqB) {
                resultado.push(elemento);
                usadosDeB.set(elemento, jaUsados + 1);
            }
        }
        
        return resultado;
    }
    
    /**
     * Versão alternativa da união que remove duplicatas
     * @param a primeira lista
     * @param b segunda lista
     * @returns nova lista com elementos únicos
     */
    public static uniaoSemDuplicatas(a: number[], b: number[]): number[] {
        const resultado: number[] = [];
        const vistos = new Set<number>();
        
        // Adiciona elementos de A
        for (const elemento of a) {
            if (!vistos.has(elemento)) {
                resultado.push(elemento);
                vistos.add(elemento);
            }
        }
        
        // Adiciona elementos de B que não estão em A
        for (const elemento of b) {
            if (!vistos.has(elemento)) {
                resultado.push(elemento);
                vistos.add(elemento);
            }
        }
        
        return resultado;
    }
}