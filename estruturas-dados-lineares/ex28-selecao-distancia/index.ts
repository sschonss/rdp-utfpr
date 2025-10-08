import { SelecaoDistancia } from './SelecaoDistancia';

console.log('=== EXERCÍCIO 28 - SELEÇÃO POR DISTÂNCIA ===\n');

const selecionador = new SelecaoDistancia(0, 0, 100);

// Teste 1: Pontos em círculo com valores numéricos
console.log('🔵 Teste 1: Seleção em Círculo Numérico');
const valoresNumericos = [10, 25, 30, 5, 50, 15, 40, 35];
selecionador.adicionarPontosCirculares(valoresNumericos);

console.log('Pontos iniciais:');
const pontos = selecionador.getPontos();
pontos.forEach((p, i) => {
    console.log(`  P${p.id}: (${p.x}, ${p.y}) valor=${p.valor} dist=${p.distanciaAocentro}`);
});

const stats = selecionador.calcularEstatisticas();
console.log(`\nEstatísticas: ${stats.quantidadePontos} pontos, dist. média=${stats.distanciaMediaAocentro}, dispersão=${stats.dispersao}`);
console.log();

// Teste 2: Comparação de algoritmos
console.log('🔄 Teste 2: Comparação de Algoritmos');
const comparacao = selecionador.compararAlgoritmos(['vizinho', 'centro', 'dispersao', 'josephus']);

comparacao.forEach(comp => {
    const r = comp.resultado;
    console.log(`${comp.algoritmo.toUpperCase()}:`);
    console.log(`  Critério: ${r.criterio}`);
    console.log(`  Vencedor: P${r.pontoSelecionado.id} (${r.pontoSelecionado.x}, ${r.pontoSelecionado.y}) valor=${r.pontoSelecionado.valor}`);
    console.log(`  Distância: ${r.distancia}`);
    console.log(`  Tempo: ${r.tempoProcessamento}ms`);
    console.log(`  Eliminados: ${r.pontosEliminados.length} pontos`);
    console.log();
});

// Teste 3: Pontos customizados (formação em cruz)
console.log('✚ Teste 3: Formação em Cruz');
const pontosCruz = [
    {x: 0, y: 50, valor: 'Norte'},
    {x: 0, y: -50, valor: 'Sul'},
    {x: 50, y: 0, valor: 'Leste'},
    {x: -50, y: 0, valor: 'Oeste'},
    {x: 0, y: 0, valor: 'Centro'}
];

selecionador.reiniciar();
selecionador.adicionarPontosCustomizados(pontosCruz);

console.log('Pontos da cruz:');
selecionador.getPontos().forEach(p => {
    console.log(`  ${p.valor}: (${p.x}, ${p.y}) dist=${p.distanciaAocentro}`);
});

// Teste específico com seleção por vizinho distante
const resultadoCruz = selecionador.selecaoVizinhoDistante();
console.log(`\nVencedor (Vizinho Distante): ${resultadoCruz.pontoSelecionado.valor}`);
console.log(`Eliminação:`, resultadoCruz.pontosEliminados.map(p => p.valor).join(' → '));
console.log();

// Teste 4: Grande quantidade de pontos
console.log('🚀 Teste 4: Performance com Muitos Pontos (20 pontos)');
const valoresGrandes = Array.from({length: 20}, (_, i) => `Item${i + 1}`);
selecionador.reiniciar();
selecionador.adicionarPontosCirculares(valoresGrandes);

const inicioTeste = performance.now();
const resultadoGrande = selecionador.selecaoJosephusGeometrico(12);
const tempoTeste = performance.now() - inicioTeste;

console.log(`Processamento de ${valoresGrandes.length} pontos:`);
console.log(`  Vencedor: ${resultadoGrande.pontoSelecionado.valor}`);
console.log(`  Tempo total: ${tempoTeste.toFixed(2)}ms`);
console.log(`  Tempo algoritmo: ${resultadoGrande.tempoProcessamento}ms`);

// Mostrar algumas eliminações
const eliminacoes = resultadoGrande.pontosEliminados.slice(-5);
console.log(`  Últimas eliminações: ${eliminacoes.map(p => p.valor).join(' → ')}`);
console.log();

// Teste 5: Análise de diferentes fatores
console.log('📊 Teste 5: Análise de Fatores (Josephus Geométrico)');
const fatores = [5, 10, 15, 20];
const resultadosFatores: Array<{fator: number, vencedor: string, tempo: number}> = [];

selecionador.reiniciar();
selecionador.adicionarPontosCirculares(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);

for (const fator of fatores) {
    // Restaura pontos para cada teste
    selecionador.reiniciar();
    selecionador.adicionarPontosCirculares(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    
    const resultado = selecionador.selecaoJosephusGeometrico(fator);
    resultadosFatores.push({
        fator: fator,
        vencedor: resultado.pontoSelecionado.valor.toString(),
        tempo: resultado.tempoProcessamento
    });
}

console.log('Fator\tVencedor\tTempo(ms)');
console.log('-----\t--------\t---------');
resultadosFatores.forEach(r => {
    console.log(`${r.fator}\t${r.vencedor}\t\t${r.tempo}`);
});
console.log();

// Teste 6: Seleção por dispersão com diferentes limites
console.log('📐 Teste 6: Dispersão com Diferentes Limites');
selecionador.reiniciar();
selecionador.adicionarPontosCirculares([1, 2, 3, 4, 5, 6], 60);

const limitesDispersao = [10, 20, 30, 40];
limitesDispersao.forEach(limite => {
    // Restaura pontos
    selecionador.reiniciar();
    selecionador.adicionarPontosCirculares([1, 2, 3, 4, 5, 6], 60);
    
    const resultado = selecionador.selecaoDispersaoMaxima(limite);
    console.log(`Limite ${limite}: vencedor=${resultado.pontoSelecionado.valor}, eliminados=${resultado.pontosEliminados.length}`);
});
console.log();

// Teste 7: Análise estatística final
console.log('📈 Teste 7: Análise Estatística Final');
selecionador.reiniciar();

// Configuração especial: pontos com distâncias variadas
const pontosEspeciais = [
    {x: 10, y: 10, valor: 'Próximo'},
    {x: 80, y: 80, valor: 'Distante'},
    {x: -30, y: 40, valor: 'Médio1'},
    {x: 60, y: -20, valor: 'Médio2'},
    {x: 0, y: 0, valor: 'Centro'},
    {x: -70, y: -70, valor: 'Extremo'}
];

selecionador.adicionarPontosCustomizados(pontosEspeciais);

const statsFinais = selecionador.calcularEstatisticas();
console.log('Estatísticas da configuração especial:');
console.log(`  Pontos: ${statsFinais.quantidadePontos}`);
console.log(`  Distância média ao centro: ${statsFinais.distanciaMediaAocentro}`);
console.log(`  Distância máxima: ${statsFinais.distanciaMaxAocentro}`);
console.log(`  Distância mínima: ${statsFinais.distanciaMinAocentro}`);
console.log(`  Dispersão média: ${statsFinais.dispersao}`);

// Teste final com todos os algoritmos
console.log('\n🎯 Teste Final: Todos os Algoritmos na Configuração Especial');
const comparacaoFinal = selecionador.compararAlgoritmos();

console.log('Algoritmo\t\tVencedor\t\tTempo(ms)');
console.log('----------\t\t--------\t\t---------');
comparacaoFinal.forEach(comp => {
    const nome = comp.algoritmo.padEnd(12);
    const vencedor = comp.resultado.pontoSelecionado.valor.toString().padEnd(12);
    console.log(`${nome}\t${vencedor}\t${comp.resultado.tempoProcessamento}`);
});

// Histórico de todas as operações
const historicoCompleto = selecionador.getHistorico();
console.log(`\n📝 Total de operações realizadas: ${historicoCompleto.length}`);

console.log('\n✅ Exercício 28 concluído - Seleção por Distância implementada!');