/**
 * Exercício 23 - Janela Deslizante
 * 
 * Implemente uma classe JanelaDeslizante que processa uma lista usando janela de tamanho fixo.
 * Funcionalidades: máximo, mínimo, soma e média da janela atual.
 */
export class JanelaDeslizante {
    private elementos: number[];
    private tamanhoJanela: number;

    constructor(elementos: number[] = [], tamanhoJanela: number = 3) {
        this.elementos = [...elementos];
        this.tamanhoJanela = Math.max(1, tamanhoJanela);
    }

    public maximosJanela(): number[] {
        if (this.elementos.length < this.tamanhoJanela) return [];
        
        const resultado: number[] = [];
        for (let i = 0; i <= this.elementos.length - this.tamanhoJanela; i++) {
            const janela = this.elementos.slice(i, i + this.tamanhoJanela);
            resultado.push(Math.max(...janela));
        }
        return resultado;
    }

    public minimosJanela(): number[] {
        if (this.elementos.length < this.tamanhoJanela) return [];
        
        const resultado: number[] = [];
        for (let i = 0; i <= this.elementos.length - this.tamanhoJanela; i++) {
            const janela = this.elementos.slice(i, i + this.tamanhoJanela);
            resultado.push(Math.min(...janela));
        }
        return resultado;
    }

    public somasJanela(): number[] {
        if (this.elementos.length < this.tamanhoJanela) return [];
        
        const resultado: number[] = [];
        let somaAtual = this.elementos.slice(0, this.tamanhoJanela).reduce((a, b) => a + b, 0);
        resultado.push(somaAtual);

        for (let i = this.tamanhoJanela; i < this.elementos.length; i++) {
            somaAtual = somaAtual - this.elementos[i - this.tamanhoJanela] + this.elementos[i];
            resultado.push(somaAtual);
        }
        return resultado;
    }

    public mediasJanela(): number[] {
        return this.somasJanela().map(soma => soma / this.tamanhoJanela);
    }

    public getElementos(): number[] { return [...this.elementos]; }
    public getTamanhoJanela(): number { return this.tamanhoJanela; }
    public definirTamanhoJanela(tamanho: number): void { this.tamanhoJanela = Math.max(1, tamanho); }
    public toString(): string { return `[${this.elementos.join(', ')}]`; }
}