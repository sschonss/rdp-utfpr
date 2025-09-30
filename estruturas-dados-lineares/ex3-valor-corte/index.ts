import { ListaAleatoria } from './ListaAleatoria';

console.log('=== EXERCÍCIO 3 - VALOR DE CORTE ===\n');

// Teste com uma lista de 15 elementos
console.log('📍 Teste 1: Lista inicial');
const lista = new ListaAleatoria(15);
console.log(`Lista original: ${lista.toString()}`);
console.log(`Tamanho original: ${lista.tamanho()}`);

console.log('\n📍 Teste 2: Removendo elementos menores que 0');
const listaBackup1 = [...lista.getElementos()];
lista.removerMenoresQue(0);
console.log(`Lista após remover < 0: ${lista.toString()}`);
console.log(`Tamanho após remoção: ${lista.tamanho()}`);

// Restaurar lista original para próximo teste
const lista2 = new ListaAleatoria(0);
lista2['elementos'] = listaBackup1; // Acesso direto para restaurar

console.log('\n📍 Teste 3: Removendo elementos menores que 50');
lista2.removerMenoresQue(50);
console.log(`Lista após remover < 50: ${lista2.toString()}`);
console.log(`Tamanho após remoção: ${lista2.tamanho()}`);

console.log('\n📍 Teste 4: Teste com casos extremos');

// Lista com todos elementos menores que o valor de corte
console.log('\n4.1. Lista onde todos elementos serão removidos:');
const lista3 = new ListaAleatoria(10);
console.log(`Lista antes: ${lista3.toString()}`);
lista3.removerMenoresQue(200); // Valor maior que o máximo possível (100)
console.log(`Lista após remover < 200: ${lista3.toString()}`);
console.log(`Tamanho final: ${lista3.tamanho()}`);

// Lista com nenhum elemento a ser removido
console.log('\n4.2. Lista onde nenhum elemento será removido:');
const lista4 = new ListaAleatoria(10);
console.log(`Lista antes: ${lista4.toString()}`);
lista4.removerMenoresQue(-200); // Valor menor que o mínimo possível (-100)
console.log(`Lista após remover < -200: ${lista4.toString()}`);
console.log(`Tamanho final: ${lista4.tamanho()}`);

// Lista vazia
console.log('\n4.3. Lista vazia:');
const lista5 = new ListaAleatoria(0);
console.log(`Lista antes: ${lista5.toString()}`);
lista5.removerMenoresQue(10);
console.log(`Lista após remover < 10: ${lista5.toString()}`);
console.log(`Tamanho final: ${lista5.tamanho()}`);

console.log('\n📍 Teste 5: Aplicação sequencial de filtros');
const lista6 = new ListaAleatoria(20);
console.log(`Lista original: ${lista6.toString()}`);
console.log(`Tamanho original: ${lista6.tamanho()}`);

lista6.removerMenoresQue(-50);
console.log(`Após remover < -50: ${lista6.toString()}`);
console.log(`Tamanho: ${lista6.tamanho()}`);

lista6.removerMenoresQue(0);
console.log(`Após remover < 0: ${lista6.toString()}`);
console.log(`Tamanho: ${lista6.tamanho()}`);

lista6.removerMenoresQue(25);
console.log(`Após remover < 25: ${lista6.toString()}`);
console.log(`Tamanho final: ${lista6.tamanho()}`);