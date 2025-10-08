/**
 * Implementação otimizada do Problema de Josephus clássico
 * Usa fórmula matemática recursiva para evitar simulação com arrays
 * Eficiente para valores muito grandes de n e k
 */
export class JosephusClassico {
    private historico: Array<{n: number, k: number, sobrevivente: number}>;

    constructor() {
        this.historico = [];
    }

    /**
     * Resolve o problema de Josephus usando fórmula matemática otimizada
     * J(n,k) = (J(n-1,k) + k) % n, onde J(1,k) = 0
     * @param n número de pessoas no círculo
     * @param k a cada k pessoas, uma é eliminada
     * @returns posição do sobrevivente (0-indexed)
     */
    public encontrarSobrevivente(n: number, k: number): number {
        if (n < 1 || k < 1) {
            throw new Error('n e k devem ser >= 1');
        }

        // Caso base: com 1 pessoa, o sobrevivente está na posição 0
        if (n === 1) {
            return 0;
        }

        // Usa abordagem iterativa para evitar stack overflow
        let resultado = 0;
        for (let i = 2; i <= n; i++) {
            resultado = (resultado + k) % i;
        }

        // Salva no histórico
        this.historico.push({n, k, sobrevivente: resultado});

        return resultado;
    }

    /**
     * Versão que retorna posição 1-indexed (mais intuitiva)
     * @param n número de pessoas no círculo
     * @param k a cada k pessoas, uma é eliminada
     * @returns posição do sobrevivente (1-indexed)
     */
    public encontrarSobreviventeHumano(n: number, k: number): number {
        return this.encontrarSobrevivente(n, k) + 1;
    }

    /**
     * Simula o processo passo a passo para números pequenos (demonstração)
     * ATENÇÃO: Usar apenas para n pequeno (< 1000)
     * @param n número de pessoas no círculo
     * @param k a cada k pessoas, uma é eliminada
     * @returns processo de eliminação e sobrevivente
     */
    public simularProcesso(n: number, k: number): {processo: string[], sobrevivente: number} {
        if (n > 1000) {
            throw new Error('Simulação limitada a n <= 1000 para evitar lentidão');
        }

        const pessoas = Array.from({length: n}, (_, i) => i + 1);
        const processo: string[] = [];
        let posicaoAtual = 0;

        processo.push(`🎯 Sequência inicial: [${pessoas.join(',')}]`);

        while (pessoas.length > 1) {
            // Calcular próxima posição a ser eliminada
            posicaoAtual = (posicaoAtual + k - 1) % pessoas.length;
            const eliminado = pessoas.splice(posicaoAtual, 1)[0];
            
            processo.push(`❌ ${eliminado} eliminado => [${pessoas.join(',')}]`);
            
            // Ajustar posição atual se necessário
            if (posicaoAtual >= pessoas.length && pessoas.length > 0) {
                posicaoAtual = 0;
            }
        }

        const sobrevivente = pessoas[0];
        processo.push(`🏆 Sobrevivente: ${sobrevivente}`);

        return {processo, sobrevivente};
    }

    /**
     * Resolve múltiplos casos do problema de Josephus
     * @param casos array de casos {n, k}
     * @returns resultados de todos os casos
     */
    public resolverCasos(casos: Array<{n: number, k: number}>): Array<{n: number, k: number, sobrevivente: number, tempoMs: number}> {
        const resultados: Array<{n: number, k: number, sobrevivente: number, tempoMs: number}> = [];

        for (const caso of casos) {
            const inicio = performance.now();
            const sobrevivente = this.encontrarSobreviventeHumano(caso.n, caso.k);
            const tempo = performance.now() - inicio;

            resultados.push({
                n: caso.n,
                k: caso.k,
                sobrevivente,
                tempoMs: Number(tempo.toFixed(3))
            });
        }

        return resultados;
    }

    /**
     * Encontra o valor de k que produz um sobrevivente específico
     * @param n número de pessoas
     * @param sobreviventeDesejado posição desejada do sobrevivente (1-indexed)
     * @param maxK valor máximo de k para testar
     * @returns valores de k que produzem o sobrevivente desejado
     */
    public encontrarKParaSobrevivente(n: number, sobreviventeDesejado: number, maxK: number = n * 2): number[] {
        const resultados: number[] = [];
        const sobreviventeZeroIndexed = sobreviventeDesejado - 1;

        for (let k = 1; k <= maxK; k++) {
            if (this.encontrarSobrevivente(n, k) === sobreviventeZeroIndexed) {
                resultados.push(k);
            }
        }

        return resultados;
    }

    /**
     * Análise estatística de sobreviventes para diferentes valores de k
     * @param n número de pessoas
     * @param maxK valor máximo de k para analisar
     * @returns estatísticas dos sobreviventes
     */
    public analisarSobreviventes(n: number, maxK: number = n): {[sobrevivente: number]: number} {
        const frequencias: {[sobrevivente: number]: number} = {};

        for (let k = 1; k <= maxK; k++) {
            const sobrevivente = this.encontrarSobreviventeHumano(n, k);
            frequencias[sobrevivente] = (frequencias[sobrevivente] || 0) + 1;
        }

        return frequencias;
    }

    /**
     * Retorna o histórico de cálculos realizados
     * @returns histórico dos cálculos
     */
    public getHistorico(): Array<{n: number, k: number, sobrevivente: number}> {
        return [...this.historico];
    }

    /**
     * Limpa o histórico de cálculos
     */
    public limparHistorico(): void {
        this.historico = [];
    }

    /**
     * Calcula o padrão de Josephus para uma sequência de n
     * @param maxN valor máximo de n para analisar
     * @param k valor fixo de k
     * @returns padrão de sobreviventes
     */
    public analisarPadrao(maxN: number, k: number): Array<{n: number, sobrevivente: number, diferenca: number}> {
        const padrao: Array<{n: number, sobrevivente: number, diferenca: number}> = [];
        let sobreviventeAnterior = 0;

        for (let n = 1; n <= maxN; n++) {
            const sobrevivente = this.encontrarSobreviventeHumano(n, k);
            const diferenca = sobrevivente - sobreviventeAnterior;
            
            padrao.push({n, sobrevivente, diferenca});
            sobreviventeAnterior = sobrevivente;
        }

        return padrao;
    }
}