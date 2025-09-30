/**
 * Classe que implementa sorteio sem reposição
 */
export class SorteadorSemReposicao {
    
    /**
     * Sorteia m elementos distintos da lista e os remove
     * @param lista lista original (será modificada)
     * @param m número de elementos a sortear
     * @returns nova lista com elementos sorteados (na ordem original)
     */
    public static sortearESubtrair(lista: number[], m: number): number[] {
        if (m < 0 || m > lista.length) {
            throw new Error(`m deve estar entre 0 e ${lista.length}`);
        }
        
        if (m === 0) {
            return [];
        }
        
        const sorteados: number[] = [];
        const indicesSorteados: number[] = [];
        
        // Sorteia m índices únicos
        while (indicesSorteados.length < m) {
            const indiceAleatorio = Math.floor(Math.random() * lista.length);
            if (!indicesSorteados.includes(indiceAleatorio)) {
                indicesSorteados.push(indiceAleatorio);
            }
        }
        
        // Ordena os índices para manter a ordem original dos elementos
        indicesSorteados.sort((a, b) => a - b);
        
        // Coleta os elementos sorteados
        for (const indice of indicesSorteados) {
            sorteados.push(lista[indice]);
        }
        
        // Remove os elementos da lista original (do fim para o início para não alterar índices)
        indicesSorteados.sort((a, b) => b - a);
        for (const indice of indicesSorteados) {
            lista.splice(indice, 1);
        }
        
        return sorteados;
    }
    
    /**
     * Versão que retorna elementos sorteados em ordem aleatória
     * @param lista lista original
     * @param m número de elementos
     * @returns elementos sorteados em ordem aleatória
     */
    public static sortearAleatorio(lista: number[], m: number): number[] {
        const copia = [...lista];
        const resultado = this.sortearESubtrair(copia, m);
        
        // Embaralha o resultado
        for (let i = resultado.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
        }
        
        return resultado;
    }
}