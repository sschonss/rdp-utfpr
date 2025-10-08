import { OrdenadorMerge } from './OrdenadorMerge';

console.log('=== EXERCÍCIO 21 - MERGE SORT ADAPTADO ===\n');

console.log('📍 Teste 1: Ordenação básica');
const ordenador1 = new OrdenadorMerge([64, 34, 25, 12, 22, 11, 90]);
console.log(`Lista original: ${ordenador1.toString()}`);

const resultado1 = ordenador1.ordenar();
console.log(`Lista ordenada: [${resultado1.join(', ')}]`);

const stats1 = ordenador1.obterEstatisticas();
console.log(`Estatísticas: ${stats1.comparacoes} comparações, ${stats1.movimentacoes} movimentações`);
console.log(`Inversões detectadas: ${stats1.inversoes}`);

console.log('\n📍 Teste 2: Lista já ordenada (otimização)');
const ordenador2 = new OrdenadorMerge([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(`Lista original: ${ordenador2.toString()}`);

const resultado2 = ordenador2.ordenar();
console.log(`Lista ordenada: [${resultado2.join(', ')}]`);

const stats2 = ordenador2.obterEstatisticas();
console.log(`Estatísticas: ${stats2.comparacoes} comparações, ${stats2.movimentacoes} movimentações`);

const historico2 = ordenador2.obterHistoricoMerges();
console.log('Histórico:', historico2);

console.log('\n📍 Teste 3: Lista pequena (insertion sort)');
const ordenador3 = new OrdenadorMerge([5, 2, 8, 1, 9]);
console.log(`Lista pequena: ${ordenador3.toString()}`);

const resultado3 = ordenador3.ordenar();
console.log(`Lista ordenada: [${resultado3.join(', ')}]`);

const historico3 = ordenador3.obterHistoricoMerges();
console.log('Histórico de operações:');
historico3.forEach((op, i) => console.log(`  ${i + 1}. ${op}`));

console.log('\n📍 Teste 4: Lista com duplicatas');
const ordenador4 = new OrdenadorMerge([3, 1, 4, 1, 5, 9, 2, 6, 5, 3]);
console.log(`Lista com duplicatas: ${ordenador4.toString()}`);

const resultado4 = ordenador4.ordenar();
console.log(`Lista ordenada: [${resultado4.join(', ')}]`);

const stats4 = ordenador4.obterEstatisticas();
console.log(`Inversões: ${stats4.inversoes}, Operações merge: ${stats4.operacoesMerge}`);

console.log('\n📍 Teste 5: Casos extremos');

// Lista vazia
const ordenadorVazio = new OrdenadorMerge([]);
console.log(`Lista vazia: ${ordenadorVazio.toString()}`);
const resultadoVazio = ordenadorVazio.ordenar();
console.log(`Resultado: [${resultadoVazio.join(', ')}]`);

// Lista com um elemento
const ordenadorUm = new OrdenadorMerge([42]);
console.log(`Lista [42]: ${ordenadorUm.toString()}`);
const resultadoUm = ordenadorUm.ordenar();
console.log(`Resultado: [${resultadoUm.join(', ')}]`);

// Lista inversamente ordenada
const ordenadorInverso = new OrdenadorMerge([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
console.log(`Lista inversa: ${ordenadorInverso.toString()}`);
const resultadoInverso = ordenadorInverso.ordenar();
console.log(`Resultado: [${resultadoInverso.join(', ')}]`);

const statsInverso = ordenadorInverso.obterEstatisticas();
console.log(`Inversões (máximo possível): ${statsInverso.inversoes}`);

console.log('\n📍 Teste 6: Comparação de desempenho');
const tamanhos = [10, 20, 50];

tamanhos.forEach(n => {
    // Gera lista aleatória
    const listaAleatoria = Array.from({length: n}, () => Math.floor(Math.random() * 100));
    const ordenador = new OrdenadorMerge(listaAleatoria);
    
    console.log(`\nLista de ${n} elementos:`);
    console.log(`Primeiros 10: [${listaAleatoria.slice(0, 10).join(', ')}]${n > 10 ? '...' : ''}`);
    
    const inicio = Date.now();
    ordenador.ordenar();
    const fim = Date.now();
    
    const stats = ordenador.obterEstatisticas();
    console.log(`Tempo: ${fim - inicio}ms`);
    console.log(`Comparações: ${stats.comparacoes}, Movimentações: ${stats.movimentacoes}`);
    console.log(`Inversões: ${stats.inversoes}, Merges: ${stats.operacoesMerge}`);
});