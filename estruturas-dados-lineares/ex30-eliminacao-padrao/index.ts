import { EliminacaoPadrao } from './EliminacaoPadrao';

console.log('=== EXERCÍCIO 30 - ELIMINAÇÃO POR PADRÃO MATEMÁTICO ===\n');

const eliminador = new EliminacaoPadrao();

// Teste 1: Análise inicial de padrões
console.log('🔢 Teste 1: Análise de Padrões');
const numerosTestе = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 21, 25, 28, 36, 49, 64, 81, 100];
eliminador.inicializar(numerosTestе);

console.log('Números analisados:', numerosTestе.join(', '));

const elementos = eliminador.getElementos();
console.log('\nPadrões identificados:');
elementos.forEach(elem => {
    if (elem.tiposPadrao.length > 0) {
        console.log(`  ${elem.valor}: ${elem.tiposPadrao.join(', ')} (multiplicidade: ${elem.multiplicidade})`);
    }
});

const eficiencia = eliminador.analisarEficienciaPatroes();
console.log('\nEficiência dos padrões:');
Object.entries(eficiencia).forEach(([padrao, stats]) => {
    if (stats.quantidade > 0) {
        console.log(`  ${padrao}: ${stats.quantidade} números (${stats.percentual}%)`);
    }
});
console.log();

// Teste 2: Eliminação por Fibonacci
console.log('🌀 Teste 2: Eliminação por Fibonacci');
eliminador.reiniciar();
eliminador.inicializar([1, 1, 2, 3, 5, 8, 13, 21, 4, 6, 7, 9, 10, 11, 12, 14, 15]);

console.log('Números:', eliminador.getElementos().map(e => e.valor).join(', '));

const resultadoFib = eliminador.eliminacaoFibonacci(true);
console.log(`\nSobrevivente (mantendo Fibonacci): ${resultadoFib.elementoSobrevivente.valor}`);
console.log(`Eliminados: ${resultadoFib.sequenciaEliminacao.map(e => e.valor).join(' → ')}`);
console.log(`Tempo: ${resultadoFib.tempoProcessamento}ms`);
console.log(`Eficiência do padrão: ${resultadoFib.eficienciaPadrao}%`);
console.log();

// Teste 3: Eliminação por números primos
console.log('🔱 Teste 3: Eliminação por Primos');
eliminador.reiniciar();
eliminador.inicializar([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

const estrategiasPrimos = ['manter-primos', 'eliminar-primos', 'josephus-primo'] as const;
estrategiasPrimos.forEach(estrategia => {
    eliminador.reiniciar();
    eliminador.inicializar([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    
    const resultado = eliminador.eliminacaoPrimos(estrategia);
    console.log(`${estrategia}: sobrevivente = ${resultado.elementoSobrevivente.valor}, eliminados = ${resultado.sequenciaEliminacao.length}`);
});
console.log();

// Teste 4: Eliminação por números perfeitos
console.log('💎 Teste 4: Eliminação por Números Perfeitos');
eliminador.reiniciar();
eliminador.inicializar([1, 6, 28, 496, 8128, 4, 8, 12, 16, 20, 24, 30, 32, 36, 40]);

const resultadoPerfeito = eliminador.eliminacaoPerfeitos();
console.log(`Sobrevivente: ${resultadoPerfeito.elementoSobrevivente.valor}`);
console.log(`Padrões do sobrevivente: ${resultadoPerfeito.elementoSobrevivente.tiposPadrao.join(', ') || 'nenhum'}`);
console.log(`Multiplicidade: ${resultadoPerfeito.elementoSobrevivente.multiplicidade}`);
console.log(`Eliminação: ${resultadoPerfeito.sequenciaEliminacao.slice(0, 5).map(e => e.valor).join(' → ')}${resultadoPerfeito.sequenciaEliminacao.length > 5 ? '...' : ''}`);
console.log();

// Teste 5: Eliminação geométrica
console.log('📐 Teste 5: Eliminação Geométrica');
const numerosGeometricos = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 1, 8, 27, 125, 216, 3, 6, 10, 15, 21, 28];
eliminador.reiniciar();
eliminador.inicializar(numerosGeometricos);

const tiposGeometricos = ['triangular', 'quadrado', 'cubo'] as const;
tiposGeometricos.forEach(tipo => {
    eliminador.reiniciar();
    eliminador.inicializar(numerosGeometricos);
    
    const resultado = eliminador.eliminacaoGeometrica(tipo);
    console.log(`${tipo.toUpperCase()}:`);
    console.log(`  Sobrevivente: ${resultado.elementoSobrevivente.valor} (padrões: ${resultado.elementoSobrevivente.tiposPadrao.join(', ') || 'nenhum'})`);
    console.log(`  Tempo: ${resultado.tempoProcessamento}ms`);
    console.log(`  Eficiência: ${resultado.eficienciaPadrao}%`);
});
console.log();

// Teste 6: Eliminação multi-padrão
console.log('🌈 Teste 6: Eliminação Multi-Padrão');
const numerosCompletos = Array.from({length: 50}, (_, i) => i + 1);
eliminador.reiniciar();
eliminador.inicializar(numerosCompletos);

console.log(`Conjunto de teste: números de 1 a ${numerosCompletos.length}`);

const estrategiasMulti = ['intersecao', 'uniao', 'sequencial'] as const;
const padroesCombinados: ('fibonacci' | 'primo' | 'quadrado')[] = ['fibonacci', 'primo', 'quadrado'];

estrategiasMulti.forEach(estrategia => {
    eliminador.reiniciar();
    eliminador.inicializar(numerosCompletos);
    
    const resultado = eliminador.eliminacaoMultipadrao(padroesCombinados, estrategia);
    console.log(`Estratégia ${estrategia.toUpperCase()}:`);
    console.log(`  Sobrevivente: ${resultado.elementoSobrevivente.valor}`);
    console.log(`  Padrões: ${resultado.elementoSobrevivente.tiposPadrao.join(', ') || 'nenhum'}`);
    console.log(`  Eliminados: ${resultado.sequenciaEliminacao.length}`);
    console.log(`  Tempo: ${resultado.tempoProcessamento}ms`);
});
console.log();

// Teste 7: Performance com números grandes
console.log('🚀 Teste 7: Performance com Números Grandes');
const numerosGrandes = Array.from({length: 200}, (_, i) => (i + 1) * 7); // Múltiplos de 7
eliminador.reiniciar();
eliminador.inicializar(numerosGrandes);

const inicio = performance.now();
const resultadoGrande = eliminador.eliminacaoFibonacci(true);
const tempoTotal = performance.now() - inicio;

console.log(`Processamento de ${numerosGrandes.length} números:`);
console.log(`  Sobrevivente: ${resultadoGrande.elementoSobrevivente.valor}`);
console.log(`  Tempo total: ${tempoTotal.toFixed(2)}ms`);
console.log(`  Tempo algoritmo: ${resultadoGrande.tempoProcessamento}ms`);
console.log(`  Eficiência Fibonacci: ${resultadoGrande.eficienciaPadrao}%`);

const eficienciaGrande = eliminador.analisarEficienciaPatroes();
console.log('  Padrões encontrados:');
Object.entries(eficienciaGrande).forEach(([padrao, stats]) => {
    if (stats.quantidade > 0) {
        console.log(`    ${padrao}: ${stats.quantidade} (${stats.percentual}%)`);
    }
});
console.log();

// Teste 8: Comparação de eficiência entre padrões
console.log('📊 Teste 8: Comparação de Eficiência');
const numerosComparacao = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 25, 36, 49, 64, 81, 100];

const resultadosComparacao: Array<{padrao: string, sobrevivente: number, tempo: number, eficiencia: number}> = [];

// Teste Fibonacci
eliminador.reiniciar();
eliminador.inicializar(numerosComparacao);
const fibResult = eliminador.eliminacaoFibonacci(true);
resultadosComparacao.push({
    padrao: 'Fibonacci',
    sobrevivente: fibResult.elementoSobrevivente.valor,
    tempo: fibResult.tempoProcessamento,
    eficiencia: fibResult.eficienciaPadrao
});

// Teste Primos
eliminador.reiniciar();
eliminador.inicializar(numerosComparacao);
const primoResult = eliminador.eliminacaoPrimos('josephus-primo');
resultadosComparacao.push({
    padrao: 'Primos',
    sobrevivente: primoResult.elementoSobrevivente.valor,
    tempo: primoResult.tempoProcessamento,
    eficiencia: primoResult.eficienciaPadrao
});

// Teste Quadrados
eliminador.reiniciar();
eliminador.inicializar(numerosComparacao);
const quadResult = eliminador.eliminacaoGeometrica('quadrado');
resultadosComparacao.push({
    padrao: 'Quadrados',
    sobrevivente: quadResult.elementoSobrevivente.valor,
    tempo: quadResult.tempoProcessamento,
    eficiencia: quadResult.eficienciaPadrao
});

console.log('Comparação de Padrões:');
console.log('Padrão\t\tSobrevivente\tTempo(ms)\tEficiência(%)');
console.log('------\t\t-----------\t---------\t------------');
resultadosComparacao.forEach(r => {
    console.log(`${r.padrao.padEnd(12)}\t${r.sobrevivente}\t\t${r.tempo}\t\t${r.eficiencia}`);
});

// Encontrar o mais eficiente
const maisEficiente = resultadosComparacao.reduce((melhor, atual) => 
    atual.eficiencia > melhor.eficiencia ? atual : melhor
);
console.log(`\n🏆 Padrão mais eficiente: ${maisEficiente.padrao} (${maisEficiente.eficiencia}%)`);

// Teste 9: Casos extremos
console.log('\n⚡ Teste 9: Casos Extremos');

// Apenas números primos
const apenasPrimos = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
eliminador.reiniciar();
eliminador.inicializar(apenasPrimos);
const resultPrimos = eliminador.eliminacaoPrimos('manter-primos');
console.log(`Apenas primos - Sobrevivente: ${resultPrimos.elementoSobrevivente.valor}`);

// Apenas números compostos
const apenasCompostos = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28];
eliminador.reiniciar();
eliminador.inicializar(apenasCompostos);
const resultCompostos = eliminador.eliminacaoPrimos('eliminar-primos');
console.log(`Apenas compostos - Sobrevivente: ${resultCompostos.elementoSobrevivente.valor}`);

// Apenas quadrados perfeitos
const apenasQuadrados = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
eliminador.reiniciar();
eliminador.inicializar(apenasQuadrados);
const resultQuadrados = eliminador.eliminacaoGeometrica('quadrado');
console.log(`Apenas quadrados - Sobrevivente: ${resultQuadrados.elementoSobrevivente.valor}`);

// Histórico final
const historicoCompleto = eliminador.getHistorico();
console.log(`\n📝 Total de eliminações realizadas: ${historicoCompleto.length}`);

// Resumo de tempos
const tempoMedio = historicoCompleto.reduce((soma, h) => soma + h.tempoProcessamento, 0) / historicoCompleto.length;
console.log(`⏱️ Tempo médio por eliminação: ${tempoMedio.toFixed(3)}ms`);

console.log('\n✅ Exercício 30 concluído - Eliminação por Padrão Matemático implementada!');