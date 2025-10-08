/**
 * Tipo de padrão matemático disponível
 */
type TipoPadrao = 'fibonacci' | 'primo' | 'perfeito' | 'triangular' | 'quadrado' | 'cubo' | 'catalan' | 'factorial';

/**
 * Representa um elemento com padrão matemático
 */
interface ElementoPadrao {
    valor: number;
    indice: number;
    pertencePadrao: boolean;
    tiposPadrao: TipoPadrao[];
    multiplicidade: number; // quantos padrões o elemento satisfaz
}

/**
 * Resultado de uma eliminação por padrão
 */
interface ResultadoEliminacao {
    elementoSobrevivente: ElementoPadrao;
    sequenciaEliminacao: ElementoPadrao[];
    padraoUsado: TipoPadrao;
    tempoProcessamento: number;
    eficienciaPadrao: number; // percentual de elementos que satisfazem o padrão
}

/**
 * Implementação de eliminação baseada em padrões matemáticos
 * Combina teoria dos números com algoritmos de eliminação circular
 */
export class EliminacaoPadrao {
    private elementos: ElementoPadrao[];
    private cachePatterns: Map<string, boolean>;
    private historico: ResultadoEliminacao[];

    constructor() {
        this.elementos = [];
        this.cachePatterns = new Map();
        this.historico = [];
    }

    /**
     * Inicializa elementos analisando padrões matemáticos
     * @param valores array de números para analisar
     */
    public inicializar(valores: number[]): void {
        this.elementos = valores.map((valor, indice) => {
            const padroes = this.analisarPadroes(valor);
            return {
                valor,
                indice,
                pertencePadrao: padroes.length > 0,
                tiposPadrao: padroes,
                multiplicidade: padroes.length
            };
        });
    }

    /**
     * Elimina elementos baseado no padrão de Fibonacci
     * Mantém apenas números que são ou não são de Fibonacci
     * @param manterFibonacci se true, mantém Fibonacci; se false, elimina Fibonacci
     * @returns resultado da eliminação
     */
    public eliminacaoFibonacci(manterFibonacci: boolean = true): ResultadoEliminacao {
        const inicio = performance.now();
        const elementosRestantes = [...this.elementos];
        const eliminados: ElementoPadrao[] = [];

        // Filtrar baseado em Fibonacci
        for (let i = elementosRestantes.length - 1; i >= 0; i--) {
            const elemento = elementosRestantes[i];
            const ehFibonacci = elemento.tiposPadrao.includes('fibonacci');

            if ((manterFibonacci && !ehFibonacci) || (!manterFibonacci && ehFibonacci)) {
                eliminados.unshift(elementosRestantes.splice(i, 1)[0]);
            }
        }

        // Se sobrou mais de um, aplica eliminação circular por posição Fibonacci
        if (elementosRestantes.length > 1) {
            const fibEliminacao = this.aplicarEliminacaoFibonacci(elementosRestantes, eliminados);
            elementosRestantes.splice(0, elementosRestantes.length, ...fibEliminacao.restantes);
            eliminados.push(...fibEliminacao.eliminados);
        }

        const tempo = performance.now() - inicio;
        const resultado = this.criarResultado(elementosRestantes[0], eliminados, 'fibonacci', tempo);
        this.historico.push(resultado);
        return resultado;
    }

    /**
     * Elimina elementos baseado em números primos
     * @param estrategia 'manter-primos', 'eliminar-primos', ou 'josephus-primo'
     * @returns resultado da eliminação
     */
    public eliminacaoPrimos(estrategia: 'manter-primos' | 'eliminar-primos' | 'josephus-primo' = 'josephus-primo'): ResultadoEliminacao {
        const inicio = performance.now();
        let elementosRestantes = [...this.elementos];
        const eliminados: ElementoPadrao[] = [];

        if (estrategia === 'manter-primos' || estrategia === 'eliminar-primos') {
            const manterPrimos = estrategia === 'manter-primos';
            
            for (let i = elementosRestantes.length - 1; i >= 0; i--) {
                const elemento = elementosRestantes[i];
                const ehPrimo = elemento.tiposPadrao.includes('primo');

                if ((manterPrimos && !ehPrimo) || (!manterPrimos && ehPrimo)) {
                    eliminados.unshift(elementosRestantes.splice(i, 1)[0]);
                }
            }
        }

        // Josephus usando números primos como salto
        if (elementosRestantes.length > 1) {
            const proximoPrimo = this.obterProximoPrimo(elementosRestantes.length);
            const resultadoJosephus = this.josephusComSalto(elementosRestantes, proximoPrimo);
            elementosRestantes = [resultadoJosephus.sobrevivente];
            eliminados.push(...resultadoJosephus.eliminados);
        }

        const tempo = performance.now() - inicio;
        const resultado = this.criarResultado(elementosRestantes[0], eliminados, 'primo', tempo);
        this.historico.push(resultado);
        return resultado;
    }

    /**
     * Elimina baseado em números perfeitos e seus múltiplos
     * @returns resultado da eliminação
     */
    public eliminacaoPerfeitos(): ResultadoEliminacao {
        const inicio = performance.now();
        let elementosRestantes = [...this.elementos];
        const eliminados: ElementoPadrao[] = [];

        // Primeira fase: eliminar números perfeitos em ordem crescente
        const numerosPerfeitos = elementosRestantes
            .filter(elem => elem.tiposPadrao.includes('perfeito'))
            .sort((a, b) => a.valor - b.valor);

        for (const perfeito of numerosPerfeitos) {
            const indice = elementosRestantes.findIndex(elem => elem.valor === perfeito.valor);
            if (indice !== -1) {
                eliminados.push(elementosRestantes.splice(indice, 1)[0]);
            }
        }

        // Segunda fase: eliminação por multiplicidade de padrões
        while (elementosRestantes.length > 1) {
            // Encontra elemento com menor multiplicidade
            let menorMultiplicidade = Infinity;
            let indiceEliminar = 0;

            elementosRestantes.forEach((elem, i) => {
                if (elem.multiplicidade < menorMultiplicidade) {
                    menorMultiplicidade = elem.multiplicidade;
                    indiceEliminar = i;
                }
            });

            eliminados.push(elementosRestantes.splice(indiceEliminar, 1)[0]);
        }

        const tempo = performance.now() - inicio;
        const resultado = this.criarResultado(elementosRestantes[0], eliminados, 'perfeito', tempo);
        this.historico.push(resultado);
        return resultado;
    }

    /**
     * Elimina baseado em padrões geométricos (triangulares, quadrados, cubos)
     * @param tipoPadrao tipo de padrão geométrico
     * @returns resultado da eliminação
     */
    public eliminacaoGeometrica(tipoPadrao: 'triangular' | 'quadrado' | 'cubo'): ResultadoEliminacao {
        const inicio = performance.now();
        let elementosRestantes = [...this.elementos];
        const eliminados: ElementoPadrao[] = [];

        // Agrupa elementos por padrão geométrico
        const comPadrao = elementosRestantes.filter(elem => elem.tiposPadrao.includes(tipoPadrao));
        const semPadrao = elementosRestantes.filter(elem => !elem.tiposPadrao.includes(tipoPadrao));

        // Elimina alternadamente entre grupos
        let turnoComPadrao = true;
        
        while (comPadrao.length > 0 && semPadrao.length > 0) {
            if (turnoComPadrao && comPadrao.length > 0) {
                eliminados.push(comPadrao.shift()!);
            } else if (!turnoComPadrao && semPadrao.length > 0) {
                eliminados.push(semPadrao.shift()!);
            }
            turnoComPadrao = !turnoComPadrao;
        }

        // Adiciona elementos restantes
        elementosRestantes = [...comPadrao, ...semPadrao];

        // Se ainda há múltiplos elementos, usa eliminação por valor geométrico
        if (elementosRestantes.length > 1) {
            const saltoGeometrico = this.calcularSaltoGeometrico(tipoPadrao, elementosRestantes.length);
            const resultadoJosephus = this.josephusComSalto(elementosRestantes, saltoGeometrico);
            elementosRestantes = [resultadoJosephus.sobrevivente];
            eliminados.push(...resultadoJosephus.eliminados);
        }

        const tempo = performance.now() - inicio;
        const resultado = this.criarResultado(elementosRestantes[0], eliminados, tipoPadrao, tempo);
        this.historico.push(resultado);
        return resultado;
    }

    /**
     * Elimina usando múltiplos padrões combinados
     * @param padroes array de padrões para combinar
     * @param estrategia como combinar os padrões
     * @returns resultado da eliminação
     */
    public eliminacaoMultipadrao(
        padroes: TipoPadrao[], 
        estrategia: 'intersecao' | 'uniao' | 'sequencial' = 'sequencial'
    ): ResultadoEliminacao {
        const inicio = performance.now();
        let elementosRestantes = [...this.elementos];
        const eliminados: ElementoPadrao[] = [];

        if (estrategia === 'sequencial') {
            // Aplica cada padrão sequencialmente
            for (const padrao of padroes) {
                if (elementosRestantes.length <= 1) break;

                const resultadoParcial = this.aplicarPadraoUnico(elementosRestantes, padrao);
                elementosRestantes = resultadoParcial.restantes;
                eliminados.push(...resultadoParcial.eliminados);
            }
        } else {
            // Filtra por intersecção ou união
            for (let i = elementosRestantes.length - 1; i >= 0; i--) {
                const elemento = elementosRestantes[i];
                let deveEliminar = false;

                if (estrategia === 'intersecao') {
                    // Elemento deve ter TODOS os padrões
                    deveEliminar = !padroes.every(padrao => elemento.tiposPadrao.includes(padrao));
                } else if (estrategia === 'uniao') {
                    // Elemento deve ter PELO MENOS UM padrão
                    deveEliminar = !padroes.some(padrao => elemento.tiposPadrao.includes(padrao));
                }

                if (deveEliminar) {
                    eliminados.unshift(elementosRestantes.splice(i, 1)[0]);
                }
            }
        }

        // Eliminação final se necessário
        if (elementosRestantes.length > 1) {
            const saltoFinal = padroes.length;
            const resultadoFinal = this.josephusComSalto(elementosRestantes, saltoFinal);
            elementosRestantes = [resultadoFinal.sobrevivente];
            eliminados.push(...resultadoFinal.eliminados);
        }

        const tempo = performance.now() - inicio;
        const tipoFinal = padroes.length > 0 ? padroes[0] : 'fibonacci';
        const resultado = this.criarResultado(elementosRestantes[0], eliminados, tipoFinal, tempo);
        this.historico.push(resultado);
        return resultado;
    }

    /**
     * Analisa todos os padrões matemáticos de um número
     * @param numero número para analisar
     * @returns array de padrões que o número satisfaz
     */
    private analisarPadroes(numero: number): TipoPadrao[] {
        const padroes: TipoPadrao[] = [];

        if (this.ehFibonacci(numero)) padroes.push('fibonacci');
        if (this.ehPrimo(numero)) padroes.push('primo');
        if (this.ehPerfeito(numero)) padroes.push('perfeito');
        if (this.ehTriangular(numero)) padroes.push('triangular');
        if (this.ehQuadradoPerfeito(numero)) padroes.push('quadrado');
        if (this.ehCuboPerfeito(numero)) padroes.push('cubo');
        if (this.ehCatalan(numero)) padroes.push('catalan');
        if (this.ehFactorial(numero)) padroes.push('factorial');

        return padroes;
    }

    /**
     * Verifica se um número é de Fibonacci
     */
    private ehFibonacci(n: number): boolean {
        const chave = `fib-${n}`;
        if (this.cachePatterns.has(chave)) {
            return this.cachePatterns.get(chave)!;
        }

        const resultado = this.ehQuadradoPerfeito(5 * n * n + 4) || this.ehQuadradoPerfeito(5 * n * n - 4);
        this.cachePatterns.set(chave, resultado);
        return resultado;
    }

    /**
     * Verifica se um número é primo
     */
    private ehPrimo(n: number): boolean {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;

        const chave = `primo-${n}`;
        if (this.cachePatterns.has(chave)) {
            return this.cachePatterns.get(chave)!;
        }

        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i === 0) {
                this.cachePatterns.set(chave, false);
                return false;
            }
        }

        this.cachePatterns.set(chave, true);
        return true;
    }

    /**
     * Verifica se um número é perfeito
     */
    private ehPerfeito(n: number): boolean {
        if (n < 2) return false;
        
        let soma = 1;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                soma += i;
                if (i !== n / i) {
                    soma += n / i;
                }
            }
        }
        return soma === n;
    }

    /**
     * Verifica se um número é triangular
     */
    private ehTriangular(n: number): boolean {
        const discriminante = 8 * n + 1;
        const raiz = Math.sqrt(discriminante);
        return raiz === Math.floor(raiz);
    }

    /**
     * Verifica se um número é quadrado perfeito
     */
    private ehQuadradoPerfeito(n: number): boolean {
        const raiz = Math.sqrt(n);
        return raiz === Math.floor(raiz);
    }

    /**
     * Verifica se um número é cubo perfeito
     */
    private ehCuboPerfeito(n: number): boolean {
        const raiz = Math.cbrt(n);
        return Math.abs(raiz - Math.round(raiz)) < 1e-10;
    }

    /**
     * Verifica se um número é de Catalan
     */
    private ehCatalan(n: number): boolean {
        const catalanNumbers = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796, 58786];
        return catalanNumbers.includes(n);
    }

    /**
     * Verifica se um número é factorial
     */
    private ehFactorial(n: number): boolean {
        if (n < 1) return false;
        let fatorial = 1;
        let i = 1;
        while (fatorial < n) {
            i++;
            fatorial *= i;
        }
        return fatorial === n;
    }

    /**
     * Obtém o próximo número primo maior ou igual a n
     */
    private obterProximoPrimo(n: number): number {
        while (!this.ehPrimo(n)) {
            n++;
        }
        return n;
    }

    /**
     * Calcula salto geométrico baseado no tipo de padrão
     */
    private calcularSaltoGeometrico(tipo: 'triangular' | 'quadrado' | 'cubo', tamanho: number): number {
        switch (tipo) {
            case 'triangular':
                return Math.floor((tamanho * (tamanho + 1)) / 2) % tamanho || 1;
            case 'quadrado':
                return (tamanho * tamanho) % tamanho || 2;
            case 'cubo':
                return (tamanho * tamanho * tamanho) % tamanho || 3;
        }
    }

    /**
     * Aplica eliminação Fibonacci recursiva
     */
    private aplicarEliminacaoFibonacci(elementos: ElementoPadrao[], eliminados: ElementoPadrao[]): 
        {restantes: ElementoPadrao[], eliminados: ElementoPadrao[]} {
        
        if (elementos.length <= 1) {
            return {restantes: elementos, eliminados: []};
        }

        const novaEliminacao: ElementoPadrao[] = [];
        const fib = this.gerarFibonacci(elementos.length);
        const saltoFib = fib[fib.length - 1] % elementos.length || 1;

        const resultado = this.josephusComSalto(elementos, saltoFib);
        return {
            restantes: [resultado.sobrevivente],
            eliminados: resultado.eliminados
        };
    }

    /**
     * Gera sequência de Fibonacci até um limite
     */
    private gerarFibonacci(limite: number): number[] {
        const fib = [1, 1];
        while (fib[fib.length - 1] < limite) {
            const proximo = fib[fib.length - 1] + fib[fib.length - 2];
            fib.push(proximo);
        }
        return fib;
    }

    /**
     * Implementa Josephus com salto específico
     */
    private josephusComSalto(elementos: ElementoPadrao[], salto: number): 
        {sobrevivente: ElementoPadrao, eliminados: ElementoPadrao[]} {
        
        const copia = [...elementos];
        const eliminados: ElementoPadrao[] = [];
        let posicao = 0;

        while (copia.length > 1) {
            posicao = (posicao + salto - 1) % copia.length;
            eliminados.push(copia.splice(posicao, 1)[0]);
            
            if (posicao >= copia.length && copia.length > 0) {
                posicao = 0;
            }
        }

        return {
            sobrevivente: copia[0],
            eliminados
        };
    }

    /**
     * Aplica um padrão único a uma lista de elementos
     */
    private aplicarPadraoUnico(elementos: ElementoPadrao[], padrao: TipoPadrao): 
        {restantes: ElementoPadrao[], eliminados: ElementoPadrao[]} {
        
        const eliminados: ElementoPadrao[] = [];
        const restantes = elementos.filter(elem => {
            if (!elem.tiposPadrao.includes(padrao)) {
                eliminados.push(elem);
                return false;
            }
            return true;
        });

        return {restantes, eliminados};
    }

    /**
     * Cria objeto de resultado padronizado
     */
    private criarResultado(
        sobrevivente: ElementoPadrao, 
        eliminados: ElementoPadrao[], 
        padrao: TipoPadrao, 
        tempo: number
    ): ResultadoEliminacao {
        const totalElementos = this.elementos.length;
        const elementosComPadrao = this.elementos.filter(elem => elem.tiposPadrao.includes(padrao)).length;
        const eficiencia = (elementosComPadrao / totalElementos) * 100;

        return {
            elementoSobrevivente: sobrevivente,
            sequenciaEliminacao: eliminados,
            padraoUsado: padrao,
            tempoProcessamento: Number(tempo.toFixed(3)),
            eficienciaPadrao: Number(eficiencia.toFixed(2))
        };
    }

    /**
     * Retorna elementos atuais com suas análises
     * @returns elementos analisados
     */
    public getElementos(): ElementoPadrao[] {
        return [...this.elementos];
    }

    /**
     * Retorna histórico de eliminações
     * @returns histórico completo
     */
    public getHistorico(): ResultadoEliminacao[] {
        return [...this.historico];
    }

    /**
     * Analisa eficiência dos padrões nos elementos atuais
     * @returns estatísticas dos padrões
     */
    public analisarEficienciaPatroes(): {[padrao in TipoPadrao]: {quantidade: number, percentual: number}} {
        const total = this.elementos.length;
        const analise = {} as {[padrao in TipoPadrao]: {quantidade: number, percentual: number}};

        const padroes: TipoPadrao[] = ['fibonacci', 'primo', 'perfeito', 'triangular', 'quadrado', 'cubo', 'catalan', 'factorial'];

        padroes.forEach(padrao => {
            const quantidade = this.elementos.filter(elem => elem.tiposPadrao.includes(padrao)).length;
            analise[padrao] = {
                quantidade,
                percentual: Number(((quantidade / total) * 100).toFixed(2))
            };
        });

        return analise;
    }

    /**
     * Limpa cache e reinicia
     */
    public reiniciar(): void {
        this.elementos = [];
        this.cachePatterns.clear();
        this.historico = [];
    }
}