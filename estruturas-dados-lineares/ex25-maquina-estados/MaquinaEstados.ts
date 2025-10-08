/**
 * Exercício 25 - Máquina de Estados para Validação de Sequências
 * 
 * Implemente uma máquina de estados que valida se uma sequência de números
 * segue um padrão específico. Estados: INICIAL, PAR, ÍMPAR, CRESCENTE, DECRESCENTE, FINAL.
 */
export class MaquinaEstados {
    private estados = ['INICIAL', 'PAR', 'IMPAR', 'CRESCENTE', 'DECRESCENTE', 'FINAL', 'ERRO'] as const;
    private estadoAtual: typeof this.estados[number];
    private historico: string[];
    private ultimoValor: number | null;

    constructor() {
        this.estadoAtual = 'INICIAL';
        this.historico = [];
        this.ultimoValor = null;
    }

    public processarSequencia(sequencia: number[]): boolean {
        this.resetar();
        
        for (let i = 0; i < sequencia.length; i++) {
            const numero = sequencia[i];
            this.processar(numero);
            
            if (this.estadoAtual === 'ERRO') {
                return false;
            }
        }
        
        return this.estadoAtual === 'FINAL' || this.podeFinalizarEm(this.estadoAtual);
    }

    private processar(numero: number): void {
        const estadoAnterior = this.estadoAtual;
        
        switch (this.estadoAtual) {
            case 'INICIAL':
                this.estadoAtual = numero % 2 === 0 ? 'PAR' : 'IMPAR';
                break;
                
            case 'PAR':
                if (numero % 2 === 0) {
                    this.estadoAtual = 'ERRO'; // Dois pares seguidos
                } else {
                    if (this.ultimoValor !== null) {
                        this.estadoAtual = numero > this.ultimoValor ? 'CRESCENTE' : 'DECRESCENTE';
                    } else {
                        this.estadoAtual = 'IMPAR';
                    }
                }
                break;
                
            case 'IMPAR':
                if (numero % 2 !== 0) {
                    this.estadoAtual = 'ERRO'; // Dois ímpares seguidos
                } else {
                    if (this.ultimoValor !== null) {
                        this.estadoAtual = numero > this.ultimoValor ? 'CRESCENTE' : 'DECRESCENTE';
                    } else {
                        this.estadoAtual = 'PAR';
                    }
                }
                break;
                
            case 'CRESCENTE':
                if (this.ultimoValor !== null && numero <= this.ultimoValor) {
                    this.estadoAtual = 'DECRESCENTE';
                } else if (numero % 2 === this.ultimoValor! % 2) {
                    this.estadoAtual = 'ERRO'; // Mesma paridade
                }
                break;
                
            case 'DECRESCENTE':
                if (this.ultimoValor !== null && numero >= this.ultimoValor) {
                    this.estadoAtual = 'CRESCENTE';
                } else if (numero % 2 === this.ultimoValor! % 2) {
                    this.estadoAtual = 'ERRO'; // Mesma paridade
                }
                break;
                
            case 'FINAL':
                this.estadoAtual = 'ERRO'; // Não deveria processar após FINAL
                break;
        }
        
        this.historico.push(`${numero} [${estadoAnterior} → ${this.estadoAtual}]`);
        this.ultimoValor = numero;
        
        // Verifica se pode finalizar
        if (this.podeFinalizarEm(this.estadoAtual) && this.historico.length >= 4) {
            this.estadoAtual = 'FINAL';
        }
    }

    private podeFinalizarEm(estado: string): boolean {
        return ['CRESCENTE', 'DECRESCENTE'].includes(estado);
    }

    private resetar(): void {
        this.estadoAtual = 'INICIAL';
        this.historico = [];
        this.ultimoValor = null;
    }

    public getEstadoAtual(): string {
        return this.estadoAtual;
    }

    public getHistorico(): string[] {
        return [...this.historico];
    }

    public static validarPadrao(sequencia: number[]): { valida: boolean; historico: string[] } {
        const maquina = new MaquinaEstados();
        const valida = maquina.processarSequencia(sequencia);
        return { valida, historico: maquina.getHistorico() };
    }
}