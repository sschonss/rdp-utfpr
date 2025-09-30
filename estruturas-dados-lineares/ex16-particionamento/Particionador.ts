/**
 * Classe que implementa particionamento estilo quicksort
 * Estratégia: particionamento estável (mantém ordem relativa)
 */
export class Particionador {
    
    /**
     * Particiona a lista organizando elementos em relação ao pivô
     * @param lista lista a ser particionada
     * @param pivo valor de referência para particionamento
     * @returns nova lista com menores + iguais + maiores que o pivô
     */
    public static particionar(lista: number[], pivo: number): number[] {
        const menores: number[] = [];
        const iguais: number[] = [];
        const maiores: number[] = [];
        
        for (const elemento of lista) {
            if (elemento < pivo) {
                menores.push(elemento);
            } else if (elemento === pivo) {
                iguais.push(elemento);
            } else {
                maiores.push(elemento);
            }
        }
        
        return [...menores, ...iguais, ...maiores];
    }
    
    /**
     * Versão in-place (modifica a lista original)
     * @param lista lista a ser particionada
     * @param pivo valor de referência
     * @returns índice onde termina a seção dos elementos menores que o pivô
     */
    public static particionarInPlace(lista: number[], pivo: number): number {
        let i = 0; // Ponteiro para próxima posição de elemento menor
        
        // Primeira passada: move elementos menores para o início
        for (let j = 0; j < lista.length; j++) {
            if (lista[j] < pivo) {
                [lista[i], lista[j]] = [lista[j], lista[i]];
                i++;
            }
        }
        
        // Segunda passada: move elementos iguais ao pivô
        let k = i; // Início da seção de iguais
        for (let j = i; j < lista.length; j++) {
            if (lista[j] === pivo) {
                [lista[k], lista[j]] = [lista[j], lista[k]];
                k++;
            }
        }
        
        return i; // Retorna onde termina a seção dos menores
    }
    
    /**
     * Particionamento com múltiplos pivôs
     * @param lista lista a ser particionada
     * @param pivos array de valores pivô
     * @returns lista particionada por todos os pivôs
     */
    public static particionarMultiplo(lista: number[], pivos: number[]): number[] {
        const pivosOrdenados = [...pivos].sort((a, b) => a - b);
        let resultado = [...lista];
        
        for (const pivo of pivosOrdenados) {
            resultado = this.particionar(resultado, pivo);
        }
        
        return resultado;
    }
}