/**
 * Representa um ponto no espaço 2D
 */
interface Ponto {
    x: number;
    y: number;
    id: number;
    valor: any;
    distanciaAocentro?: number;
}

/**
 * Resultado de uma seleção por distância
 */
interface ResultadoSelecao {
    pontoSelecionado: Ponto;
    criterio: string;
    distancia: number;
    pontosEliminados: Ponto[];
    tempoProcessamento: number;
}

/**
 * Implementação de algoritmos de seleção baseados em distância em círculo
 * Combina conceitos geométricos com eliminação circular
 */
export class SelecaoDistancia {
    private pontos: Ponto[];
    private centroX: number;
    private centroY: number;
    private raio: number;
    private historico: ResultadoSelecao[];

    constructor(centroX: number = 0, centroY: number = 0, raio: number = 100) {
        this.pontos = [];
        this.centroX = centroX;
        this.centroY = centroY;
        this.raio = raio;
        this.historico = [];
    }

    /**
     * Adiciona pontos distribuídos uniformemente em um círculo
     * @param valores valores associados aos pontos
     * @param raioInicial raio inicial para distribuição (padrão: 80% do raio máximo)
     */
    public adicionarPontosCirculares(valores: any[], raioInicial?: number): void {
        const raioDistribuicao = raioInicial || this.raio * 0.8;
        this.pontos = [];

        valores.forEach((valor, i) => {
            const angulo = (2 * Math.PI * i) / valores.length;
            const x = this.centroX + raioDistribuicao * Math.cos(angulo);
            const y = this.centroY + raioDistribuicao * Math.sin(angulo);
            
            const ponto: Ponto = {
                x: Number(x.toFixed(2)),
                y: Number(y.toFixed(2)),
                id: i + 1,
                valor: valor,
                distanciaAocentro: this.calcularDistancia(x, y, this.centroX, this.centroY)
            };

            this.pontos.push(ponto);
        });
    }

    /**
     * Adiciona pontos em posições específicas
     * @param coordenadas array de {x, y, valor}
     */
    public adicionarPontosCustomizados(coordenadas: Array<{x: number, y: number, valor: any}>): void {
        this.pontos = [];

        coordenadas.forEach((coord, i) => {
            const ponto: Ponto = {
                x: coord.x,
                y: coord.y,
                id: i + 1,
                valor: coord.valor,
                distanciaAocentro: this.calcularDistancia(coord.x, coord.y, this.centroX, this.centroY)
            };

            this.pontos.push(ponto);
        });
    }

    /**
     * Seleciona pontos usando o critério do vizinho mais distante
     * Remove iterativamente o ponto mais distante de seu vizinho mais próximo
     * @returns resultado da seleção
     */
    public selecaoVizinhoDistante(): ResultadoSelecao {
        const inicio = performance.now();
        const pontosRestantes = [...this.pontos];
        const eliminados: Ponto[] = [];
        let maxDistanciaVizinhoFinal = 0;

        while (pontosRestantes.length > 1) {
            let maxDistanciaVizinho = 0;
            let indiceParaRemover = 0;

            // Para cada ponto, encontra a distância ao vizinho mais próximo
            for (let i = 0; i < pontosRestantes.length; i++) {
                const pontoAtual = pontosRestantes[i];
                let menorDistancia = Infinity;

                // Encontra o vizinho mais próximo
                for (let j = 0; j < pontosRestantes.length; j++) {
                    if (i !== j) {
                        const distancia = this.calcularDistancia(
                            pontoAtual.x, pontoAtual.y,
                            pontosRestantes[j].x, pontosRestantes[j].y
                        );
                        menorDistancia = Math.min(menorDistancia, distancia);
                    }
                }

                // Se este ponto tem a maior distância ao seu vizinho mais próximo
                if (menorDistancia > maxDistanciaVizinho) {
                    maxDistanciaVizinho = menorDistancia;
                    indiceParaRemover = i;
                }
            }

            maxDistanciaVizinhoFinal = maxDistanciaVizinho;
            eliminados.push(pontosRestantes.splice(indiceParaRemover, 1)[0]);
        }

        const tempo = performance.now() - inicio;

        const resultado: ResultadoSelecao = {
            pontoSelecionado: pontosRestantes[0],
            criterio: 'Vizinho Mais Distante',
            distancia: maxDistanciaVizinhoFinal,
            pontosEliminados: eliminados,
            tempoProcessamento: Number(tempo.toFixed(3))
        };

        this.historico.push(resultado);
        return resultado;
    }

    /**
     * Seleciona usando eliminação por distância euclidiana ao centro
     * @param fatorEliminacao controla quantos pontos eliminar por rodada (1-5)
     * @returns resultado da seleção
     */
    public selecaoDistanciaAoCentro(fatorEliminacao: number = 2): ResultadoSelecao {
        const inicio = performance.now();
        const pontosRestantes = [...this.pontos];
        const eliminados: Ponto[] = [];

        while (pontosRestantes.length > 1) {
            // Ordena por distância ao centro (decrescente)
            pontosRestantes.sort((a, b) => (b.distanciaAocentro || 0) - (a.distanciaAocentro || 0));

            // Elimina os pontos mais distantes
            const quantidadeEliminar = Math.min(fatorEliminacao, pontosRestantes.length - 1);
            for (let i = 0; i < quantidadeEliminar; i++) {
                eliminados.push(pontosRestantes.shift()!);
            }
        }

        const tempo = performance.now() - inicio;

        const resultado: ResultadoSelecao = {
            pontoSelecionado: pontosRestantes[0],
            criterio: `Distância ao Centro (fator ${fatorEliminacao})`,
            distancia: pontosRestantes[0].distanciaAocentro || 0,
            pontosEliminados: eliminados,
            tempoProcessamento: Number(tempo.toFixed(3))
        };

        this.historico.push(resultado);
        return resultado;
    }

    /**
     * Seleciona usando o algoritmo de dispersão máxima
     * Elimina pontos que estão muito próximos uns dos outros
     * @param distanciaMinima distância mínima entre pontos
     * @returns resultado da seleção
     */
    public selecaoDispersaoMaxima(distanciaMinima: number = 20): ResultadoSelecao {
        const inicio = performance.now();
        const pontosRestantes = [...this.pontos];
        const eliminados: Ponto[] = [];
        let menorDistanciaFinal = Infinity;

        while (pontosRestantes.length > 1) {
            let menorDistancia = Infinity;
            let indicePar: [number, number] = [0, 1];

            // Encontra o par de pontos mais próximos
            for (let i = 0; i < pontosRestantes.length; i++) {
                for (let j = i + 1; j < pontosRestantes.length; j++) {
                    const distancia = this.calcularDistancia(
                        pontosRestantes[i].x, pontosRestantes[i].y,
                        pontosRestantes[j].x, pontosRestantes[j].y
                    );

                    if (distancia < menorDistancia) {
                        menorDistancia = distancia;
                        indicePar = [i, j];
                    }
                }
            }

            // Se a distância mínima foi atingida, para
            if (menorDistancia >= distanciaMinima) {
                menorDistanciaFinal = menorDistancia;
                break;
            }

            // Elimina o ponto com menor "valor de importância"
            const ponto1 = pontosRestantes[indicePar[0]];
            const ponto2 = pontosRestantes[indicePar[1]];
            
            // Critério: ponto mais próximo do centro é eliminado (menor importância)
            const eliminar = (ponto1.distanciaAocentro || 0) < (ponto2.distanciaAocentro || 0) ? 
                            indicePar[0] : indicePar[1];

            eliminados.push(pontosRestantes.splice(eliminar, 1)[0]);
            menorDistanciaFinal = menorDistancia;
        }

        const tempo = performance.now() - inicio;

        const resultado: ResultadoSelecao = {
            pontoSelecionado: pontosRestantes[0] || eliminados[eliminados.length - 1],
            criterio: `Dispersão Máxima (min: ${distanciaMinima})`,
            distancia: menorDistanciaFinal,
            pontosEliminados: eliminados,
            tempoProcessamento: Number(tempo.toFixed(3))
        };

        this.historico.push(resultado);
        return resultado;
    }

    /**
     * Seleciona usando eliminação circular com saltos baseados em distância
     * Combina Josephus com geometria: salto = distância_ao_centro / fator
     * @param fatorSalto divisor da distância para calcular saltos
     * @returns resultado da seleção
     */
    public selecaoJosephusGeometrico(fatorSalto: number = 10): ResultadoSelecao {
        const inicio = performance.now();
        const pontosRestantes = [...this.pontos];
        const eliminados: Ponto[] = [];
        let posicaoAtual = 0;

        while (pontosRestantes.length > 1) {
            const pontoAtual = pontosRestantes[posicaoAtual];
            const salto = Math.max(1, Math.floor((pontoAtual.distanciaAocentro || 50) / fatorSalto));

            // Calcula próxima posição de eliminação
            const proximaPos = (posicaoAtual + salto) % pontosRestantes.length;
            eliminados.push(pontosRestantes.splice(proximaPos, 1)[0]);

            // Ajusta posição atual
            if (proximaPos < pontosRestantes.length) {
                posicaoAtual = proximaPos;
            } else {
                posicaoAtual = 0;
            }
            posicaoAtual = posicaoAtual % pontosRestantes.length;
        }

        const tempo = performance.now() - inicio;

        const resultado: ResultadoSelecao = {
            pontoSelecionado: pontosRestantes[0],
            criterio: `Josephus Geométrico (fator ${fatorSalto})`,
            distancia: pontosRestantes[0].distanciaAocentro || 0,
            pontosEliminados: eliminados,
            tempoProcessamento: Number(tempo.toFixed(3))
        };

        this.historico.push(resultado);
        return resultado;
    }

    /**
     * Compara múltiplos algoritmos de seleção
     * @param algoritmos lista de algoritmos para executar
     * @returns comparação dos resultados
     */
    public compararAlgoritmos(algoritmos: string[] = ['vizinho', 'centro', 'dispersao', 'josephus']): 
        Array<{algoritmo: string, resultado: ResultadoSelecao}> {
        const comparacao: Array<{algoritmo: string, resultado: ResultadoSelecao}> = [];

        for (const algoritmo of algoritmos) {
            // Restaura pontos originais para cada teste
            const pontosOriginais = [...this.pontos];

            let resultado: ResultadoSelecao;

            switch (algoritmo) {
                case 'vizinho':
                    resultado = this.selecaoVizinhoDistante();
                    break;
                case 'centro':
                    resultado = this.selecaoDistanciaAoCentro(2);
                    break;
                case 'dispersao':
                    resultado = this.selecaoDispersaoMaxima(25);
                    break;
                case 'josephus':
                    resultado = this.selecaoJosephusGeometrico(15);
                    break;
                default:
                    continue;
            }

            comparacao.push({algoritmo, resultado});

            // Restaura pontos para próximo teste
            this.pontos = pontosOriginais;
        }

        return comparacao;
    }

    /**
     * Calcula distância euclidiana entre dois pontos
     * @param x1 coordenada x do primeiro ponto
     * @param y1 coordenada y do primeiro ponto
     * @param x2 coordenada x do segundo ponto
     * @param y2 coordenada y do segundo ponto
     * @returns distância euclidiana
     */
    private calcularDistancia(x1: number, y1: number, x2: number, y2: number): number {
        return Number(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)).toFixed(2));
    }

    /**
     * Retorna informações sobre os pontos atuais
     * @returns pontos atuais
     */
    public getPontos(): Ponto[] {
        return [...this.pontos];
    }

    /**
     * Retorna o histórico de seleções
     * @returns histórico completo
     */
    public getHistorico(): ResultadoSelecao[] {
        return [...this.historico];
    }

    /**
     * Calcula estatísticas dos pontos
     * @returns estatísticas básicas
     */
    public calcularEstatisticas(): {
        quantidadePontos: number,
        distanciaMediaAocentro: number,
        distanciaMaxAocentro: number,
        distanciaMinAocentro: number,
        dispersao: number
    } {
        if (this.pontos.length === 0) {
            return {
                quantidadePontos: 0,
                distanciaMediaAocentro: 0,
                distanciaMaxAocentro: 0,
                distanciaMinAocentro: 0,
                dispersao: 0
            };
        }

        const distancias = this.pontos.map(p => p.distanciaAocentro || 0);
        const distanciaMedia = distancias.reduce((a, b) => a + b, 0) / distancias.length;
        const distanciaMax = Math.max(...distancias);
        const distanciaMin = Math.min(...distancias);

        // Calcula dispersão média entre todos os pontos
        let somaDistancias = 0;
        let contadorPares = 0;

        for (let i = 0; i < this.pontos.length; i++) {
            for (let j = i + 1; j < this.pontos.length; j++) {
                somaDistancias += this.calcularDistancia(
                    this.pontos[i].x, this.pontos[i].y,
                    this.pontos[j].x, this.pontos[j].y
                );
                contadorPares++;
            }
        }

        const dispersao = contadorPares > 0 ? somaDistancias / contadorPares : 0;

        return {
            quantidadePontos: this.pontos.length,
            distanciaMediaAocentro: Number(distanciaMedia.toFixed(2)),
            distanciaMaxAocentro: Number(distanciaMax.toFixed(2)),
            distanciaMinAocentro: Number(distanciaMin.toFixed(2)),
            dispersao: Number(dispersao.toFixed(2))
        };
    }

    /**
     * Reinicia o sistema
     */
    public reiniciar(): void {
        this.pontos = [];
        this.historico = [];
    }
}