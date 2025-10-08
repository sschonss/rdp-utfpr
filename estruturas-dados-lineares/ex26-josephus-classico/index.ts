import { JosephusClassico } from './JosephusClassico';

console.log('=== EXERCÍCIO 26 - PROBLEMA DE JOSEPHUS CLÁSSICO ===\n');

const josephus = new JosephusClassico();

// Teste do exemplo fornecido: n=7, k=3
console.log('🔵 Teste do exemplo clássico:');
console.log('n=7, k=3 (esperado: sobrevivente na posição 4)');
const exemplo = josephus.encontrarSobreviventeHumano(7, 3);
console.log(`Sobrevivente: posição ${exemplo}`);
console.log();

// Simulação passo a passo para verificar
console.log('🔍 Simulação passo a passo:');
const simulacao = josephus.simularProcesso(7, 3);
simulacao.processo.forEach(passo => console.log(passo));
console.log();

// Testes com números grandes (onde arrays seriam inviáveis)
console.log('🚀 Testes com números grandes:');
const casosGrandes = [
    {n: 1000, k: 3},
    {n: 10000, k: 7},
    {n: 100000, k: 13},
    {n: 1000000, k: 21}
];

const resultadosGrandes = josephus.resolverCasos(casosGrandes);
resultadosGrandes.forEach(resultado => {
    console.log(`n=${resultado.n.toLocaleString()}, k=${resultado.k} => sobrevivente: ${resultado.sobrevivente.toLocaleString()} (${resultado.tempoMs}ms)`);
});
console.log();

// Análise de padrões
console.log('📊 Análise de padrões para n=10:');
const padrao = josephus.analisarPadrao(10, 3);
console.log('n\tSobrevivente\tDiferença');
console.log('---\t-----------\t---------');
padrao.forEach(p => {
    console.log(`${p.n}\t${p.sobrevivente}\t\t${p.diferenca > 0 ? '+' : ''}${p.diferenca}`);
});
console.log();

// Encontrar valores de k para um sobrevivente específico
console.log('🎯 Encontrar k para sobrevivente específico:');
console.log('Para n=15, quais valores de k fazem a pessoa 8 sobreviver?');
const valoresK = josephus.encontrarKParaSobrevivente(15, 8, 30);
console.log(`Valores de k: [${valoresK.join(', ')}]`);
console.log();

// Análise estatística
console.log('📈 Análise estatística para n=12:');
const stats = josephus.analisarSobreviventes(12, 20);
console.log('Posição\tFrequência');
console.log('-------\t----------');
Object.entries(stats)
    .sort(([a], [b]) => Number(a) - Number(b))
    .forEach(([pos, freq]) => {
        const barra = '█'.repeat(freq);
        console.log(`${pos}\t${freq}\t${barra}`);
    });
console.log();

// Casos extremos
console.log('⚡ Casos extremos:');
console.log('n=1, k=5:', josephus.encontrarSobreviventeHumano(1, 5));
console.log('n=2, k=1:', josephus.encontrarSobreviventeHumano(2, 1));
console.log('n=2, k=2:', josephus.encontrarSobreviventeHumano(2, 2));
console.log('n=100, k=1:', josephus.encontrarSobreviventeHumano(100, 1));
console.log();

// Comparação de eficiência
console.log('⚡ Teste de eficiência extrema:');
const inicio = performance.now();
const resultadoGigante = josephus.encontrarSobreviventeHumano(10000000, 17);
const tempoTotal = performance.now() - inicio;
console.log(`n=10,000,000, k=17 => sobrevivente: ${resultadoGigante.toLocaleString()} em ${tempoTotal.toFixed(2)}ms`);
console.log();

// Histórico de cálculos
console.log('📝 Histórico dos últimos cálculos:');
const historico = josephus.getHistorico().slice(-5);
historico.forEach((calc, i) => {
    console.log(`${i + 1}. n=${calc.n}, k=${calc.k} => sobrevivente: ${calc.sobrevivente + 1}`);
});

console.log('\n✅ Exercício 26 concluído - Josephus Clássico otimizado!');