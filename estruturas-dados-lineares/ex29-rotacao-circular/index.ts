import { RotacaoCircular } from './RotacaoCircular';

console.log('=== EXERCÍCIO 29 - ROTAÇÃO CIRCULAR INTELIGENTE ===\n');

// Teste 1: Inicialização e rotações básicas
console.log('🔄 Teste 1: Rotações Básicas');
const rotador = new RotacaoCircular<string>(50);
const cores = ['Vermelho', 'Azul', 'Verde', 'Amarelo', 'Roxo', 'Laranja'];
rotador.inicializar(cores);

console.log('Configuração inicial:', cores.join(' → '));
console.log(`Posição inicial: ${rotador.getElementoAtual()?.valor}\n`);

// Teste de rotações sequenciais
const rotacoes = [2, -1, 3, 1, -2, 4];
console.log('Executando rotações:', rotacoes.join(', '));

rotacoes.forEach((rot, i) => {
    const resultado = rotador.rotacionar(rot);
    console.log(`  Rotação ${rot}: ${resultado?.valor} (acessos: ${resultado?.acessos})`);
});

const stats1 = rotador.getEstatisticas();
console.log(`\nEstatísticas: ${stats1.totalRotacoes} rotações, cache hit: ${stats1.taxaCacheHit}%\n`);

// Teste 2: Rotação inteligente com predição
console.log('🤖 Teste 2: Rotação Inteligente');
rotador.reiniciar();

// Criar um padrão repetitivo para testar predição
const padraoRotacoes = [1, 1, 2, 1, 1, 2, 1, 1, 2];
console.log('Criando padrão:', padraoRotacoes.join(' → '));

padraoRotacoes.forEach(rot => {
    rotador.rotacionar(rot);
});

// Agora testar predições
console.log('\nTestando predições automáticas:');
for (let i = 0; i < 5; i++) {
    const resultado = rotador.rotacaoInteligente(true);
    console.log(`  Predição ${i + 1}: ${resultado?.valor}`);
}

const stats2 = rotador.getEstatisticas();
console.log(`\nEficiência da predição: ${(stats2.previsoesCertas / stats2.previsoesTentadas * 100).toFixed(1)}%`);
console.log();

// Teste 3: Busca por rotação
console.log('🔍 Teste 3: Busca por Rotação');
rotador.reiniciar();

const elementosBusca = ['Verde', 'Roxo', 'Amarelo'];
elementosBusca.forEach(elemento => {
    const resultado = rotador.buscarPorRotacao(elemento, 8);
    if (resultado.elemento) {
        console.log(`  Encontrado "${elemento}" em ${resultado.rotacoesUsadas} rotações (${resultado.tempoGasto.toFixed(2)}ms)`);
    } else {
        console.log(`  "${elemento}" não encontrado em ${resultado.rotacoesUsadas} tentativas`);
    }
});
console.log();

// Teste 4: Performance com muitos elementos
console.log('🚀 Teste 4: Performance com Muitos Elementos');
const elementosGrandes = Array.from({length: 100}, (_, i) => `Item${i + 1}`);
const rotadorGrande = new RotacaoCircular<string>(200);
rotadorGrande.inicializar(elementosGrandes);

console.log(`Inicializado com ${elementosGrandes.length} elementos`);

// Teste de rotações intensivas
const inicioPerformance = performance.now();
const rotacoesIntensivas = Array.from({length: 1000}, () => Math.floor(Math.random() * 20) - 10);

rotacoesIntensivas.forEach(rot => {
    rotadorGrande.rotacionar(rot);
});

const tempoTotal = performance.now() - inicioPerformance;
const statsGrande = rotadorGrande.getEstatisticas();

console.log(`1000 rotações executadas em ${tempoTotal.toFixed(2)}ms`);
console.log(`Tempo médio por rotação: ${statsGrande.tempoMedioRotacao.toFixed(4)}ms`);
console.log(`Taxa de cache hit: ${statsGrande.taxaCacheHit}%`);
console.log(`Tamanho do cache: ${statsGrande.tamanhoCache} entradas`);
console.log();

// Teste 5: Análise de padrões
console.log('📊 Teste 5: Análise de Padrões');
rotador.reiniciar();

// Criar padrão mais complexo
const padraoComplexo = [1, 2, 1, 3, 1, 2, 1, 3, 1, 2, 1, 3, 2, 2, 2];
padraoComplexo.forEach(rot => {
    rotador.rotacionar(rot);
});

const analise = rotador.analisarPadroes();
console.log(`Rotação mais comum: ${analise.rotacaoMaisComum}`);
console.log('Frequência de rotações:');

// Ordenar frequências
const frequenciasOrdenadas = [...analise.frequenciaRotacoes.entries()]
    .sort(([,a], [,b]) => b - a);

frequenciasOrdenadas.slice(0, 5).forEach(([rotacao, freq]) => {
    const barra = '█'.repeat(Math.min(freq, 20));
    console.log(`  Rotação ${rotacao}: ${freq}x ${barra}`);
});

console.log(`Padrão sequencial detectado: [${analise.padraoSequencial.join(', ')}]`);
console.log(`Eficiência de predição: ${analise.eficienciaPredicao}%`);
console.log();

// Teste 6: Rotação sequencial otimizada
console.log('⚡ Teste 6: Rotação Sequencial');
rotador.reiniciar();

const sequencia = [1, -1, 2, -2, 3, 1, 1];
console.log('Sequência de rotações:', sequencia.join(' → '));

const resultadosSequencia = rotador.rotacaoSequencial(sequencia);
console.log('Elementos acessados:');
resultadosSequencia.forEach((elem, i) => {
    console.log(`  ${i + 1}. ${elem.valor} (posição: ${elem.indice}, acessos: ${elem.acessos})`);
});
console.log();

// Teste 7: Ranking de elementos mais acessados
console.log('🏆 Teste 7: Ranking de Acessos');
const ranking = rotador.obterRankingAcessos();
console.log('Top 5 elementos mais acessados:');
ranking.slice(0, 5).forEach((elem, i) => {
    const posicao = (i + 1).toString().padStart(2);
    const acessos = elem.acessos.toString().padStart(3);
    console.log(`  ${posicao}. ${elem.valor.padEnd(10)} - ${acessos} acessos`);
});
console.log();

// Teste 8: Comparação de strategies
console.log('⚖️ Teste 8: Comparação de Estratégias');
const dados = ['A', 'B', 'C', 'D', 'E'];
const rotadorComparacao = new RotacaoCircular<string>(30);

// Estratégia 1: Rotações simples
rotadorComparacao.inicializar(dados);
const inicioSimples = performance.now();
for (let i = 0; i < 50; i++) {
    rotadorComparacao.rotacionar(1);
}
const tempoSimples = performance.now() - inicioSimples;
const statsSimples = rotadorComparacao.getEstatisticas();

// Estratégia 2: Rotações inteligentes
rotadorComparacao.reiniciar();
const inicioInteligente = performance.now();
for (let i = 0; i < 50; i++) {
    rotadorComparacao.rotacaoInteligente(true);
}
const tempoInteligente = performance.now() - inicioInteligente;
const statsInteligente = rotadorComparacao.getEstatisticas();

console.log('Estratégia Simples:');
console.log(`  Tempo: ${tempoSimples.toFixed(2)}ms`);
console.log(`  Cache hit: ${statsSimples.taxaCacheHit}%`);
console.log(`  Predições: ${statsSimples.previsoesTentadas}`);

console.log('Estratégia Inteligente:');
console.log(`  Tempo: ${tempoInteligente.toFixed(2)}ms`);
console.log(`  Cache hit: ${statsInteligente.taxaCacheHit}%`);
console.log(`  Predições: ${statsInteligente.previsoesTentadas} (${statsInteligente.previsoesCertas} certas)`);

const eficienciaGanho = ((tempoSimples - tempoInteligente) / tempoSimples * 100);
console.log(`Ganho de eficiência: ${eficienciaGanho.toFixed(1)}%`);
console.log();

// Teste 9: Stress test com tipos diferentes
console.log('💪 Teste 9: Stress Test com Números');
interface ObjetoComplexo {
    id: number;
    nome: string;
    valor: number;
}

const objetosComplexos: ObjetoComplexo[] = Array.from({length: 50}, (_, i) => ({
    id: i + 1,
    nome: `Objeto${i + 1}`,
    valor: Math.random() * 100
}));

const rotadorComplexo = new RotacaoCircular<ObjetoComplexo>(100);
rotadorComplexo.inicializar(objetosComplexos);

const inicioStress = performance.now();
const rotacoesAleatorias = Array.from({length: 500}, () => Math.floor(Math.random() * 40) - 20);

for (const rotacao of rotacoesAleatorias) {
    rotadorComplexo.rotacionar(rotacao);
}

const tempoStress = performance.now() - inicioStress;
const statsStress = rotadorComplexo.getEstatisticas();

console.log(`Stress test: 500 rotações com objetos complexos`);
console.log(`Tempo total: ${tempoStress.toFixed(2)}ms`);
console.log(`Tempo médio: ${statsStress.tempoMedioRotacao.toFixed(4)}ms`);
console.log(`Cache hit rate: ${statsStress.taxaCacheHit}%`);
console.log(`Cache size: ${statsStress.tamanhoCache}/${rotadorComplexo['maxCacheSize']}`);

// Elemento mais acessado no stress test
const rankingStress = rotadorComplexo.obterRankingAcessos();
const maisAcessado = rankingStress[0];
console.log(`Elemento mais acessado: ID${maisAcessado.valor.id} (${maisAcessado.acessos} acessos)`);

console.log('\n✅ Exercício 29 concluído - Rotação Circular Inteligente implementada!');