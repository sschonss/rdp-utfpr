/**
 * Classe que implementa rotação circular de uma lista de inteiros
 */
export class ListaRotacionavel {
    private elementos: number[];

    constructor(elementos: number[] = []) {
        this.elementos = [...elementos];
    }

    /**
     * Rotaciona circularmente os elementos da lista
     * @param k número de posições para rotacionar
     *          k > 0: rotaciona para a direita
     *          k < 0: rotaciona para a esquerda
     *          k = 0 ou múltiplo do tamanho: lista permanece inalterada
     */
    public rotacionar(k: number): void {
        const tamanho = this.elementos.length;
        
        // Lista vazia ou com um elemento não precisa rotacionar
        if (tamanho <= 1) {
            return;
        }

        // Normaliza k para estar dentro do range [0, tamanho)
        // Isso trata casos onde |k| > tamanho
        k = k % tamanho;
        
        // Se k é 0, não há rotação
        if (k === 0) {
            return;
        }

        // Se k é negativo, converte para rotação equivalente à direita
        if (k < 0) {
            k = tamanho + k;
        }

        // Realiza a rotação usando três reversões
        // Para rotacionar k posições à direita:
        // 1. Inverte toda a lista
        // 2. Inverte os primeiros k elementos
        // 3. Inverte os elementos restantes

        this.reverterSegmento(0, tamanho - 1);
        this.reverterSegmento(0, k - 1);
        this.reverterSegmento(k, tamanho - 1);
    }

    /**
     * Reverte um segmento da lista entre os índices especificados
     * @param inicio índice inicial (inclusivo)
     * @param fim índice final (inclusivo)
     */
    private reverterSegmento(inicio: number, fim: number): void {
        while (inicio < fim) {
            const temp = this.elementos[inicio];
            this.elementos[inicio] = this.elementos[fim];
            this.elementos[fim] = temp;
            inicio++;
            fim--;
        }
    }

    /**
     * Adiciona um elemento ao final da lista
     * @param elemento elemento a ser adicionado
     */
    public adicionar(elemento: number): void {
        this.elementos.push(elemento);
    }

    /**
     * Define os elementos da lista
     * @param elementos novos elementos
     */
    public definirElementos(elementos: number[]): void {
        this.elementos = [...elementos];
    }

    /**
     * Retorna uma cópia dos elementos
     * @returns array com os elementos
     */
    public getElementos(): number[] {
        return [...this.elementos];
    }

    /**
     * Retorna o tamanho da lista
     * @returns número de elementos
     */
    public tamanho(): number {
        return this.elementos.length;
    }

    /**
     * Retorna representação em string da lista
     * @returns string representando a lista
     */
    public toString(): string {
        return `[${this.elementos.join(', ')}]`;
    }
}