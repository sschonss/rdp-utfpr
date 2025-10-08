/**
 * Exercício 21 - Merge Sort Adaptado
 * 
 * Implemente uma classe OrdenadorMerge que contenha uma lista de inteiros e métodos para:
 * 1. Ordenar a lista usando merge sort
 * 2. Detectar se a lista já está ordenada (para otimização)
 * 3. Contar o número de inversões durante a ordenação
 * 4. Manter histórico das operações de merge
 * 
 * O algoritmo deve ser estável (manter ordem relativa de elementos iguais) e
 * otimizado para listas pequenas (usar insertion sort para sublistas <= 10 elementos).
 */
export class OrdenadorMerge {
    private elementos: number[];
    private comparacoes: number;
    private movimentacoes: number;
    private inversoes: number;
    private historicoMerges: string[];

    constructor(elementos: number[] = []) {
        this.elementos = [...elementos];
        this.comparacoes = 0;
        this.movimentacoes = 0;
        this.inversoes = 0;
        this.historicoMerges = [];
    }

    /**
     * Ordena a lista usando merge sort otimizado
     * @returns lista ordenada
     */
    public ordenar(): number[] {
        this.resetarEstatisticas();
        
        if (this.elementos.length <= 1) {
            return [...this.elementos];
        }

        // Verifica se já está ordenada
        if (this.estaOrdenada()) {
            this.historicoMerges.push('Lista já estava ordenada - otimização aplicada');
            return [...this.elementos];
        }

        const resultado = this.mergeSort([...this.elementos], 0, this.elementos.length - 1);
        this.elementos = resultado;
        return resultado;
    }

    /**
     * Implementação recursiva do merge sort
     * @param arr array a ser ordenado
     * @param inicio índice inicial
     * @param fim índice final
     * @returns array ordenado
     */
    private mergeSort(arr: number[], inicio: number, fim: number): number[] {
        if (inicio >= fim) {
            return [arr[inicio]].filter(x => x !== undefined);
        }

        // Otimização: usar insertion sort para sublistas pequenas
        if (fim - inicio <= 10) {
            return this.insertionSort(arr, inicio, fim);
        }

        const meio = Math.floor((inicio + fim) / 2);
        
        const esquerda = this.mergeSort(arr, inicio, meio);
        const direita = this.mergeSort(arr, meio + 1, fim);
        
        return this.merge(esquerda, direita, inicio, fim);
    }

    /**
     * Combina duas sublistas ordenadas
     * @param esquerda sublista esquerda
     * @param direita sublista direita
     * @param inicio índice inicial original
     * @param fim índice final original
     * @returns lista mesclada e ordenada
     */
    private merge(esquerda: number[], direita: number[], inicio: number, fim: number): number[] {
        const resultado: number[] = [];
        let i = 0, j = 0;

        this.historicoMerges.push(
            `Merge [${inicio}-${fim}]: [${esquerda.join(',')}] + [${direita.join(',')}]`
        );

        while (i < esquerda.length && j < direita.length) {
            this.comparacoes++;
            
            if (esquerda[i] <= direita[j]) {
                resultado.push(esquerda[i]);
                i++;
            } else {
                resultado.push(direita[j]);
                j++;
                // Conta inversões: todos os elementos restantes na esquerda são maiores
                this.inversoes += esquerda.length - i;
            }
            this.movimentacoes++;
        }

        // Adiciona elementos restantes
        while (i < esquerda.length) {
            resultado.push(esquerda[i]);
            i++;
            this.movimentacoes++;
        }

        while (j < direita.length) {
            resultado.push(direita[j]);
            j++;
            this.movimentacoes++;
        }

        return resultado;
    }

    /**
     * Insertion sort para sublistas pequenas
     * @param arr array
     * @param inicio índice inicial
     * @param fim índice final
     * @returns sublista ordenada
     */
    private insertionSort(arr: number[], inicio: number, fim: number): number[] {
        const sublista = arr.slice(inicio, fim + 1);
        
        for (let i = 1; i < sublista.length; i++) {
            const chave = sublista[i];
            let j = i - 1;
            
            while (j >= 0 && sublista[j] > chave) {
                this.comparacoes++;
                sublista[j + 1] = sublista[j];
                this.movimentacoes++;
                j--;
            }
            if (j >= 0) this.comparacoes++; // Comparação que falhou
            
            sublista[j + 1] = chave;
            this.movimentacoes++;
        }

        this.historicoMerges.push(
            `Insertion sort [${inicio}-${fim}]: [${sublista.join(',')}]`
        );

        return sublista;
    }

    /**
     * Verifica se a lista já está ordenada
     * @returns true se ordenada, false caso contrário
     */
    private estaOrdenada(): boolean {
        for (let i = 1; i < this.elementos.length; i++) {
            if (this.elementos[i] < this.elementos[i - 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Reseta as estatísticas
     */
    private resetarEstatisticas(): void {
        this.comparacoes = 0;
        this.movimentacoes = 0;
        this.inversoes = 0;
        this.historicoMerges = [];
    }

    /**
     * Retorna estatísticas da última ordenação
     */
    public obterEstatisticas(): {
        comparacoes: number;
        movimentacoes: number;
        inversoes: number;
        operacoesMerge: number;
    } {
        return {
            comparacoes: this.comparacoes,
            movimentacoes: this.movimentacoes,
            inversoes: this.inversoes,
            operacoesMerge: this.historicoMerges.length
        };
    }

    /**
     * Retorna o histórico de operações merge
     */
    public obterHistoricoMerges(): string[] {
        return [...this.historicoMerges];
    }

    /**
     * Define novos elementos
     */
    public definirElementos(elementos: number[]): void {
        this.elementos = [...elementos];
    }

    /**
     * Retorna os elementos atuais
     */
    public getElementos(): number[] {
        return [...this.elementos];
    }

    /**
     * Retorna representação em string
     */
    public toString(): string {
        return `[${this.elementos.join(', ')}]`;
    }
}