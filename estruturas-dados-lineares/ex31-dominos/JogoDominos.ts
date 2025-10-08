/**
 * Representa uma peça de dominó
 */
interface PecaDomino {
    lado1: number;
    lado2: number;
    id?: string;
    orientacao?: 'normal' | 'invertida';
}

/**
 * Representa uma posição no tabuleiro
 */
interface PosicaoTabuleiro {
    indice: number;
    ladoEsquerdo: number;
    ladoDireito: number;
    peca: PecaDomino;
}

/**
 * Resultado de uma tentativa de encaixe
 */
interface ResultadoEncaixe {
    sucesso: boolean;
    posicao?: 'esquerda' | 'direita';
    orientacao?: 'normal' | 'invertida';
    mensagem: string;
    tabuleiro?: PosicaoTabuleiro[];
}

/**
 * Implementação completa do jogo de dominós com múltiplas variações
 * Inclui validação de encaixes, estratégias de jogo e análise de possibilidades
 */
export class JogoDominos {
    private tabuleiro: PosicaoTabuleiro[];
    private pecasDisponiveis: PecaDomino[];
    private historico: Array<{acao: string, peca: PecaDomino, resultado: ResultadoEncaixe}>;
    private pontuacao: number;

    constructor() {
        this.tabuleiro = [];
        this.pecasDisponiveis = [];
        this.historico = [];
        this.pontuacao = 0;
    }

    /**
     * Variação 1: Encaixe Simples
     * Verifica se uma peça pode ser encaixada em qualquer extremo do tabuleiro
     * @param peca peça a ser encaixada
     * @returns resultado do encaixe
     */
    public encaixeSimples(peca: PecaDomino): ResultadoEncaixe {
        if (this.tabuleiro.length === 0) {
            // Primeira peça sempre encaixa
            this.adicionarPrimeiraPeca(peca);
            const resultado: ResultadoEncaixe = {
                sucesso: true,
                posicao: 'esquerda',
                orientacao: 'normal',
                mensagem: `Primeira peça [${peca.lado1}|${peca.lado2}] adicionada ao tabuleiro`,
                tabuleiro: [...this.tabuleiro]
            };
            this.registrarAcao('encaixe-simples', peca, resultado);
            return resultado;
        }

        const extremoEsquerdo = this.tabuleiro[0].ladoEsquerdo;
        const extremoDireito = this.tabuleiro[this.tabuleiro.length - 1].ladoDireito;

        // Tentar encaixar na esquerda
        if (peca.lado2 === extremoEsquerdo) {
            this.adicionarPecaEsquerda(peca, 'normal');
            const resultado: ResultadoEncaixe = {
                sucesso: true,
                posicao: 'esquerda',
                orientacao: 'normal',
                mensagem: `Peça [${peca.lado1}|${peca.lado2}] encaixada na esquerda`,
                tabuleiro: [...this.tabuleiro]
            };
            this.registrarAcao('encaixe-simples', peca, resultado);
            return resultado;
        }

        if (peca.lado1 === extremoEsquerdo) {
            this.adicionarPecaEsquerda(peca, 'invertida');
            const resultado: ResultadoEncaixe = {
                sucesso: true,
                posicao: 'esquerda',
                orientacao: 'invertida',
                mensagem: `Peça [${peca.lado2}|${peca.lado1}] encaixada na esquerda (invertida)`,
                tabuleiro: [...this.tabuleiro]
            };
            this.registrarAcao('encaixe-simples', peca, resultado);
            return resultado;
        }

        // Tentar encaixar na direita
        if (peca.lado1 === extremoDireito) {
            this.adicionarPecaDireita(peca, 'normal');
            const resultado: ResultadoEncaixe = {
                sucesso: true,
                posicao: 'direita',
                orientacao: 'normal',
                mensagem: `Peça [${peca.lado1}|${peca.lado2}] encaixada na direita`,
                tabuleiro: [...this.tabuleiro]
            };
            this.registrarAcao('encaixe-simples', peca, resultado);
            return resultado;
        }

        if (peca.lado2 === extremoDireito) {
            this.adicionarPecaDireita(peca, 'invertida');
            const resultado: ResultadoEncaixe = {
                sucesso: true,
                posicao: 'direita',
                orientacao: 'invertida',
                mensagem: `Peça [${peca.lado2}|${peca.lado1}] encaixada na direita (invertida)`,
                tabuleiro: [...this.tabuleiro]
            };
            this.registrarAcao('encaixe-simples', peca, resultado);
            return resultado;
        }

        // Não encaixa
        const resultado: ResultadoEncaixe = {
            sucesso: false,
            mensagem: `Peça [${peca.lado1}|${peca.lado2}] não encaixa (extremos: ${extremoEsquerdo} e ${extremoDireito})`
        };
        this.registrarAcao('encaixe-simples', peca, resultado);
        return resultado;
    }

    /**
     * Variação 2: Encaixe com Estratégia
     * Escolhe automaticamente a melhor posição considerando futuras jogadas
     * @param peca peça a ser encaixada
     * @param pecasRestantes peças ainda disponíveis
     * @returns resultado do encaixe estratégico
     */
    public encaixeEstrategico(peca: PecaDomino, pecasRestantes: PecaDomino[]): ResultadoEncaixe {
        const possibilidades = this.analisarPossibilidades(peca);
        
        if (possibilidades.length === 0) {
            const resultado: ResultadoEncaixe = {
                sucesso: false,
                mensagem: `Peça [${peca.lado1}|${peca.lado2}] não tem encaixes possíveis`
            };
            this.registrarAcao('encaixe-estrategico', peca, resultado);
            return resultado;
        }

        // Avaliar qual posição oferece melhores oportunidades futuras
        let melhorOpcao = possibilidades[0];
        let melhorPontuacao = 0;

        for (const opcao of possibilidades) {
            const pontuacaoFutura = this.calcularPontuacaoFutura(opcao, pecasRestantes);
            if (pontuacaoFutura > melhorPontuacao) {
                melhorPontuacao = pontuacaoFutura;
                melhorOpcao = opcao;
            }
        }

        // Executar o melhor encaixe
        return this.executarEncaixe(melhorOpcao, peca, 'estratégico');
    }

    /**
     * Variação 3: Encaixe em Cadeia
     * Tenta encaixar múltiplas peças em sequência, otimizando a ordem
     * @param pecas array de peças para encaixar
     * @returns resultados de todos os encaixes
     */
    public encaixeCadeia(pecas: PecaDomino[]): Array<{peca: PecaDomino, resultado: ResultadoEncaixe}> {
        const resultados: Array<{peca: PecaDomino, resultado: ResultadoEncaixe}> = [];
        const pecasRestantes = [...pecas];

        while (pecasRestantes.length > 0) {
            let pecaEncaixada = false;

            // Tentar encaixar cada peça restante
            for (let i = 0; i < pecasRestantes.length; i++) {
                const peca = pecasRestantes[i];
                const resultado = this.encaixeEstrategico(peca, pecasRestantes.slice(0, i).concat(pecasRestantes.slice(i + 1)));

                if (resultado.sucesso) {
                    resultados.push({peca, resultado});
                    pecasRestantes.splice(i, 1);
                    pecaEncaixada = true;
                    break;
                }
            }

            // Se nenhuma peça encaixou, parar
            if (!pecaEncaixada) {
                // Adicionar peças que não encaixaram
                pecasRestantes.forEach(peca => {
                    resultados.push({
                        peca,
                        resultado: {
                            sucesso: false,
                            mensagem: `Peça [${peca.lado1}|${peca.lado2}] não pode ser encaixada na sequência atual`
                        }
                    });
                });
                break;
            }
        }

        return resultados;
    }

    /**
     * Variação 4: Encaixe com Bloqueio
     * Considera bloqueios e verifica se o encaixe pode impedir futuras jogadas
     * @param peca peça a ser encaixada
     * @param evitarBloqueios se deve evitar criar bloqueios
     * @returns resultado considerando bloqueios
     */
    public encaixeComBloqueio(peca: PecaDomino, evitarBloqueios: boolean = true): ResultadoEncaixe {
        const possibilidades = this.analisarPossibilidades(peca);
        
        if (possibilidades.length === 0) {
            return {
                sucesso: false,
                mensagem: `Peça [${peca.lado1}|${peca.lado2}] não encaixa em nenhuma posição`
            };
        }

        if (!evitarBloqueios) {
            // Se não se importa com bloqueios, usar primeira opção
            return this.executarEncaixe(possibilidades[0], peca, 'sem considerar bloqueios');
        }

        // Analisar bloqueios para cada possibilidade
        const avaliacoes = possibilidades.map(opcao => {
            const bloqueios = this.analisarBloqueios(opcao, peca);
            return {opcao, bloqueios};
        });

        // Escolher opção com menos bloqueios
        const melhorOpcao = avaliacoes.reduce((melhor, atual) => 
            atual.bloqueios.length < melhor.bloqueios.length ? atual : melhor
        );

        const resultado = this.executarEncaixe(melhorOpcao.opcao, peca, 'evitando bloqueios');
        
        if (melhorOpcao.bloqueios.length > 0) {
            resultado.mensagem += ` (Possíveis bloqueios: ${melhorOpcao.bloqueios.join(', ')})`;
        }

        return resultado;
    }

    /**
     * Variação 5: Encaixe com Pontuação
     * Sistema de pontuação baseado em valores das peças e bonificações especiais
     * @param peca peça a ser encaixada
     * @returns resultado com pontuação calculada
     */
    public encaixeComPontuacao(peca: PecaDomino): ResultadoEncaixe {
        const resultado = this.encaixeEstrategico(peca, []);
        
        if (!resultado.sucesso) {
            return resultado;
        }

        // Calcular pontuação
        let pontos = peca.lado1 + peca.lado2; // Pontos básicos

        // Bonificações especiais
        if (peca.lado1 === peca.lado2) {
            pontos *= 2; // Dobra peça dupla
            resultado.mensagem += ' [DUPLA x2]';
        }

        if (this.ehPecaEspecial(peca)) {
            pontos += 10; // Bônus peça especial
            resultado.mensagem += ' [ESPECIAL +10]';
        }

        if (this.formaCombinacao(peca)) {
            pontos += 5; // Bônus combinação
            resultado.mensagem += ' [COMBINAÇÃO +5]';
        }

        this.pontuacao += pontos;
        resultado.mensagem += ` (${pontos} pontos | Total: ${this.pontuacao})`;

        return resultado;
    }

    /**
     * Analisa todas as possibilidades de encaixe para uma peça
     * @param peca peça a analisar
     * @returns array de possibilidades
     */
    private analisarPossibilidades(peca: PecaDomino): Array<{posicao: 'esquerda' | 'direita', orientacao: 'normal' | 'invertida', valor: number}> {
        const possibilidades: Array<{posicao: 'esquerda' | 'direita', orientacao: 'normal' | 'invertida', valor: number}> = [];

        if (this.tabuleiro.length === 0) {
            possibilidades.push({posicao: 'esquerda', orientacao: 'normal', valor: peca.lado1});
            return possibilidades;
        }

        const extremoEsquerdo = this.tabuleiro[0].ladoEsquerdo;
        const extremoDireito = this.tabuleiro[this.tabuleiro.length - 1].ladoDireito;

        // Verificar encaixe na esquerda
        if (peca.lado2 === extremoEsquerdo) {
            possibilidades.push({posicao: 'esquerda', orientacao: 'normal', valor: peca.lado1});
        }
        if (peca.lado1 === extremoEsquerdo) {
            possibilidades.push({posicao: 'esquerda', orientacao: 'invertida', valor: peca.lado2});
        }

        // Verificar encaixe na direita
        if (peca.lado1 === extremoDireito) {
            possibilidades.push({posicao: 'direita', orientacao: 'normal', valor: peca.lado2});
        }
        if (peca.lado2 === extremoDireito) {
            possibilidades.push({posicao: 'direita', orientacao: 'invertida', valor: peca.lado1});
        }

        return possibilidades;
    }

    /**
     * Calcula pontuação futura baseada nas peças restantes
     * @param opcao opção de encaixe
     * @param pecasRestantes peças ainda disponíveis
     * @returns pontuação estimada
     */
    private calcularPontuacaoFutura(opcao: any, pecasRestantes: PecaDomino[]): number {
        let pontuacao = 0;
        const valorExtremo = opcao.valor;

        // Contar quantas peças restantes podem encaixar neste extremo
        for (const peca of pecasRestantes) {
            if (peca.lado1 === valorExtremo || peca.lado2 === valorExtremo) {
                pontuacao += peca.lado1 + peca.lado2;
            }
        }

        return pontuacao;
    }

    /**
     * Executa um encaixe específico
     * @param opcao opção de encaixe escolhida
     * @param peca peça a encaixar
     * @param estrategia estratégia utilizada
     * @returns resultado do encaixe
     */
    private executarEncaixe(opcao: any, peca: PecaDomino, estrategia: string): ResultadoEncaixe {
        if (opcao.posicao === 'esquerda') {
            this.adicionarPecaEsquerda(peca, opcao.orientacao);
        } else {
            this.adicionarPecaDireita(peca, opcao.orientacao);
        }

        const pecaOrientada = opcao.orientacao === 'invertida' ? 
            `[${peca.lado2}|${peca.lado1}]` : `[${peca.lado1}|${peca.lado2}]`;

        const resultado: ResultadoEncaixe = {
            sucesso: true,
            posicao: opcao.posicao,
            orientacao: opcao.orientacao,
            mensagem: `${estrategia}: ${pecaOrientada} encaixada na ${opcao.posicao}`,
            tabuleiro: [...this.tabuleiro]
        };

        this.registrarAcao(`encaixe-${estrategia}`, peca, resultado);
        return resultado;
    }

    /**
     * Analisa possíveis bloqueios que um encaixe pode causar
     * @param opcao opção de encaixe
     * @param peca peça sendo encaixada
     * @returns array de valores que podem ser bloqueados
     */
    private analisarBloqueios(opcao: any, peca: PecaDomino): number[] {
        const bloqueios: number[] = [];
        const valorExtremo = opcao.valor;

        // Verificar se é um valor raro (aparece poucas vezes no jogo)
        const valoresRaros = [0, 6]; // Por exemplo, branco e seis são mais raros
        if (valoresRaros.includes(valorExtremo)) {
            bloqueios.push(valorExtremo);
        }

        return bloqueios;
    }

    /**
     * Verifica se uma peça é especial (critérios personalizáveis)
     * @param peca peça a verificar
     * @returns true se é especial
     */
    private ehPecaEspecial(peca: PecaDomino): boolean {
        // Peças especiais: duplas altas, soma alta, etc.
        return (peca.lado1 === peca.lado2 && peca.lado1 >= 5) || 
               (peca.lado1 + peca.lado2 >= 10);
    }

    /**
     * Verifica se uma peça forma combinação especial no tabuleiro
     * @param peca peça a verificar
     * @returns true se forma combinação
     */
    private formaCombinacao(peca: PecaDomino): boolean {
        if (this.tabuleiro.length < 2) return false;

        // Verificar se os últimos valores formam sequência ou padrão
        const ultimosPinos = this.tabuleiro.slice(-2).map(p => [p.ladoEsquerdo, p.ladoDireito]).flat();
        const novosPinos = [peca.lado1, peca.lado2];
        
        // Exemplo: três números iguais consecutivos
        const todosValores = [...ultimosPinos.slice(-2), ...novosPinos];
        return new Set(todosValores).size === 1;
    }

    /**
     * Adiciona a primeira peça ao tabuleiro
     * @param peca primeira peça
     */
    private adicionarPrimeiraPeca(peca: PecaDomino): void {
        this.tabuleiro.push({
            indice: 0,
            ladoEsquerdo: peca.lado1,
            ladoDireito: peca.lado2,
            peca: {...peca, orientacao: 'normal'}
        });
    }

    /**
     * Adiciona peça à esquerda do tabuleiro
     * @param peca peça a adicionar
     * @param orientacao orientação da peça
     */
    private adicionarPecaEsquerda(peca: PecaDomino, orientacao: 'normal' | 'invertida'): void {
        const novaPosicao: PosicaoTabuleiro = {
            indice: -this.tabuleiro.length,
            ladoEsquerdo: orientacao === 'normal' ? peca.lado1 : peca.lado2,
            ladoDireito: orientacao === 'normal' ? peca.lado2 : peca.lado1,
            peca: {...peca, orientacao}
        };

        this.tabuleiro.unshift(novaPosicao);
        
        // Reindexar
        this.tabuleiro.forEach((pos, i) => {
            pos.indice = i - Math.floor(this.tabuleiro.length / 2);
        });
    }

    /**
     * Adiciona peça à direita do tabuleiro
     * @param peca peça a adicionar
     * @param orientacao orientação da peça
     */
    private adicionarPecaDireita(peca: PecaDomino, orientacao: 'normal' | 'invertida'): void {
        const novaPosicao: PosicaoTabuleiro = {
            indice: this.tabuleiro.length,
            ladoEsquerdo: orientacao === 'normal' ? peca.lado1 : peca.lado2,
            ladoDireito: orientacao === 'normal' ? peca.lado2 : peca.lado1,
            peca: {...peca, orientacao}
        };

        this.tabuleiro.push(novaPosicao);
    }

    /**
     * Registra uma ação no histórico
     * @param acao tipo da ação
     * @param peca peça utilizada
     * @param resultado resultado da ação
     */
    private registrarAcao(acao: string, peca: PecaDomino, resultado: ResultadoEncaixe): void {
        this.historico.push({acao, peca: {...peca}, resultado});
    }

    /**
     * Retorna o estado atual do tabuleiro como string
     * @returns representação visual do tabuleiro
     */
    public getTabuleiro(): string {
        if (this.tabuleiro.length === 0) {
            return 'Tabuleiro vazio';
        }

        return this.tabuleiro.map(pos => {
            const orientacao = pos.peca.orientacao === 'invertida' ? '⟲' : '';
            return `[${pos.ladoEsquerdo}|${pos.ladoDireito}]${orientacao}`;
        }).join(' - ');
    }

    /**
     * Retorna as extremidades livres do tabuleiro
     * @returns extremos esquerdo e direito
     */
    public getExtremidades(): {esquerda: number, direita: number} | null {
        if (this.tabuleiro.length === 0) {
            return null;
        }

        return {
            esquerda: this.tabuleiro[0].ladoEsquerdo,
            direita: this.tabuleiro[this.tabuleiro.length - 1].ladoDireito
        };
    }

    /**
     * Retorna o histórico de jogadas
     * @returns histórico completo
     */
    public getHistorico(): Array<{acao: string, peca: PecaDomino, resultado: ResultadoEncaixe}> {
        return [...this.historico];
    }

    /**
     * Retorna a pontuação atual
     * @returns pontuação total
     */
    public getPontuacao(): number {
        return this.pontuacao;
    }

    /**
     * Reinicia o jogo
     */
    public reiniciar(): void {
        this.tabuleiro = [];
        this.pecasDisponiveis = [];
        this.historico = [];
        this.pontuacao = 0;
    }

    /**
     * Gera um conjunto padrão de peças de dominó (0-6)
     * @returns conjunto completo de peças
     */
    public static gerarConjuntoPadrao(): PecaDomino[] {
        const pecas: PecaDomino[] = [];
        let id = 1;

        for (let i = 0; i <= 6; i++) {
            for (let j = i; j <= 6; j++) {
                pecas.push({
                    lado1: i,
                    lado2: j,
                    id: `D${id.toString().padStart(2, '0')}`
                });
                id++;
            }
        }

        return pecas;
    }

    /**
     * Embaralha um conjunto de peças
     * @param pecas peças a embaralhar
     * @returns peças embaralhadas
     */
    public static embaralhar(pecas: PecaDomino[]): PecaDomino[] {
        const embaralhadas = [...pecas];
        for (let i = embaralhadas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [embaralhadas[i], embaralhadas[j]] = [embaralhadas[j], embaralhadas[i]];
        }
        return embaralhadas;
    }
}