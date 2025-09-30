/**
 * Classe que gera uma lista de n elementos inteiros aleatórios
 */
export class ListaAleatoria {
    private elementos: number[];

    constructor(n: number) {
        this.elementos = [];
        this.gerarElementosAleatorios(n);
    }

    /**
     * Gera n elementos inteiros aleatórios
     * @param n quantidade de elementos a gerar
     */
    private gerarElementosAleatorios(n: number): void {
        for (let i = 0; i < n; i++) {
            // Gera números aleatórios entre -100 e 100
            const numeroAleatorio = Math.floor(Math.random() * 201) - 100;
            this.elementos.push(numeroAleatorio);
        }
    }

    /**
     * Retorna representação em texto da lista
     * @returns string representando a lista
     */
    public toString(): string {
        return `[${this.elementos.join(', ')}]`;
    }

    /**
     * Getter para acessar os elementos da lista
     * @returns array com os elementos
     */
    public getElementos(): number[] {
        return [...this.elementos]; // Retorna uma cópia para proteger o estado interno
    }

    /**
     * Retorna o tamanho da lista
     * @returns número de elementos na lista
     */
    public tamanho(): number {
        return this.elementos.length;
    }
}