import { AgrupadorFaixas } from './AgrupadorFaixas';

console.log('=== EXERCÍCIO 17 - AGRUPAMENTO EM FAIXAS ===\n');

console.log('📍 Teste 1: Exemplo do enunciado');
const lista1 = [15, 85, 25, 65, 45, 95, 5, 75, 35, 55];
const k1 = 5, min1 = 0, max1 = 99;

console.log(`Lista: [${lista1.join(', ')}]`);
console.log(`Intervalo: [${min1}, ${max1}], ${k1} faixas`);

const limites1 = AgrupadorFaixas.obterLimitesFaixas(k1, min1, max1);
console.log('Faixas:');
limites1.forEach((limite, i) => {
    console.log(`  Faixa ${i}: [${limite[0]}, ${limite[1]}${i === k1-1 ? ']' : ')'}`);
});

const resultado1 = AgrupadorFaixas.agruparEmFaixas(lista1, k1, min1, max1);
console.log(`Contagens: [${resultado1.join(', ')}]`);

console.log('\n📍 Teste 2: Elementos fora do intervalo');
const lista2 = [-5, 10, 50, 105, 75, 110];
const k2 = 4, min2 = 0, max2 = 100;

console.log(`Lista: [${lista2.join(', ')}]`);
console.log(`Intervalo: [${min2}, ${max2}], ${k2} faixas`);
console.log('(Elementos -5, 105, 110 estão fora do intervalo)');

const resultado2 = AgrupadorFaixas.agruparEmFaixas(lista2, k2, min2, max2);
console.log(`Contagens: [${resultado2.join(', ')}]`);

console.log('\n📍 Teste 3: Casos extremos');

// Lista vazia
const listaVazia: number[] = [];
const resultadoVazio = AgrupadorFaixas.agruparEmFaixas(listaVazia, 3, 0, 10);
console.log(`Lista vazia: [${resultadoVazio.join(', ')}]`);

// k = 1 (uma única faixa)
const lista3 = [1, 5, 8, 3, 7];
const resultado3 = AgrupadorFaixas.agruparEmFaixas(lista3, 1, 0, 10);
console.log(`Lista [${lista3.join(', ')}] em 1 faixa: [${resultado3.join(', ')}]`);

console.log('\n📍 Teste 4: Faixas com números decimais');
const lista4 = [1.5, 2.3, 4.7, 3.1, 2.9, 4.2];
const resultado4 = AgrupadorFaixas.agruparEmFaixas(lista4, 3, 1, 5);
console.log(`Lista com decimais [${lista4.join(', ')}]: [${resultado4.join(', ')}]`);