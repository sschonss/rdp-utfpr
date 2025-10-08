/**
 * Representa um monge no problema
 */
interface Monge {
    id: number;
    nome: string;
    nivel: number;
    energia: number;
    posicaoOriginal: number;
}

/**
 * Implementação do Problema do Monge (Monk Problem)
 * Variação do Josephus onde monges são redistribuídos baseado em suas energias
 * e eliminados seguindo regras específicas de poder e distância
 */
export class ProblemaMonge {
    private monges: Monge[];
    private historicoMovimentos: string[];
    private rodada: number;

    constructor() {
        this.monges = [];
        this.historicoMovimentos = [];
        this.rodada = 0;
    }

    /**
     * Inicializa os monges no círculo
     * @param nomes nomes dos monges
     * @param niveis níveis de poder (1-10)
     * @param energias energias iniciais (1-100)
     */
    public inicializarMonges(nomes: string[], niveis: number[], energias: number[]): void {
        if (nomes.length !== niveis.length || nomes.length !== energias.length) {
            throw new Error('Todos os arrays devem ter o mesmo tamanho');
        }

        this.monges = [];
        for (let i = 0; i < nomes.length; i++) {
            this.monges.push({
                id: i + 1,
                nome: nomes[i],
                nivel: Math.max(1, Math.min(10, niveis[i])),
                energia: Math.max(1, Math.min(100, energias[i])),
                posicaoOriginal: i
            });
        }

        this.historicoMovimentos = [];
        this.rodada = 0;
        this.historicoMovimentos.push(`🏮 Monges posicionados: ${this.mongesToString()}`);
    }

    /**
     * Executa uma rodada do Problema do Monge
     * @returns monge vencedor ou null se o jogo não terminou
     */
    public executarRodada(): Monge | null {
        if (this.monges.length <= 1) {
            return this.monges[0] || null;
        }

        this.rodada++;
        this.historicoMovimentos.push(`\n🔄 === RODADA ${this.rodada} ===`);

        // 1. Redistribuição baseada em energia
        this.redistribuirPorEnergia();

        // 2. Combate por proximidade
        const eliminado = this.executarCombate();

        // 3. Regeneração de energia
        this.regenerarEnergia();

        if (eliminado) {
            this.historicoMovimentos.push(`❌ ${eliminado.nome} foi eliminado!`);
        }

        this.historicoMovimentos.push(`👥 Monges restantes: ${this.mongesToString()}`);

        return this.monges.length === 1 ? this.monges[0] : null;
    }

    /**
     * Redistribui monges baseado em suas energias
     * Monges com mais energia se movem mais posições
     */
    private redistribuirPorEnergia(): void {
        const movimentos: Array<{monge: Monge, novaPos: number}> = [];

        for (let i = 0; i < this.monges.length; i++) {
            const monge = this.monges[i];
            const passos = Math.floor(monge.energia / 10); // 1 passo a cada 10 de energia
            const novaPosicao = (i + passos) % this.monges.length;
            
            if (passos > 0) {
                movimentos.push({monge, novaPos: novaPosicao});
                this.historicoMovimentos.push(`🚶 ${monge.nome} move ${passos} posições (energia: ${monge.energia})`);
            }
        }

        // Aplica os movimentos (cria nova ordem)
        if (movimentos.length > 0) {
            const novaOrdem = [...this.monges];
            movimentos.forEach(mov => {
                const indiceAtual = novaOrdem.findIndex(m => m.id === mov.monge.id);
                if (indiceAtual !== -1) {
                    novaOrdem.splice(indiceAtual, 1);
                    novaOrdem.splice(mov.novaPos, 0, mov.monge);
                }
            });
            this.monges = novaOrdem;
            this.historicoMovimentos.push(`🔄 Nova ordem: ${this.mongesToString()}`);
        }
    }

    /**
     * Executa combate entre monges adjacentes
     * @returns monge eliminado ou null
     */
    private executarCombate(): Monge | null {
        if (this.monges.length < 2) {
            return null;
        }

        // Encontra o par com maior diferença de poder
        let maiorDiferenca = 0;
        let indiceCombate = -1;

        for (let i = 0; i < this.monges.length; i++) {
            const atual = this.monges[i];
            const proximo = this.monges[(i + 1) % this.monges.length];
            const diferenca = Math.abs(atual.nivel - proximo.nivel);

            if (diferenca > maiorDiferenca) {
                maiorDiferenca = diferenca;
                indiceCombate = i;
            }
        }

        if (indiceCombate === -1 || maiorDiferenca === 0) {
            // Se não há diferença, elimina o com menor energia
            let menorEnergia = Infinity;
            let indiceMenorEnergia = 0;

            for (let i = 0; i < this.monges.length; i++) {
                if (this.monges[i].energia < menorEnergia) {
                    menorEnergia = this.monges[i].energia;
                    indiceMenorEnergia = i;
                }
            }
            
            const eliminado = this.monges.splice(indiceMenorEnergia, 1)[0];
            this.historicoMovimentos.push(`⚔️ Combate por energia: ${eliminado.nome} (energia: ${eliminado.energia})`);
            return eliminado;
        }

        // Combate entre monges adjacentes
        const monge1 = this.monges[indiceCombate];
        const monge2 = this.monges[(indiceCombate + 1) % this.monges.length];
        
        this.historicoMovimentos.push(`⚔️ Combate: ${monge1.nome} (nível ${monge1.nivel}) vs ${monge2.nome} (nível ${monge2.nivel})`);

        // Fator de sorte baseado na energia
        const fatorSorte1 = monge1.energia / 100;
        const fatorSorte2 = monge2.energia / 100;
        
        const poder1 = monge1.nivel * (0.8 + fatorSorte1 * 0.4); // 80-120% do nível base
        const poder2 = monge2.nivel * (0.8 + fatorSorte2 * 0.4);

        let eliminado: Monge;
        let indiceEliminado: number;

        if (poder1 > poder2) {
            eliminado = monge2;
            indiceEliminado = (indiceCombate + 1) % this.monges.length;
            this.historicoMovimentos.push(`🏆 ${monge1.nome} vence com poder ${poder1.toFixed(1)} vs ${poder2.toFixed(1)}`);
        } else {
            eliminado = monge1;
            indiceEliminado = indiceCombate;
            this.historicoMovimentos.push(`🏆 ${monge2.nome} vence com poder ${poder2.toFixed(1)} vs ${poder1.toFixed(1)}`);
        }

        this.monges.splice(indiceEliminado, 1);
        return eliminado;
    }

    /**
     * Regenera energia dos monges sobreviventes
     */
    private regenerarEnergia(): void {
        for (const monge of this.monges) {
            const regeneracao = Math.floor(monge.nivel * 2 + Math.random() * 5);
            monge.energia = Math.min(100, monge.energia + regeneracao);
        }
        this.historicoMovimentos.push(`🔋 Energia regenerada para todos os monges`);
    }

    /**
     * Executa o jogo completo até haver um vencedor
     * @returns monge vencedor
     */
    public jogarCompleto(): Monge {
        if (this.monges.length === 0) {
            throw new Error('Nenhum monge inicializado');
        }

        let vencedor: Monge | null = null;
        const maxRodadas = 50; // Previne loops infinitos

        while (!vencedor && this.rodada < maxRodadas) {
            vencedor = this.executarRodada();
        }

        if (!vencedor) {
            // Se chegou ao limite, vence o monge com maior poder total
            vencedor = this.monges.reduce((melhor, atual) => {
                const poderTotal = atual.nivel * atual.energia;
                const melhorPoder = melhor.nivel * melhor.energia;
                return poderTotal > melhorPoder ? atual : melhor;
            });
            this.historicoMovimentos.push(`⏰ Limite de rodadas atingido. Vencedor por poder total: ${vencedor.nome}`);
        }

        this.historicoMovimentos.push(`\n🏆 VENCEDOR: ${vencedor.nome} (nível: ${vencedor.nivel}, energia: ${vencedor.energia})`);
        return vencedor;
    }

    /**
     * Analisa estatísticas de múltiplos jogos
     * @param configuracoes diferentes configurações de monges
     * @param jogosPerConfiguracao número de jogos por configuração
     * @returns estatísticas dos resultados
     */
    public analisarEstatisticas(
        configuracoes: Array<{nomes: string[], niveis: number[], energias: number[]}>,
        jogosPerConfiguracao: number = 10
    ): Array<{config: number, vencedores: {[nome: string]: number}, rodadasMedia: number}> {
        const resultados: Array<{config: number, vencedores: {[nome: string]: number}, rodadasMedia: number}> = [];

        configuracoes.forEach((config, indiceConfig) => {
            const vencedores: {[nome: string]: number} = {};
            let totalRodadas = 0;

            for (let jogo = 0; jogo < jogosPerConfiguracao; jogo++) {
                this.inicializarMonges(config.nomes, config.niveis, config.energias);
                const vencedor = this.jogarCompleto();
                
                vencedores[vencedor.nome] = (vencedores[vencedor.nome] || 0) + 1;
                totalRodadas += this.rodada;
            }

            resultados.push({
                config: indiceConfig + 1,
                vencedores,
                rodadasMedia: totalRodadas / jogosPerConfiguracao
            });
        });

        return resultados;
    }

    /**
     * Converte monges para string
     * @returns representação em string dos monges
     */
    private mongesToString(): string {
        return this.monges.map(m => `${m.nome}(N${m.nivel}/E${m.energia})`).join(' → ');
    }

    /**
     * Retorna o histórico completo de movimentos
     * @returns histórico de movimentos
     */
    public getHistorico(): string[] {
        return [...this.historicoMovimentos];
    }

    /**
     * Retorna informações sobre os monges atuais
     * @returns monges atuais
     */
    public getMonges(): Monge[] {
        return [...this.monges];
    }

    /**
     * Retorna o número da rodada atual
     * @returns número da rodada
     */
    public getRodadaAtual(): number {
        return this.rodada;
    }

    /**
     * Reinicia o jogo
     */
    public reiniciar(): void {
        this.monges = [];
        this.historicoMovimentos = [];
        this.rodada = 0;
    }
}