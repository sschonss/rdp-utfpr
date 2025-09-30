/**
 * Representa uma pessoa no jogo de Josephus
 */
interface Pessoa {
    id: number;
    numero: number;
}

/**
 * Implementação da variação do Problema de Josephus
 */
export class Josephus {
    private pessoas: Pessoa[];

    constructor(numerosPessoas: number[]) {
        this.pessoas = [];
        this.inicializarPessoas(numerosPessoas);
    }

    /**
     * Inicializa as pessoas com IDs sequenciais e seus números escolhidos
     * @param numerosPessoas array com os números escolhidos por cada pessoa
     */
    private inicializarPessoas(numerosPessoas: number[]): void {
        for (let i = 0; i < numerosPessoas.length; i++) {
            this.pessoas.push({
                id: i + 1,
                numero: numerosPessoas[i]
            });
        }
    }

    /**
     * Executa o jogo de Josephus e retorna a última pessoa restante
     * @param pessoaInicial índice da pessoa que inicia a contagem (0-indexed)
     * @returns a pessoa vencedora ou null se não houver pessoas
     */
    public jogar(pessoaInicial: number = 0): Pessoa | null {
        if (this.pessoas.length === 0) {
            return null;
        }

        if (this.pessoas.length === 1) {
            return this.pessoas[0];
        }

        // Criar uma cópia da lista para não modificar a original
        const pessoasRestantes: Pessoa[] = [...this.pessoas];
        let posicaoAtual = pessoaInicial % pessoasRestantes.length;

        console.log('🎯 Iniciando jogo de Josephus...');
        console.log(`👥 Pessoas iniciais: ${this.pessoasToString(pessoasRestantes)}`);
        console.log(`🎲 Pessoa inicial: ${pessoasRestantes[posicaoAtual].id} (número: ${pessoasRestantes[posicaoAtual].numero})`);
        console.log();

        while (pessoasRestantes.length > 1) {
            // Número da pessoa atual para contagem
            const numeroContagem = pessoasRestantes[posicaoAtual].numero;
            
            console.log(`📍 Contagem inicia na pessoa ${pessoasRestantes[posicaoAtual].id} com número ${numeroContagem}`);
            
            // Calcular próxima posição a ser eliminada
            // Começamos a contar da próxima pessoa
            let proximaPosicao = (posicaoAtual + numeroContagem) % pessoasRestantes.length;
            
            // Eliminar a pessoa
            const pessoaEliminada = pessoasRestantes[proximaPosicao];
            console.log(`❌ Eliminando pessoa ${pessoaEliminada.id} (número: ${pessoaEliminada.numero})`);
            
            pessoasRestantes.splice(proximaPosicao, 1);
            
            // Ajustar posição atual após remoção
            if (proximaPosicao < pessoasRestantes.length) {
                posicaoAtual = proximaPosicao;
            } else {
                posicaoAtual = 0;
            }
            
            // Garantir que a posição está dentro dos limites
            if (pessoasRestantes.length > 0) {
                posicaoAtual = posicaoAtual % pessoasRestantes.length;
            }
            
            console.log(`👥 Pessoas restantes: ${this.pessoasToString(pessoasRestantes)}`);
            console.log();
        }

        const vencedor = pessoasRestantes[0];
        console.log(`🏆 Vencedor: Pessoa ${vencedor.id} (número: ${vencedor.numero})`);
        
        return vencedor;
    }

    /**
     * Executa o jogo com pessoa inicial sorteada aleatoriamente
     * @returns a pessoa vencedora
     */
    public jogarComSorteio(): Pessoa | null {
        if (this.pessoas.length === 0) {
            return null;
        }

        const pessoaSorteada = Math.floor(Math.random() * this.pessoas.length);
        console.log(`🎲 Pessoa sorteada para início: ${this.pessoas[pessoaSorteada].id}`);
        console.log();
        
        return this.jogar(pessoaSorteada);
    }

    /**
     * Converte array de pessoas para string
     * @param pessoas array de pessoas
     * @returns representação em string
     */
    private pessoasToString(pessoas: Pessoa[]): string {
        return pessoas.map(p => `P${p.id}(${p.numero})`).join(', ');
    }

    /**
     * Retorna informações sobre as pessoas
     * @returns string com informações das pessoas
     */
    public getPessoas(): string {
        return this.pessoasToString(this.pessoas);
    }

    /**
     * Retorna o número de pessoas
     * @returns quantidade de pessoas
     */
    public getQuantidadePessoas(): number {
        return this.pessoas.length;
    }
}