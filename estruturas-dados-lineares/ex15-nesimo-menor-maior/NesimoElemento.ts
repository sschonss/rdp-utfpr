/**
 * Classe que implementa busca do n-ésimo menor e maior elemento
 * 
 * Critério adotado: considera valores distintos apenas
 * Exemplo: para [5,2,8,2,7] e n=2:
 * - Valores distintos ordenados: [2,5,7,8]
 * - 2º menor: 5, 2º maior: 7
 */
export class NesimoElemento {
    
    /**
     * Encontra o n-ésimo menor valor da lista (considerando apenas valores distintos)
     * @param lista lista de elementos
     * @param n posição desejada (1-indexed)
     * @returns n-ésimo menor valor ou null se não existir
     */
    public static nEsimoMenor(lista: number[], n: number): number | null {
        if (lista.length === 0 || n <= 0) {
            return null;
        }
        
        // Remove duplicatas e ordena em ordem crescente
        const valoresUnicos = Array.from(new Set(lista)).sort((a, b) => a - b);
        
        // Verifica se n está dentro do range válido
        if (n > valoresUnicos.length) {
            return null;
        }
        
        return valoresUnicos[n - 1]; // Converte para 0-indexed
    }
    
    /**
     * Encontra o n-ésimo maior valor da lista (considerando apenas valores distintos)
     * @param lista lista de elementos
     * @param n posição desejada (1-indexed)
     * @returns n-ésimo maior valor ou null se não existir
     */
    public static nEsimoMaior(lista: number[], n: number): number | null {
        if (lista.length === 0 || n <= 0) {
            return null;
        }
        
        // Remove duplicatas e ordena em ordem decrescente
        const valoresUnicos = Array.from(new Set(lista)).sort((a, b) => b - a);
        
        // Verifica se n está dentro do range válido
        if (n > valoresUnicos.length) {
            return null;
        }
        
        return valoresUnicos[n - 1]; // Converte para 0-indexed
    }
    
    /**
     * Versão alternativa que considera duplicatas
     * Encontra o n-ésimo menor valor considerando repetições
     * @param lista lista de elementos
     * @param n posição desejada (1-indexed)
     * @returns n-ésimo menor valor ou null se não existir
     */
    public static nEsimoMenorComDuplicatas(lista: number[], n: number): number | null {
        if (lista.length === 0 || n <= 0 || n > lista.length) {
            return null;
        }
        
        // Ordena a lista mantendo duplicatas
        const listaOrdenada = [...lista].sort((a, b) => a - b);
        
        return listaOrdenada[n - 1]; // Converte para 0-indexed
    }
    
    /**
     * Versão alternativa que considera duplicatas
     * Encontra o n-ésimo maior valor considerando repetições
     * @param lista lista de elementos
     * @param n posição desejada (1-indexed)
     * @returns n-ésimo maior valor ou null se não existir
     */
    public static nEsimoMaiorComDuplicatas(lista: number[], n: number): number | null {
        if (lista.length === 0 || n <= 0 || n > lista.length) {
            return null;
        }
        
        // Ordena a lista em ordem decrescente mantendo duplicatas
        const listaOrdenada = [...lista].sort((a, b) => b - a);
        
        return listaOrdenada[n - 1]; // Converte para 0-indexed
    }
    
    /**
     * Retorna todos os valores únicos ordenados
     * @param lista lista de elementos
     * @returns array com valores únicos em ordem crescente
     */
    public static valoresUnicosOrdenados(lista: number[]): number[] {
        return Array.from(new Set(lista)).sort((a, b) => a - b);
    }
    
    /**
     * Encontra a mediana da lista
     * @param lista lista de elementos
     * @returns mediana ou null se lista vazia
     */
    public static mediana(lista: number[]): number | null {
        if (lista.length === 0) {
            return null;
        }
        
        const listaOrdenada = [...lista].sort((a, b) => a - b);
        const meio = Math.floor(listaOrdenada.length / 2);
        
        if (listaOrdenada.length % 2 === 0) {
            // Se par, retorna a média dos dois elementos centrais
            return (listaOrdenada[meio - 1] + listaOrdenada[meio]) / 2;
        } else {
            // Se ímpar, retorna o elemento central
            return listaOrdenada[meio];
        }
    }
    
    /**
     * Encontra os k menores elementos (valores únicos)
     * @param lista lista de elementos
     * @param k quantidade de elementos
     * @returns array com os k menores valores únicos
     */
    public static kMenores(lista: number[], k: number): number[] {
        if (k <= 0 || lista.length === 0) {
            return [];
        }
        
        const valoresUnicos = this.valoresUnicosOrdenados(lista);
        return valoresUnicos.slice(0, k);
    }
    
    /**
     * Encontra os k maiores elementos (valores únicos)
     * @param lista lista de elementos
     * @param k quantidade de elementos
     * @returns array com os k maiores valores únicos
     */
    public static kMaiores(lista: number[], k: number): number[] {
        if (k <= 0 || lista.length === 0) {
            return [];
        }
        
        const valoresUnicos = Array.from(new Set(lista)).sort((a, b) => b - a);
        return valoresUnicos.slice(0, k);
    }
}