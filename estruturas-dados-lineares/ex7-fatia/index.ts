import { ListaAleatoria } from './ListaAleatoria';

console.log('=== EXERCÍCIO 7 - FATIA ===\n');

// Teste básico
console.log('📍 Teste 1: Fatia básica');
const lista1 = new ListaAleatoria(0);
lista1.definirElementos([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
console.log(`Lista original: ${lista1.toString()}`);
console.log(`Índices:        [0,  1,  2,  3,  4,  5,  6,  7,  8,  9]`);

lista1.fatia(2, 6);
console.log(`Fatia de índice 2 a 6: ${lista1.toString()}`);
console.log('(Elementos de índice 2, 3, 4, 5, 6)');

console.log('\n📍 Teste 2: Fatia do início');
const lista2 = new ListaAleatoria(0);
lista2.definirElementos([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(`Lista original: ${lista2.toString()}`);

lista2.fatia(0, 3);
console.log(`Fatia de índice 0 a 3: ${lista2.toString()}`);

console.log('\n📍 Teste 3: Fatia do final');
const lista3 = new ListaAleatoria(0);
lista3.definirElementos([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(`Lista original: ${lista3.toString()}`);

lista3.fatia(7, 9);
console.log(`Fatia de índice 7 a 9: ${lista3.toString()}`);

console.log('\n📍 Teste 4: Fatia de um único elemento');
const lista4 = new ListaAleatoria(0);
lista4.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista original: ${lista4.toString()}`);

lista4.fatia(2, 2);
console.log(`Fatia de índice 2 a 2: ${lista4.toString()}`);

console.log('\n📍 Teste 5: Fatia da lista inteira');
const lista5 = new ListaAleatoria(0);
lista5.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista original: ${lista5.toString()}`);

lista5.fatia(0, 4);
console.log(`Fatia de índice 0 a 4: ${lista5.toString()}`);

console.log('\n📍 Teste 6: Casos extremos');

// Início negativo
console.log('\n6.1. Início negativo:');
const lista6 = new ListaAleatoria(0);
lista6.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista antes: ${lista6.toString()}`);

lista6.fatia(-3, 2);
console.log(`Fatia de -3 a 2: ${lista6.toString()}`);
console.log('(Início negativo tratado como 0)');

// Fim maior que tamanho
console.log('\n6.2. Fim maior que tamanho:');
const lista7 = new ListaAleatoria(0);
lista7.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista antes: ${lista7.toString()}`);

lista7.fatia(2, 10);
console.log(`Fatia de 2 a 10: ${lista7.toString()}`);
console.log('(Fim maior que tamanho tratado como último índice)');

// Início maior que fim
console.log('\n6.3. Início maior que fim:');
const lista8 = new ListaAleatoria(0);
lista8.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista antes: ${lista8.toString()}`);

lista8.fatia(4, 2);
console.log(`Fatia de 4 a 2: ${lista8.toString()}`);
console.log('(Lista fica vazia quando início > fim)');

// Índices fora do intervalo
console.log('\n6.4. Ambos índices fora do intervalo:');
const lista9 = new ListaAleatoria(0);
lista9.definirElementos([1, 2, 3]);
console.log(`Lista antes: ${lista9.toString()}`);

lista9.fatia(5, 8);
console.log(`Fatia de 5 a 8: ${lista9.toString()}`);
console.log('(Índices ajustados automaticamente)');

console.log('\n📍 Teste 7: Lista vazia');
const lista10 = new ListaAleatoria(0);
console.log(`Lista vazia: ${lista10.toString()}`);

lista10.fatia(0, 2);
console.log(`Fatia de 0 a 2 em lista vazia: ${lista10.toString()}`);

console.log('\n📍 Teste 8: Lista com um elemento');
const lista11 = new ListaAleatoria(0);
lista11.definirElementos([42]);
console.log(`Lista com um elemento: ${lista11.toString()}`);

lista11.fatia(0, 0);
console.log(`Fatia de 0 a 0: ${lista11.toString()}`);

console.log('\n📍 Teste 9: Lista aleatória real');
const lista12 = new ListaAleatoria(12);
console.log(`Lista gerada: ${lista12.toString()}`);
console.log(`Tamanho original: ${lista12.tamanho()}`);

const elementosOriginais = [...lista12.getElementos()];
lista12.fatia(3, 8);
console.log(`Fatia de índice 3 a 8: ${lista12.toString()}`);
console.log(`Tamanho final: ${lista12.tamanho()}`);

console.log('\nElementos da fatia:');
for (let i = 3; i <= 8 && i < elementosOriginais.length; i++) {
    console.log(`Índice ${i}: ${elementosOriginais[i]}`);
}

console.log('\n📍 Teste 10: Fatias sequenciais');
const lista13 = new ListaAleatoria(0);
lista13.definirElementos([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(`Lista inicial: ${lista13.toString()}`);

lista13.fatia(2, 7);
console.log(`Primeira fatia (2 a 7): ${lista13.toString()}`);

lista13.fatia(1, 3);
console.log(`Segunda fatia (1 a 3 da fatia anterior): ${lista13.toString()}`);

lista13.fatia(0, 1);
console.log(`Terceira fatia (0 a 1): ${lista13.toString()}`);