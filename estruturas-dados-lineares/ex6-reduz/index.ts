import { ListaAleatoria } from './ListaAleatoria';

console.log('=== EXERCÍCIO 6 - REDUZ ===\n');

// Teste básico
console.log('📍 Teste 1: Redução normal');
const lista1 = new ListaAleatoria(0);
lista1.definirElementos([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
console.log(`Lista original: ${lista1.toString()}`);
console.log(`Tamanho original: ${lista1.tamanho()}`);

lista1.reduz(5);
console.log(`Após reduzir para 5 elementos: ${lista1.toString()}`);
console.log(`Tamanho final: ${lista1.tamanho()}`);

console.log('\n📍 Teste 2: Redução para 1 elemento');
const lista2 = new ListaAleatoria(0);
lista2.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista original: ${lista2.toString()}`);
console.log(`Tamanho original: ${lista2.tamanho()}`);

lista2.reduz(1);
console.log(`Após reduzir para 1 elemento: ${lista2.toString()}`);
console.log(`Tamanho final: ${lista2.tamanho()}`);

console.log('\n📍 Teste 3: Redução para 0 elementos (lista vazia)');
const lista3 = new ListaAleatoria(0);
lista3.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista original: ${lista3.toString()}`);
console.log(`Tamanho original: ${lista3.tamanho()}`);

lista3.reduz(0);
console.log(`Após reduzir para 0 elementos: ${lista3.toString()}`);
console.log(`Tamanho final: ${lista3.tamanho()}`);

console.log('\n📍 Teste 4: Casos extremos');

// Reduzir para tamanho maior que o atual
console.log('\n4.1. Reduzir para tamanho maior que o atual:');
const lista4 = new ListaAleatoria(0);
lista4.definirElementos([1, 2, 3]);
console.log(`Lista antes: ${lista4.toString()}`);
console.log(`Tamanho antes: ${lista4.tamanho()}`);

lista4.reduz(10);
console.log(`Após tentar reduzir para 10 elementos: ${lista4.toString()}`);
console.log(`Tamanho depois: ${lista4.tamanho()}`);
console.log('(Lista permanece inalterada)');

// Reduzir para tamanho igual ao atual
console.log('\n4.2. Reduzir para tamanho igual ao atual:');
const lista5 = new ListaAleatoria(0);
lista5.definirElementos([1, 2, 3]);
console.log(`Lista antes: ${lista5.toString()}`);
console.log(`Tamanho antes: ${lista5.tamanho()}`);

lista5.reduz(3);
console.log(`Após reduzir para 3 elementos: ${lista5.toString()}`);
console.log(`Tamanho depois: ${lista5.tamanho()}`);
console.log('(Lista permanece inalterada)');

// Valor negativo
console.log('\n4.3. Reduzir para valor negativo:');
const lista6 = new ListaAleatoria(0);
lista6.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista antes: ${lista6.toString()}`);
console.log(`Tamanho antes: ${lista6.tamanho()}`);

lista6.reduz(-5);
console.log(`Após reduzir para -5 elementos: ${lista6.toString()}`);
console.log(`Tamanho depois: ${lista6.tamanho()}`);
console.log('(Tratado como 0)');

console.log('\n📍 Teste 5: Lista já vazia');
const lista7 = new ListaAleatoria(0);
console.log(`Lista vazia: ${lista7.toString()}`);
console.log(`Tamanho antes: ${lista7.tamanho()}`);

lista7.reduz(3);
console.log(`Após tentar reduzir para 3 elementos: ${lista7.toString()}`);
console.log(`Tamanho depois: ${lista7.tamanho()}`);

console.log('\n📍 Teste 6: Lista aleatória real');
const lista8 = new ListaAleatoria(15);
console.log(`Lista gerada: ${lista8.toString()}`);
console.log(`Tamanho original: ${lista8.tamanho()}`);

const elementosOriginais = [...lista8.getElementos()];
lista8.reduz(7);
console.log(`Após reduzir para 7 elementos: ${lista8.toString()}`);
console.log(`Tamanho final: ${lista8.tamanho()}`);

console.log('\nElementos removidos:');
for (let i = 7; i < elementosOriginais.length; i++) {
    console.log(`Posição ${i + 1}: ${elementosOriginais[i]}`);
}

console.log('\n📍 Teste 7: Redução sequencial');
const lista9 = new ListaAleatoria(0);
lista9.definirElementos([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(`Lista inicial: ${lista9.toString()}`);

lista9.reduz(8);
console.log(`Após reduzir para 8: ${lista9.toString()}`);

lista9.reduz(5);
console.log(`Após reduzir para 5: ${lista9.toString()}`);

lista9.reduz(2);
console.log(`Após reduzir para 2: ${lista9.toString()}`);

lista9.reduz(0);
console.log(`Após reduzir para 0: ${lista9.toString()}`);