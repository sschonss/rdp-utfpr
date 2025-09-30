/**
 * Classe para verificar balanceamento de expressões matemáticas
 * Verifica se chaves {}, colchetes [] e parênteses () estão balanceados
 * Considera hierarquia: chaves > colchetes > parênteses
 */
export class Balanceamento {
    private expressao: string;

    constructor(expressao: string) {
        this.expressao = expressao;
    }

    /**
     * Verifica se a expressão está balanceada
     * @returns true se balanceada, false caso contrário
     */
    public estaBalanceada(): boolean {
        const pilha: string[] = [];
        
        // Mapeamento dos caracteres de fechamento para abertura
        const pares: { [key: string]: string } = {
            ')': '(',
            ']': '[',
            '}': '{'
        };

        // Hierarquia: parênteses < colchetes < chaves
        const hierarquia: { [key: string]: number } = {
            '(': 1, ')': 1,
            '[': 2, ']': 2,
            '{': 3, '}': 3
        };

        for (let i = 0; i < this.expressao.length; i++) {
            const char = this.expressao[i];

            // Se é um caractere de abertura
            if (char === '(' || char === '[' || char === '{') {
                pilha.push(char);
            }
            // Se é um caractere de fechamento
            else if (char === ')' || char === ']' || char === '}') {
                // Verifica se há algo na pilha para fechar
                if (pilha.length === 0) {
                    return false;
                }

                const topo = pilha[pilha.length - 1];
                
                // Verifica se o par está correto
                if (pares[char] !== topo) {
                    return false;
                }

                // Verifica hierarquia: não pode ter chaves dentro de parênteses
                // ou colchetes dentro de parênteses
                for (let j = 0; j < pilha.length - 1; j++) {
                    const elementoPilha = pilha[j];
                    if (hierarquia[elementoPilha] < hierarquia[char]) {
                        return false;
                    }
                }

                pilha.pop();
            }
        }

        // A expressão está balanceada se a pilha estiver vazia
        return pilha.length === 0;
    }

    public getExpressao(): string {
        return this.expressao;
    }
}