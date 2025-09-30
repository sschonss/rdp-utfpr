/**
 * Classe que implementa substituição condicional de valores em uma lista
 */
export class ListaSubstituivel {
    private elementos: number[];

    constructor(elementos: number[] = []) {
        this.elementos = [...elementos];
    }

    /**
     * Substitui todas as ocorrências de um valor por um novo valor
     * @param alvo valor a ser substituído
     * @param novoValor valor que substituirá o alvo
     */
    public substituir(alvo: number, novoValor: number): void {
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] === alvo) {
                this.elementos[i] = novoValor;
            }
        }
    }

    /**
     * Substitui a primeira ocorrência de um valor
     * @param alvo valor a ser substituído
     * @param novoValor valor que substituirá o alvo
     * @returns true se houve substituição, false se o alvo não foi encontrado
     */
    public substituirPrimeiro(alvo: number, novoValor: number): boolean {
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] === alvo) {
                this.elementos[i] = novoValor;
                return true;
            }
        }
        return false;
    }

    /**
     * Substitui a última ocorrência de um valor
     * @param alvo valor a ser substituído
     * @param novoValor valor que substituirá o alvo
     * @returns true se houve substituição, false se o alvo não foi encontrado
     */
    public substituirUltimo(alvo: number, novoValor: number): boolean {
        for (let i = this.elementos.length - 1; i >= 0; i--) {
            if (this.elementos[i] === alvo) {
                this.elementos[i] = novoValor;
                return true;
            }
        }
        return false;
    }

    /**
     * Substitui n ocorrências de um valor
     * @param alvo valor a ser substituído
     * @param novoValor valor que substituirá o alvo
     * @param n número máximo de substituições
     * @returns número de substituições realizadas
     */
    public substituirN(alvo: number, novoValor: number, n: number): number {
        let substituicoes = 0;
        
        for (let i = 0; i < this.elementos.length && substituicoes < n; i++) {
            if (this.elementos[i] === alvo) {
                this.elementos[i] = novoValor;
                substituicoes++;
            }
        }
        
        return substituicoes;
    }

    /**
     * Conta quantas vezes um valor aparece na lista
     * @param valor valor a ser contado
     * @returns número de ocorrências
     */
    public contarOcorrencias(valor: number): number {
        let contador = 0;
        for (const elemento of this.elementos) {
            if (elemento === valor) {
                contador++;
            }
        }
        return contador;
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