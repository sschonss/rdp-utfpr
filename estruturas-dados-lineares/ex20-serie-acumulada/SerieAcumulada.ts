/**
 * Tipo para operações binárias
 */
type BinaryOperator<T> = (a: T, b: T) => T;

/**
 * Classe que implementa transformação acumulada com operação genérica
 */
export class SerieAcumulada {
    private elementos: number[];
    
    constructor(elementos: number[] = []) {
        this.elementos = [...elementos];
    }
    
    /**
     * Transforma a lista aplicando operação acumuladamente
     * @param operacao operação binária a ser aplicada
     * @returns nova lista com valores acumulados
     */
    public transformarAcumulado(operacao: BinaryOperator<number>): number[] {
        if (this.elementos.length === 0) {
            return [];
        }
        
        const resultado: number[] = [this.elementos[0]];
        
        for (let i = 1; i < this.elementos.length; i++) {
            const valorAnterior = resultado[i - 1];
            const valorAtual = this.elementos[i];
            resultado.push(operacao(valorAnterior, valorAtual));
        }
        
        return resultado;
    }
    
    /**
     * Operações pré-definidas
     */
    public static operacoes = {
        soma: (a: number, b: number) => a + b,
        multiplicacao: (a: number, b: number) => a * b,
        subtracao: (a: number, b: number) => a - b,
        maximo: (a: number, b: number) => Math.max(a, b),
        minimo: (a: number, b: number) => Math.min(a, b),
        divisao: (a: number, b: number) => b !== 0 ? a / b : a
    };
    
    /**
     * Métodos de conveniência para operações comuns
     */
    public somaAcumulada(): number[] {
        return this.transformarAcumulado(SerieAcumulada.operacoes.soma);
    }
    
    public produtoAcumulado(): number[] {
        return this.transformarAcumulado(SerieAcumulada.operacoes.multiplicacao);
    }
    
    public maximoAcumulado(): number[] {
        return this.transformarAcumulado(SerieAcumulada.operacoes.maximo);
    }
    
    public minimoAcumulado(): number[] {
        return this.transformarAcumulado(SerieAcumulada.operacoes.minimo);
    }
    
    public getElementos(): number[] {
        return [...this.elementos];
    }
    
    public definirElementos(elementos: number[]): void {
        this.elementos = [...elementos];
    }
}