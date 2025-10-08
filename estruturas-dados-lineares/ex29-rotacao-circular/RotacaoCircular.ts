/**
 * Representa um elemento na estrutura circular
 */
interface ElementoCircular<T> {
    valor: T;
    indice: number;
    acessos: number;
    ultimoAcesso: number;
}

/**
 * Cache entry para rotações já calculadas
 */
interface CacheRotacao {
    tamanhoOriginal: number;
    rotacaoSolicitada: number;
    rotacaoEfetiva: number;
    timestamp: number;
}

/**
 * Estatísticas de performance
 */
interface EstatisticasPerformance {
    totalRotacoes: number;
    hitsCacheRotacao: number;
    tempoMedioRotacao: number;
    previsoesCertas: number;
    previsoesTentadas: number;
}

/**
 * Implementação de rotação circular inteligente com cache e predição
 * Otimizada para operações frequentes com padrões de acesso
 */
export class RotacaoCircular<T> {
    private elementos: ElementoCircular<T>[];
    private cacheRotacoes: Map<string, CacheRotacao>;
    private historicoPadroes: number[];
    private stats: EstatisticasPerformance;
    private maxCacheSize: number;
    private posicaoAtual: number;

    constructor(maxCacheSize: number = 100) {
        this.elementos = [];
        this.cacheRotacoes = new Map();
        this.historicoPadroes = [];
        this.maxCacheSize = maxCacheSize;
        this.posicaoAtual = 0;
        this.stats = {
            totalRotacoes: 0,
            hitsCacheRotacao: 0,
            tempoMedioRotacao: 0,
            previsoesCertas: 0,
            previsoesTentadas: 0
        };
    }

    /**
     * Inicializa a estrutura circular com elementos
     * @param elementos array de elementos para inserir
     */
    public inicializar(elementos: T[]): void {
        this.elementos = elementos.map((valor, indice) => ({
            valor,
            indice,
            acessos: 0,
            ultimoAcesso: Date.now()
        }));
        this.posicaoAtual = 0;
        this.limparCache();
    }

    /**
     * Realiza rotação circular otimizada
     * @param posicoes número de posições para rotacionar (positivo = direita, negativo = esquerda)
     * @returns elemento na nova posição
     */
    public rotacionar(posicoes: number): ElementoCircular<T> | null {
        if (this.elementos.length === 0) {
            return null;
        }

        const inicio = performance.now();
        this.stats.totalRotacoes++;

        // Verificar cache primeiro
        const chaveCache = this.gerarChaveCache(posicoes);
        const rotacaoCache = this.cacheRotacoes.get(chaveCache);

        if (rotacaoCache && this.isCacheValido(rotacaoCache)) {
            this.stats.hitsCacheRotacao++;
            this.posicaoAtual = rotacaoCache.rotacaoEfetiva;
        } else {
            // Calcular rotação real
            const rotacaoEfetiva = this.calcularRotacaoEfetiva(posicoes);
            this.posicaoAtual = rotacaoEfetiva;

            // Salvar no cache
            this.salvarNoCache(chaveCache, posicoes, rotacaoEfetiva);
        }

        // Atualizar estatísticas do elemento acessado
        const elementoAtual = this.elementos[this.posicaoAtual];
        elementoAtual.acessos++;
        elementoAtual.ultimoAcesso = Date.now();

        // Registrar padrão para predição
        this.registrarPadrao(posicoes);

        // Atualizar tempo médio
        const tempoOperacao = performance.now() - inicio;
        this.atualizarTempoMedio(tempoOperacao);

        return elementoAtual;
    }

    /**
     * Rotaciona usando predição baseada no histórico
     * @param usarPredicao se deve tentar prever a próxima rotação
     * @returns elemento atual após rotação predita
     */
    public rotacaoInteligente(usarPredicao: boolean = true): ElementoCircular<T> | null {
        if (!usarPredicao || this.historicoPadroes.length < 3) {
            // Rotação padrão se não há dados suficientes
            return this.rotacionar(1);
        }

        const proximaRotacaoPrevisao = this.preverProximaRotacao();
        this.stats.previsoesTentadas++;

        const resultado = this.rotacionar(proximaRotacaoPrevisao);

        // Verificar se a predição foi eficiente (elemento tem poucos acessos = boa predição)
        if (resultado && resultado.acessos <= this.calcularMediaAcessos()) {
            this.stats.previsoesCertas++;
        }

        return resultado;
    }

    /**
     * Executa múltiplas rotações sequenciais otimizadas
     * @param sequenciaRotacoes array de rotações para executar
     * @returns array dos elementos acessados
     */
    public rotacaoSequencial(sequenciaRotacoes: number[]): ElementoCircular<T>[] {
        const resultados: ElementoCircular<T>[] = [];

        for (const rotacao of sequenciaRotacoes) {
            const resultado = this.rotacionar(rotacao);
            if (resultado) {
                resultados.push(resultado);
            }
        }

        return resultados;
    }

    /**
     * Busca o elemento mais próximo de um valor específico através de rotação
     * @param valorBuscado valor a ser encontrado
     * @param maxTentativas máximo de rotações para buscar
     * @returns elemento encontrado ou null
     */
    public buscarPorRotacao(valorBuscado: T, maxTentativas: number = 10): {
        elemento: ElementoCircular<T> | null,
        rotacoesUsadas: number,
        tempoGasto: number
    } {
        const inicio = performance.now();
        let rotacoesUsadas = 0;
        const posicaoInicial = this.posicaoAtual;

        // Estratégia: alternar direção para cobrir mais área
        for (let tentativa = 1; tentativa <= maxTentativas; tentativa++) {
            const direcao = tentativa % 2 === 1 ? 1 : -1;
            const passos = Math.ceil(tentativa / 2);

            const resultado = this.rotacionar(direcao * passos);
            rotacoesUsadas++;

            if (resultado && resultado.valor === valorBuscado) {
                return {
                    elemento: resultado,
                    rotacoesUsadas,
                    tempoGasto: performance.now() - inicio
                };
            }
        }

        // Restaurar posição original se não encontrou
        this.posicaoAtual = posicaoInicial;

        return {
            elemento: null,
            rotacoesUsadas,
            tempoGasto: performance.now() - inicio
        };
    }

    /**
     * Ordena elementos por frequência de acesso usando rotação
     * @returns array ordenado por acessos (mais acessado primeiro)
     */
    public obterRankingAcessos(): ElementoCircular<T>[] {
        return [...this.elementos].sort((a, b) => b.acessos - a.acessos);
    }

    /**
     * Analisa padrões de rotação para otimização
     * @returns análise dos padrões encontrados
     */
    public analisarPadroes(): {
        rotacaoMaisComum: number,
        frequenciaRotacoes: Map<number, number>,
        padraoSequencial: number[],
        eficienciaPredicao: number
    } {
        const frequencias = new Map<number, number>();
        
        this.historicoPadroes.forEach(rotacao => {
            frequencias.set(rotacao, (frequencias.get(rotacao) || 0) + 1);
        });

        const rotacaoMaisComum = [...frequencias.entries()]
            .sort(([,a], [,b]) => b - a)[0]?.[0] || 0;

        const padraoSequencial = this.detectarPadraoSequencial();
        
        const eficienciaPredicao = this.stats.previsoesTentadas > 0 ? 
            (this.stats.previsoesCertas / this.stats.previsoesTentadas) * 100 : 0;

        return {
            rotacaoMaisComum,
            frequenciaRotacoes: frequencias,
            padraoSequencial,
            eficienciaPredicao: Number(eficienciaPredicao.toFixed(2))
        };
    }

    /**
     * Otimiza o cache baseado no uso
     */
    public otimizarCache(): void {
        if (this.cacheRotacoes.size <= this.maxCacheSize) {
            return;
        }

        // Remove entradas mais antigas ou menos usadas
        const entradasOrdenadas = [...this.cacheRotacoes.entries()]
            .sort(([,a], [,b]) => a.timestamp - b.timestamp);

        const quantidadeRemover = this.cacheRotacoes.size - this.maxCacheSize;
        
        for (let i = 0; i < quantidadeRemover; i++) {
            this.cacheRotacoes.delete(entradasOrdenadas[i][0]);
        }
    }

    /**
     * Calcula rotação efetiva considerando o tamanho circular
     * @param posicoes número de posições solicitado
     * @returns posição efetiva no array
     */
    private calcularRotacaoEfetiva(posicoes: number): number {
        const tamanho = this.elementos.length;
        if (tamanho === 0) return 0;

        // Normalizar rotação para o range [0, tamanho-1]
        let novaPosicao = (this.posicaoAtual + posicoes) % tamanho;
        if (novaPosicao < 0) {
            novaPosicao = tamanho + novaPosicao;
        }

        return novaPosicao;
    }

    /**
     * Gera chave única para cache baseada no estado atual
     * @param posicoes número de posições para rotação
     * @returns chave única para cache
     */
    private gerarChaveCache(posicoes: number): string {
        return `${this.elementos.length}-${this.posicaoAtual}-${posicoes}`;
    }

    /**
     * Verifica se uma entrada de cache ainda é válida
     * @param entrada entrada do cache
     * @returns true se ainda é válida
     */
    private isCacheValido(entrada: CacheRotacao): boolean {
        const idadeMaxima = 60000; // 1 minuto
        const agora = Date.now();
        return (agora - entrada.timestamp) < idadeMaxima;
    }

    /**
     * Salva uma rotação no cache
     * @param chave chave para a entrada
     * @param rotacaoSolicitada rotação original solicitada
     * @param rotacaoEfetiva posição efetiva calculada
     */
    private salvarNoCache(chave: string, rotacaoSolicitada: number, rotacaoEfetiva: number): void {
        const entrada: CacheRotacao = {
            tamanhoOriginal: this.elementos.length,
            rotacaoSolicitada,
            rotacaoEfetiva,
            timestamp: Date.now()
        };

        this.cacheRotacoes.set(chave, entrada);
        this.otimizarCache();
    }

    /**
     * Registra um padrão de rotação para análise futura
     * @param rotacao rotação realizada
     */
    private registrarPadrao(rotacao: number): void {
        this.historicoPadroes.push(rotacao);
        
        // Manter apenas os últimos 50 padrões
        if (this.historicoPadroes.length > 50) {
            this.historicoPadroes.shift();
        }
    }

    /**
     * Prediz a próxima rotação baseada no histórico
     * @returns rotação prevista
     */
    private preverProximaRotacao(): number {
        if (this.historicoPadroes.length < 3) {
            return 1; // padrão
        }

        // Estratégia simples: média ponderada dos últimos movimentos
        const ultimos = this.historicoPadroes.slice(-5);
        const soma = ultimos.reduce((acc, val, index) => {
            const peso = index + 1; // últimos têm mais peso
            return acc + (val * peso);
        }, 0);

        const pesoTotal = ultimos.reduce((acc, _, index) => acc + (index + 1), 0);
        return Math.round(soma / pesoTotal);
    }

    /**
     * Detecta padrão sequencial nos movimentos
     * @returns padrão encontrado ou array vazio
     */
    private detectarPadraoSequencial(): number[] {
        if (this.historicoPadroes.length < 6) {
            return [];
        }

        const padroesTestados = [2, 3, 4]; // tamanhos de padrão para testar
        
        for (const tamanhoPadrao of padroesTestados) {
            const padraoCanditado = this.historicoPadroes.slice(-tamanhoPadrao);
            const inicioTeste = this.historicoPadroes.length - (tamanhoPadrao * 2);
            
            if (inicioTeste >= 0) {
                const padraoAnterior = this.historicoPadroes.slice(inicioTeste, inicioTeste + tamanhoPadrao);
                
                if (this.arraysIguais(padraoCanditado, padraoAnterior)) {
                    return padraoCanditado;
                }
            }
        }

        return [];
    }

    /**
     * Compara se dois arrays são iguais
     * @param arr1 primeiro array
     * @param arr2 segundo array
     * @returns true se são iguais
     */
    private arraysIguais(arr1: number[], arr2: number[]): boolean {
        return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
    }

    /**
     * Calcula média de acessos dos elementos
     * @returns média de acessos
     */
    private calcularMediaAcessos(): number {
        if (this.elementos.length === 0) return 0;
        const totalAcessos = this.elementos.reduce((acc, elem) => acc + elem.acessos, 0);
        return totalAcessos / this.elementos.length;
    }

    /**
     * Atualiza o tempo médio de operação
     * @param novoTempo tempo da última operação
     */
    private atualizarTempoMedio(novoTempo: number): void {
        const totalOperacoes = this.stats.totalRotacoes;
        this.stats.tempoMedioRotacao = ((this.stats.tempoMedioRotacao * (totalOperacoes - 1)) + novoTempo) / totalOperacoes;
    }

    /**
     * Limpa todo o cache
     */
    private limparCache(): void {
        this.cacheRotacoes.clear();
        this.historicoPadroes = [];
        this.stats = {
            totalRotacoes: 0,
            hitsCacheRotacao: 0,
            tempoMedioRotacao: 0,
            previsoesCertas: 0,
            previsoesTentadas: 0
        };
    }

    /**
     * Retorna estatísticas de performance
     * @returns estatísticas atuais
     */
    public getEstatisticas(): EstatisticasPerformance & {
        taxaCacheHit: number,
        tamanhoCache: number,
        posicaoAtual: number,
        totalElementos: number
    } {
        const taxaCacheHit = this.stats.totalRotacoes > 0 ? 
            (this.stats.hitsCacheRotacao / this.stats.totalRotacoes) * 100 : 0;

        return {
            ...this.stats,
            taxaCacheHit: Number(taxaCacheHit.toFixed(2)),
            tamanhoCache: this.cacheRotacoes.size,
            posicaoAtual: this.posicaoAtual,
            totalElementos: this.elementos.length
        };
    }

    /**
     * Retorna o elemento atual sem rotacionar
     * @returns elemento na posição atual
     */
    public getElementoAtual(): ElementoCircular<T> | null {
        return this.elementos[this.posicaoAtual] || null;
    }

    /**
     * Retorna todos os elementos com suas estatísticas
     * @returns array completo de elementos
     */
    public getElementos(): ElementoCircular<T>[] {
        return [...this.elementos];
    }

    /**
     * Reinicia o sistema mantendo os elementos
     */
    public reiniciar(): void {
        this.posicaoAtual = 0;
        this.elementos.forEach(elem => {
            elem.acessos = 0;
            elem.ultimoAcesso = Date.now();
        });
        this.limparCache();
    }
}