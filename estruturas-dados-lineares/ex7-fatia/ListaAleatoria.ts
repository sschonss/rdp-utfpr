/**
 * Classe que gera uma lista de n elementos inteiros aleatórios
 * e implementa operações de manipulação da lista
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
     * Remove da lista todos os números menores que o valor especificado
     * @param valorCorte valor de referência para remoção
     */
    public removerMenoresQue(valorCorte: number): void {
        const novaLista: number[] = [];
        
        for (let i = 0; i < this.elementos.length; i++) {
            if (this.elementos[i] >= valorCorte) {
                novaLista.push(this.elementos[i]);
            }
        }
        
        this.elementos = novaLista;
    }

    /**
     * Remove elementos que estão em posições múltiplas do número fornecido
     * @param numero número para calcular os múltiplos das posições
     */
    public removeMultiplos(numero: number): void {
        // Se o número for zero, a lista permanece inalterada
        if (numero === 0) {
            return;
        }

        const novaLista: number[] = [];
        
        for (let i = 0; i < this.elementos.length; i++) {
            const posicao = i + 1; // Posição 1-indexed
            
            // Se a posição não é múltipla do número, mantém o elemento
            if (posicao % numero !== 0) {
                novaLista.push(this.elementos[i]);
            }
        }
        
        this.elementos = novaLista;
    }

    /**
     * Retorna o número mais próximo da média dos elementos
     * Em caso de empate, retorna o primeiro encontrado
     * @returns número mais próximo da média ou null se lista vazia
     */
    public maisProximoDaMedia(): number | null {
        if (this.elementos.length === 0) {
            return null;
        }

        // Calcular a média
        let soma = 0;
        for (let i = 0; i < this.elementos.length; i++) {
            soma += this.elementos[i];
        }
        const media = soma / this.elementos.length;

        // Encontrar o elemento mais próximo da média
        let elementoMaisProximo = this.elementos[0];
        let menorDistancia = Math.abs(this.elementos[0] - media);

        for (let i = 1; i < this.elementos.length; i++) {
            const distancia = Math.abs(this.elementos[i] - media);
            
            // Se encontrou uma distância menor, atualiza
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                elementoMaisProximo = this.elementos[i];
            }
        }

        return elementoMaisProximo;
    }

    /**
     * Reduz a lista a n elementos
     * @param n quantidade de elementos para manter na lista
     */
    public reduz(n: number): void {
        // Se n for negativo, trata como 0
        if (n < 0) {
            n = 0;
        }

        // Se n é maior ou igual ao tamanho atual, não faz nada
        if (n >= this.elementos.length) {
            return;
        }

        // Criar nova lista com apenas os primeiros n elementos
        const novaLista: number[] = [];
        for (let i = 0; i < n; i++) {
            novaLista.push(this.elementos[i]);
        }

        this.elementos = novaLista;
    }

    /**
     * Altera a lista para conter apenas uma fatia de inicio a fim (inclusive)
     * @param inicio índice inicial da fatia (0-indexed)
     * @param fim índice final da fatia (0-indexed, inclusive)
     */
    public fatia(inicio: number, fim: number): void {
        // Validar parâmetros
        if (inicio < 0) {
            inicio = 0;
        }
        if (fim >= this.elementos.length) {
            fim = this.elementos.length - 1;
        }
        if (inicio > fim) {
            // Se inicio > fim, lista fica vazia
            this.elementos = [];
            return;
        }

        // Criar nova lista com elementos da fatia
        const novaLista: number[] = [];
        for (let i = inicio; i <= fim; i++) {
            novaLista.push(this.elementos[i]);
        }

        this.elementos = novaLista;
    }

    /**
     * Calcula e retorna a média dos elementos
     * @returns média dos elementos ou 0 se lista vazia
     */
    public calcularMedia(): number {
        if (this.elementos.length === 0) {
            return 0;
        }

        let soma = 0;
        for (let i = 0; i < this.elementos.length; i++) {
            soma += this.elementos[i];
        }

        return soma / this.elementos.length;
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

    /**
     * Método auxiliar para definir elementos diretamente (para testes)
     * @param elementos array de elementos
     */
    public definirElementos(elementos: number[]): void {
        this.elementos = [...elementos];
    }
}