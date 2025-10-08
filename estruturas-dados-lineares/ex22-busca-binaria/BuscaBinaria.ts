/**
 * Exercício 22 - Busca Binária Avançada
 * 
 * Implemente uma classe BuscaBinaria que contenha uma lista ordenada de inteiros e métodos para:
 * 1. Busca binária padrão (retorna índice ou -1)
 * 2. Busca da primeira ocorrência de um valor
 * 3. Busca da última ocorrência de um valor
 * 4. Busca por faixa (todos os índices entre dois valores)
 * 5. Busca do elemento mais próximo (se exato não existir)
 * 6. Inserção mantendo ordem (onde inserir para manter ordenação)
 * 
 * A classe deve detectar automaticamente se a lista está ordenada e manter estatísticas
 * de comparações realizadas em cada busca.
 */
export class BuscaBinaria {
    private elementos: number[];
    private estaOrdenado: boolean;
    private comparacoes: number;

    constructor(elementos: number[] = []) {
        this.elementos = [...elementos];
        this.estaOrdenado = this.verificarOrdenacao();
        this.comparacoes = 0;
    }

    /**
     * Busca binária padrão
     * @param valor valor a ser buscado
     * @returns índice do elemento ou -1 se não encontrado
     */
    public buscar(valor: number): number {
        if (!this.estaOrdenado) {
            throw new Error('Lista deve estar ordenada para busca binária');
        }

        this.comparacoes = 0;
        return this.buscaBinariaRecursiva(valor, 0, this.elementos.length - 1);
    }

    /**
     * Implementação recursiva da busca binária
     */
    private buscaBinariaRecursiva(valor: number, inicio: number, fim: number): number {
        if (inicio > fim) {
            return -1;
        }

        const meio = Math.floor((inicio + fim) / 2);
        this.comparacoes++;

        if (this.elementos[meio] === valor) {
            return meio;
        } else if (this.elementos[meio] > valor) {
            return this.buscaBinariaRecursiva(valor, inicio, meio - 1);
        } else {
            return this.buscaBinariaRecursiva(valor, meio + 1, fim);
        }
    }

    /**
     * Busca a primeira ocorrência de um valor
     * @param valor valor a ser buscado
     * @returns índice da primeira ocorrência ou -1
     */
    public buscarPrimeiro(valor: number): number {
        if (!this.estaOrdenado) {
            throw new Error('Lista deve estar ordenada para busca binária');
        }

        this.comparacoes = 0;
        let inicio = 0;
        let fim = this.elementos.length - 1;
        let resultado = -1;

        while (inicio <= fim) {
            const meio = Math.floor((inicio + fim) / 2);
            this.comparacoes++;

            if (this.elementos[meio] === valor) {
                resultado = meio;
                fim = meio - 1; // Continue buscando à esquerda
            } else if (this.elementos[meio] > valor) {
                fim = meio - 1;
            } else {
                inicio = meio + 1;
            }
        }

        return resultado;
    }

    /**
     * Busca a última ocorrência de um valor
     * @param valor valor a ser buscado
     * @returns índice da última ocorrência ou -1
     */
    public buscarUltimo(valor: number): number {
        if (!this.estaOrdenado) {
            throw new Error('Lista deve estar ordenada para busca binária');
        }

        this.comparacoes = 0;
        let inicio = 0;
        let fim = this.elementos.length - 1;
        let resultado = -1;

        while (inicio <= fim) {
            const meio = Math.floor((inicio + fim) / 2);
            this.comparacoes++;

            if (this.elementos[meio] === valor) {
                resultado = meio;
                inicio = meio + 1; // Continue buscando à direita
            } else if (this.elementos[meio] > valor) {
                fim = meio - 1;
            } else {
                inicio = meio + 1;
            }
        }

        return resultado;
    }

    /**
     * Busca todos os elementos em uma faixa de valores
     * @param valorMin valor mínimo (inclusivo)
     * @param valorMax valor máximo (inclusivo)
     * @returns array com todos os índices na faixa
     */
    public buscarFaixa(valorMin: number, valorMax: number): number[] {
        if (!this.estaOrdenado) {
            throw new Error('Lista deve estar ordenada para busca binária');
        }

        const indiceMin = this.buscarPrimeiro(valorMin);
        const indiceMax = this.buscarUltimo(valorMax);

        if (indiceMin === -1 || indiceMax === -1) {
            // Busca por posições onde os valores estariam
            const posMin = this.buscarPosicaoInsercao(valorMin);
            const posMax = this.buscarPosicaoInsercao(valorMax + 1) - 1;
            
            const resultado: number[] = [];
            for (let i = posMin; i <= posMax && i < this.elementos.length; i++) {
                if (this.elementos[i] >= valorMin && this.elementos[i] <= valorMax) {
                    resultado.push(i);
                }
            }
            return resultado;
        }

        const resultado: number[] = [];
        for (let i = indiceMin; i <= indiceMax; i++) {
            if (this.elementos[i] >= valorMin && this.elementos[i] <= valorMax) {
                resultado.push(i);
            }
        }

        return resultado;
    }

    /**
     * Busca o elemento mais próximo do valor especificado
     * @param valor valor de referência
     * @returns objeto com índice e valor do elemento mais próximo
     */
    public buscarMaisProximo(valor: number): { indice: number; valor: number; distancia: number } {
        if (!this.estaOrdenado) {
            throw new Error('Lista deve estar ordenada para busca binária');
        }

        if (this.elementos.length === 0) {
            throw new Error('Lista vazia');
        }

        this.comparacoes = 0;
        const posicao = this.buscarPosicaoInsercao(valor);

        let candidatos: { indice: number; valor: number; distancia: number }[] = [];

        // Verifica elemento à esquerda
        if (posicao > 0) {
            const indice = posicao - 1;
            candidatos.push({
                indice,
                valor: this.elementos[indice],
                distancia: Math.abs(valor - this.elementos[indice])
            });
        }

        // Verifica elemento à direita
        if (posicao < this.elementos.length) {
            const indice = posicao;
            candidatos.push({
                indice,
                valor: this.elementos[indice],
                distancia: Math.abs(valor - this.elementos[indice])
            });
        }

        // Retorna o mais próximo (em caso de empate, o de menor índice)
        return candidatos.reduce((melhor, atual) => 
            atual.distancia < melhor.distancia ? atual : melhor
        );
    }

    /**
     * Encontra a posição onde um valor deve ser inserido para manter a ordenação
     * @param valor valor a ser inserido
     * @returns índice onde inserir
     */
    public buscarPosicaoInsercao(valor: number): number {
        if (!this.estaOrdenado) {
            throw new Error('Lista deve estar ordenada para busca binária');
        }

        this.comparacoes = 0;
        let inicio = 0;
        let fim = this.elementos.length;

        while (inicio < fim) {
            const meio = Math.floor((inicio + fim) / 2);
            this.comparacoes++;

            if (this.elementos[meio] < valor) {
                inicio = meio + 1;
            } else {
                fim = meio;
            }
        }

        return inicio;
    }

    /**
     * Insere um valor mantendo a ordenação
     * @param valor valor a ser inserido
     * @returns índice onde foi inserido
     */
    public inserirOrdenado(valor: number): number {
        const posicao = this.buscarPosicaoInsercao(valor);
        this.elementos.splice(posicao, 0, valor);
        return posicao;
    }

    /**
     * Verifica se a lista está ordenada
     */
    private verificarOrdenacao(): boolean {
        for (let i = 1; i < this.elementos.length; i++) {
            if (this.elementos[i] < this.elementos[i - 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Força reordenação da lista
     */
    public ordenar(): void {
        this.elementos.sort((a, b) => a - b);
        this.estaOrdenado = true;
    }

    /**
     * Retorna número de comparações da última operação
     */
    public obterComparacoes(): number {
        return this.comparacoes;
    }

    /**
     * Define novos elementos
     */
    public definirElementos(elementos: number[]): void {
        this.elementos = [...elementos];
        this.estaOrdenado = this.verificarOrdenacao();
    }

    /**
     * Retorna os elementos atuais
     */
    public getElementos(): number[] {
        return [...this.elementos];
    }

    /**
     * Verifica se está ordenado
     */
    public isOrdenado(): boolean {
        return this.estaOrdenado;
    }

    /**
     * Retorna representação em string
     */
    public toString(): string {
        return `[${this.elementos.join(', ')}]`;
    }
}