import { ListaAleatoria } from './ListaAleatoria';

console.log('=== EXERCÍCIO 9 - AMPLITUDE ===\n');

// Teste básico
console.log('📍 Teste 1: Amplitude básica');
const lista1 = new ListaAleatoria(0);
lista1.definirElementos([1, 5, 3, 9, 2]);
console.log(`Lista: ${lista1.toString()}`);
console.log(`Maior elemento: ${lista1.maiorElemento()}`);
console.log(`Menor elemento: ${lista1.menorElemento()}`);
console.log(`Amplitude: ${lista1.amplitude()}`);
console.log(`Cálculo: ${lista1.maiorElemento()} - ${lista1.menorElemento()} = ${lista1.amplitude()}`);

console.log('\n📍 Teste 2: Lista com elementos iguais');
const lista2 = new ListaAleatoria(0);
lista2.definirElementos([7, 7, 7, 7, 7]);
console.log(`Lista: ${lista2.toString()}`);
console.log(`Maior elemento: ${lista2.maiorElemento()}`);
console.log(`Menor elemento: ${lista2.menorElemento()}`);
console.log(`Amplitude: ${lista2.amplitude()}`);
console.log('(Amplitude de elementos iguais é 0)');

console.log('\n📍 Teste 3: Lista com um único elemento');
const lista3 = new ListaAleatoria(0);
lista3.definirElementos([42]);
console.log(`Lista: ${lista3.toString()}`);
console.log(`Maior elemento: ${lista3.maiorElemento()}`);
console.log(`Menor elemento: ${lista3.menorElemento()}`);
console.log(`Amplitude: ${lista3.amplitude()}`);
console.log('(Amplitude de um elemento é 0)');

console.log('\n📍 Teste 4: Lista vazia');
const lista4 = new ListaAleatoria(0);
console.log(`Lista vazia: ${lista4.toString()}`);
console.log(`Maior elemento: ${lista4.maiorElemento()}`);
console.log(`Menor elemento: ${lista4.menorElemento()}`);
console.log(`Amplitude: ${lista4.amplitude()}`);

console.log('\n📍 Teste 5: Lista com números negativos');
const lista5 = new ListaAleatoria(0);
lista5.definirElementos([-10, -5, -15, -2, -8]);
console.log(`Lista: ${lista5.toString()}`);
console.log(`Maior elemento: ${lista5.maiorElemento()}`);
console.log(`Menor elemento: ${lista5.menorElemento()}`);
console.log(`Amplitude: ${lista5.amplitude()}`);
console.log(`Cálculo: ${lista5.maiorElemento()} - (${lista5.menorElemento()}) = ${lista5.amplitude()}`);

console.log('\n📍 Teste 6: Lista com números positivos e negativos');
const lista6 = new ListaAleatoria(0);
lista6.definirElementos([-20, 10, -5, 30, 0]);
console.log(`Lista: ${lista6.toString()}`);
console.log(`Maior elemento: ${lista6.maiorElemento()}`);
console.log(`Menor elemento: ${lista6.menorElemento()}`);
console.log(`Amplitude: ${lista6.amplitude()}`);
console.log(`Cálculo: ${lista6.maiorElemento()} - (${lista6.menorElemento()}) = ${lista6.amplitude()}`);

console.log('\n📍 Teste 7: Lista com zero');
const lista7 = new ListaAleatoria(0);
lista7.definirElementos([0, -5, 8, 0, -3]);
console.log(`Lista: ${lista7.toString()}`);
console.log(`Maior elemento: ${lista7.maiorElemento()}`);
console.log(`Menor elemento: ${lista7.menorElemento()}`);
console.log(`Amplitude: ${lista7.amplitude()}`);

console.log('\n📍 Teste 8: Lista em ordem crescente');
const lista8 = new ListaAleatoria(0);
lista8.definirElementos([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(`Lista: ${lista8.toString()}`);
console.log(`Maior elemento: ${lista8.maiorElemento()}`);
console.log(`Menor elemento: ${lista8.menorElemento()}`);
console.log(`Amplitude: ${lista8.amplitude()}`);

console.log('\n📍 Teste 9: Lista em ordem decrescente');
const lista9 = new ListaAleatoria(0);
lista9.definirElementos([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
console.log(`Lista: ${lista9.toString()}`);
console.log(`Maior elemento: ${lista9.maiorElemento()}`);
console.log(`Menor elemento: ${lista9.menorElemento()}`);
console.log(`Amplitude: ${lista9.amplitude()}`);

console.log('\n📍 Teste 10: Lista com dois elementos');
const lista10 = new ListaAleatoria(0);
lista10.definirElementos([100, 50]);
console.log(`Lista: ${lista10.toString()}`);
console.log(`Maior elemento: ${lista10.maiorElemento()}`);
console.log(`Menor elemento: ${lista10.menorElemento()}`);
console.log(`Amplitude: ${lista10.amplitude()}`);

console.log('\n📍 Teste 11: Lista aleatória real');
const lista11 = new ListaAleatoria(15);
console.log(`Lista gerada: ${lista11.toString()}`);
console.log(`Tamanho: ${lista11.tamanho()}`);
console.log(`Maior elemento: ${lista11.maiorElemento()}`);
console.log(`Menor elemento: ${lista11.menorElemento()}`);
console.log(`Amplitude: ${lista11.amplitude()}`);
console.log(`Média: ${lista11.calcularMedia().toFixed(2)}`);

console.log('\n📍 Teste 12: Casos extremos com números grandes');
const lista12 = new ListaAleatoria(0);
lista12.definirElementos([1000000, -1000000, 500000, -500000, 0]);
console.log(`Lista: ${lista12.toString()}`);
console.log(`Maior elemento: ${lista12.maiorElemento()}`);
console.log(`Menor elemento: ${lista12.menorElemento()}`);
console.log(`Amplitude: ${lista12.amplitude()}`);

console.log('\n📍 Teste 13: Verificação de implementação');
console.log('A amplitude é calculada percorrendo a lista uma única vez:');
console.log('1. Inicializa maior e menor com o primeiro elemento');
console.log('2. Percorre a lista comparando cada elemento');
console.log('3. Atualiza maior e menor conforme necessário');
console.log('4. Retorna a diferença (maior - menor)');
console.log('Complexidade: O(n)');

console.log('\n📍 Teste 14: Comparação com diferentes operações');
const lista14 = new ListaAleatoria(10);
const elementosOriginais = [...lista14.getElementos()];
console.log(`Lista original: ${lista14.toString()}`);
console.log(`Amplitude original: ${lista14.amplitude()}`);

// Aplicar algumas operações e ver como a amplitude muda
lista14.removerMenoresQue(0);
console.log(`Após remover < 0: ${lista14.toString()}`);
console.log(`Nova amplitude: ${lista14.amplitude()}`);

// Restaurar e testar outra operação
lista14.definirElementos(elementosOriginais);
lista14.fatia(2, 7);
console.log(`Fatia [2-7]: ${lista14.toString()}`);
console.log(`Amplitude da fatia: ${lista14.amplitude()}`);