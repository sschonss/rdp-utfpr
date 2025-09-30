import { ListaRotacionavel } from './ListaRotacionavel';

console.log('=== EXERCÍCIO 11 - ROTAÇÃO CIRCULAR ===\n');

console.log('📍 Teste 1: Rotações básicas para a direita');
const lista1 = new ListaRotacionavel([10, 20, 30, 40, 50]);
console.log(`Lista inicial: ${lista1.toString()}`);

// Rotação para a direita
lista1.rotacionar(2);
console.log(`Após rotacionar(2): ${lista1.toString()}`);
console.log('Esperado: [40, 50, 10, 20, 30]');

console.log('\n📍 Teste 2: Rotações para a esquerda');
const lista2 = new ListaRotacionavel([10, 20, 30, 40, 50]);
console.log(`Lista inicial: ${lista2.toString()}`);

lista2.rotacionar(-1);
console.log(`Após rotacionar(-1): ${lista2.toString()}`);
console.log('Esperado: [20, 30, 40, 50, 10]');

console.log('\n📍 Teste 3: Múltiplos do tamanho (lista permanece inalterada)');
const lista3 = new ListaRotacionavel([1, 2, 3, 4, 5]);
console.log(`Lista inicial: ${lista3.toString()}`);

const elementosOriginais = [...lista3.getElementos()];
lista3.rotacionar(10); // 2 * tamanho
console.log(`Após rotacionar(10): ${lista3.toString()}`);
console.log(`Inalterada: ${JSON.stringify(elementosOriginais) === JSON.stringify(lista3.getElementos())}`);

lista3.rotacionar(-15); // -3 * tamanho
console.log(`Após rotacionar(-15): ${lista3.toString()}`);
console.log(`Inalterada: ${JSON.stringify(elementosOriginais) === JSON.stringify(lista3.getElementos())}`);

console.log('\n📍 Teste 4: Rotação maior que o tamanho da lista');
const lista4 = new ListaRotacionavel([1, 2, 3]);
console.log(`Lista inicial: ${lista4.toString()}`);

lista4.rotacionar(7); // 7 % 3 = 1, equivale a rotacionar(1)
console.log(`Após rotacionar(7): ${lista4.toString()}`);
console.log('Esperado: [3, 1, 2] (equivale a rotacionar(1))');

const lista5 = new ListaRotacionavel([1, 2, 3]);
lista5.rotacionar(-7); // -7 % 3 = -1, equivale a rotacionar(-1)
console.log(`Lista [1,2,3] após rotacionar(-7): ${lista5.toString()}`);
console.log('Esperado: [2, 3, 1] (equivale a rotacionar(-1))');

console.log('\n📍 Teste 5: Casos extremos');

// Lista vazia
console.log('\n5.1. Lista vazia:');
const listaVazia = new ListaRotacionavel([]);
console.log(`Lista vazia antes: ${listaVazia.toString()}`);
listaVazia.rotacionar(5);
console.log(`Lista vazia após rotacionar(5): ${listaVazia.toString()}`);

// Lista com um elemento
console.log('\n5.2. Lista com um elemento:');
const listaUm = new ListaRotacionavel([42]);
console.log(`Lista [42] antes: ${listaUm.toString()}`);
listaUm.rotacionar(3);
console.log(`Lista [42] após rotacionar(3): ${listaUm.toString()}`);

// Rotação zero
console.log('\n5.3. Rotação zero:');
const listaZero = new ListaRotacionavel([1, 2, 3, 4]);
console.log(`Lista antes: ${listaZero.toString()}`);
listaZero.rotacionar(0);
console.log(`Lista após rotacionar(0): ${listaZero.toString()}`);

console.log('\n📍 Teste 6: Sequência de rotações');
const lista6 = new ListaRotacionavel([1, 2, 3, 4, 5]);
console.log(`Lista inicial: ${lista6.toString()}`);

lista6.rotacionar(2);
console.log(`Após rotacionar(2): ${lista6.toString()}`);

lista6.rotacionar(-3);
console.log(`Após rotacionar(-3): ${lista6.toString()}`);

lista6.rotacionar(1);
console.log(`Após rotacionar(1): ${lista6.toString()}`);

console.log('\n📍 Teste 7: Demonstração visual das rotações');
const listaDemo = new ListaRotacionavel([10, 20, 30, 40, 50]);
console.log('\nDemonstrando todas as rotações possíveis:');
console.log(`Posição 0: ${listaDemo.toString()}`);

for (let i = 1; i < listaDemo.tamanho(); i++) {
    const listaCopia = new ListaRotacionavel([10, 20, 30, 40, 50]);
    listaCopia.rotacionar(i);
    console.log(`Posição ${i}: ${listaCopia.toString()}`);
}