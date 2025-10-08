import { JogoDominos } from './JogoDominos';

console.log('=== EXERCÍCIO 31 - JOGO DE DOMINÓS ===\n');

const jogo = new JogoDominos();

// Gerar conjunto padrão de dominós
const conjuntoPadrao = JogoDominos.gerarConjuntoPadrao();
console.log(`🎲 Conjunto padrão gerado: ${conjuntoPadrao.length} peças`);
console.log('Primeiras 10 peças:', conjuntoPadrao.slice(0, 10).map(p => `[${p.lado1}|${p.lado2}]`).join(' '));
console.log();

// === VARIAÇÃO 1: ENCAIXE SIMPLES ===
console.log('🔵 VARIAÇÃO 1: Encaixe Simples');
jogo.reiniciar();

const pecasTeste1 = [
    {lado1: 3, lado2: 4},
    {lado1: 4, lado2: 6},
    {lado1: 2, lado2: 3},
    {lado1: 6, lado2: 1},
    {lado1: 5, lado2: 2}
];

console.log('Peças de teste:', pecasTeste1.map(p => `[${p.lado1}|${p.lado2}]`).join(', '));

pecasTeste1.forEach((peca, i) => {
    const resultado = jogo.encaixeSimples(peca);
    console.log(`${i + 1}. ${resultado.mensagem}`);
});

console.log(`Tabuleiro final: ${jogo.getTabuleiro()}`);
const extremidades1 = jogo.getExtremidades();
console.log(`Extremidades: ${extremidades1?.esquerda} e ${extremidades1?.direita}`);
console.log();

// === VARIAÇÃO 2: ENCAIXE ESTRATÉGICO ===
console.log('🟡 VARIAÇÃO 2: Encaixe Estratégico');
jogo.reiniciar();

const pecasTeste2 = [
    {lado1: 2, lado2: 3},
    {lado1: 3, lado2: 5},
    {lado1: 5, lado2: 6},
    {lado1: 2, lado2: 4},
    {lado1: 6, lado2: 1}
];

const pecasRestantes = [...pecasTeste2];

console.log('Testando estratégia inteligente:');
pecasTeste2.forEach((peca, i) => {
    pecasRestantes.shift(); // Remove a peça atual das restantes
    const resultado = jogo.encaixeEstrategico(peca, pecasRestantes);
    console.log(`${i + 1}. ${resultado.mensagem}`);
});

console.log(`Tabuleiro estratégico: ${jogo.getTabuleiro()}`);
console.log();

// === VARIAÇÃO 3: ENCAIXE EM CADEIA ===
console.log('🟢 VARIAÇÃO 3: Encaixe em Cadeia');
jogo.reiniciar();

const pecasCadeia = [
    {lado1: 1, lado2: 2},
    {lado1: 3, lado2: 4},
    {lado1: 2, lado2: 3},
    {lado1: 4, lado2: 5},
    {lado1: 5, lado2: 6},
    {lado1: 0, lado2: 1}
];

console.log('Peças para cadeia:', pecasCadeia.map(p => `[${p.lado1}|${p.lado2}]`).join(', '));

const resultadosCadeia = jogo.encaixeCadeia(pecasCadeia);
console.log('\nSequência de encaixes:');
resultadosCadeia.forEach((item, i) => {
    const status = item.resultado.sucesso ? '✅' : '❌';
    console.log(`${i + 1}. ${status} [${item.peca.lado1}|${item.peca.lado2}]: ${item.resultado.mensagem}`);
});

console.log(`\nTabuleiro da cadeia: ${jogo.getTabuleiro()}`);
console.log();

// === VARIAÇÃO 4: ENCAIXE COM BLOQUEIO ===
console.log('🔴 VARIAÇÃO 4: Encaixe com Bloqueio');
jogo.reiniciar();

const pecasBloqueio = [
    {lado1: 0, lado2: 1}, // Primeira peça
    {lado1: 0, lado2: 6}, // Pode causar bloqueio (0 é raro)
    {lado1: 1, lado2: 2}, // Alternativa segura
    {lado1: 6, lado2: 6}  // Dupla alta
];

console.log('Testando prevenção de bloqueios:');

// Primeiro encaixe
let resultado = jogo.encaixeComBloqueio(pecasBloqueio[0]);
console.log(`1. ${resultado.mensagem}`);

// Segundo encaixe - com análise de bloqueio
resultado = jogo.encaixeComBloqueio(pecasBloqueio[1], true);
console.log(`2. ${resultado.mensagem}`);

// Terceiro encaixe - sem análise de bloqueio
resultado = jogo.encaixeComBloqueio(pecasBloqueio[2], false);
console.log(`3. ${resultado.mensagem}`);

console.log(`Tabuleiro com bloqueios: ${jogo.getTabuleiro()}`);
console.log();

// === VARIAÇÃO 5: ENCAIXE COM PONTUAÇÃO ===
console.log('🟣 VARIAÇÃO 5: Encaixe com Pontuação');
jogo.reiniciar();

const pecasPontuacao = [
    {lado1: 6, lado2: 6}, // Dupla alta - especial
    {lado1: 5, lado2: 6}, // Soma alta
    {lado1: 6, lado2: 4}, // Continua com 6
    {lado1: 3, lado2: 3}, // Dupla média
    {lado1: 0, lado2: 3}  // Peça normal
];

console.log('Sistema de pontuação ativo:');
pecasPontuacao.forEach((peca, i) => {
    const resultado = jogo.encaixeComPontuacao(peca);
    console.log(`${i + 1}. ${resultado.mensagem}`);
});

console.log(`\nPontuação final: ${jogo.getPontuacao()} pontos`);
console.log(`Tabuleiro final: ${jogo.getTabuleiro()}`);
console.log();

// === DEMONSTRAÇÃO AVANÇADA ===
console.log('🚀 DEMONSTRAÇÃO AVANÇADA: Jogo Completo Simulado');

// Embaralhar e distribuir peças
const todasPecas = JogoDominos.embaralhar(conjuntoPadrao);
const mao1 = todasPecas.slice(0, 7);
const mao2 = todasPecas.slice(7, 14);

console.log('\nMão do Jogador 1:', mao1.map(p => `[${p.lado1}|${p.lado2}]`).join(' '));
console.log('Mão do Jogador 2:', mao2.map(p => `[${p.lado1}|${p.lado2}]`).join(' '));

// Simular algumas jogadas alternadas
jogo.reiniciar();
const jogadas = [mao1[0], mao2[0], mao1[1], mao2[1], mao1[2]];

console.log('\nSimulação de jogo:');
jogadas.forEach((peca, i) => {
    const jogador = i % 2 === 0 ? 'J1' : 'J2';
    const resultado = jogo.encaixeComPontuacao(peca);
    console.log(`${jogador}: ${resultado.mensagem}`);
});

console.log(`\nTabuleiro da simulação: ${jogo.getTabuleiro()}`);
console.log(`Extremidades disponíveis: ${JSON.stringify(jogo.getExtremidades())}`);

// === ANÁLISE DE PADRÕES ===
console.log('\n📊 ANÁLISE DE PADRÕES');

// Contar tipos de peças no conjunto padrão
const analise = {
    duplas: conjuntoPadrao.filter(p => p.lado1 === p.lado2).length,
    altas: conjuntoPadrao.filter(p => p.lado1 + p.lado2 >= 10).length,
    comZero: conjuntoPadrao.filter(p => p.lado1 === 0 || p.lado2 === 0).length,
    comSeis: conjuntoPadrao.filter(p => p.lado1 === 6 || p.lado2 === 6).length
};

console.log('Análise do conjunto padrão:');
console.log(`  Peças duplas: ${analise.duplas}`);
console.log(`  Peças altas (≥10): ${analise.altas}`);
console.log(`  Peças com zero: ${analise.comZero}`);
console.log(`  Peças com seis: ${analise.comSeis}`);

// Histórico de ações
const historico = jogo.getHistorico();
console.log(`\nTotal de ações registradas: ${historico.length}`);

// Estatísticas de sucesso por variação
const sucessosPorTipo = historico.reduce((acc, acao) => {
    const tipo = acao.acao.split('-')[1] || 'simples';
    if (!acc[tipo]) acc[tipo] = {sucessos: 0, total: 0};
    acc[tipo].total++;
    if (acao.resultado.sucesso) acc[tipo].sucessos++;
    return acc;
}, {} as {[key: string]: {sucessos: number, total: number}});

console.log('\nTaxa de sucesso por variação:');
Object.entries(sucessosPorTipo).forEach(([tipo, stats]) => {
    const taxa = ((stats.sucessos / stats.total) * 100).toFixed(1);
    console.log(`  ${tipo}: ${stats.sucessos}/${stats.total} (${taxa}%)`);
});

// === TESTE DE CASOS EXTREMOS ===
console.log('\n⚡ CASOS EXTREMOS');

// Peça que não encaixa
jogo.reiniciar();
jogo.encaixeSimples({lado1: 1, lado2: 2});
const pecaNaoEncaixa = jogo.encaixeSimples({lado1: 5, lado2: 6});
console.log(`Peça que não encaixa: ${pecaNaoEncaixa.mensagem}`);

// Tabuleiro com uma peça só
jogo.reiniciar();
jogo.encaixeSimples({lado1: 0, lado2: 0});
console.log(`Dupla zero: ${jogo.getTabuleiro()}`);

// Encaixe máximo possível
jogo.reiniciar();
const pecaMaxima = {lado1: 6, lado2: 6};
const resultadoMaximo = jogo.encaixeComPontuacao(pecaMaxima);
console.log(`Pontuação máxima: ${resultadoMaximo.mensagem}`);

console.log('\n✅ Exercício 31 concluído - Jogo de Dominós com 5 variações implementado!');