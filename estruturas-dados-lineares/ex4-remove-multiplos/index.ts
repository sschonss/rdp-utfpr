import { ListaAleatoria } from './ListaAleatoria';

console.log('=== EXERCÍCIO 4 - REMOVE MÚLTIPLOS ===\n');

// Teste com lista específica para melhor visualização
console.log('📍 Teste 1: Lista com elementos conhecidos');
const lista1 = new ListaAleatoria(0);
lista1.definirElementos([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
console.log(`Lista original: ${lista1.toString()}`);
console.log(`Posições:       [1,  2,  3,  4,  5,  6,  7,  8,  9,  10]`);

console.log('\n📍 Teste 2: Removendo múltiplos de 3');
const listaBackup = [...lista1.getElementos()];
lista1.removeMultiplos(3);
console.log(`Após remover múltiplos de 3: ${lista1.toString()}`);
console.log('(Removidas posições 3, 6, 9 - elementos 30, 60, 90)');

// Restaurar lista
lista1.definirElementos(listaBackup);

console.log('\n📍 Teste 3: Removendo múltiplos de 2');
lista1.removeMultiplos(2);
console.log(`Após remover múltiplos de 2: ${lista1.toString()}`);
console.log('(Removidas posições 2, 4, 6, 8, 10 - elementos 20, 40, 60, 80, 100)');

// Restaurar lista
lista1.definirElementos(listaBackup);

console.log('\n📍 Teste 4: Removendo múltiplos de 5');
lista1.removeMultiplos(5);
console.log(`Após remover múltiplos de 5: ${lista1.toString()}`);
console.log('(Removidas posições 5, 10 - elementos 50, 100)');

console.log('\n📍 Teste 5: Casos extremos');

// Teste com múltiplo maior que o tamanho da lista
console.log('\n5.1. Múltiplo maior que tamanho da lista:');
const lista2 = new ListaAleatoria(0);
lista2.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista antes: ${lista2.toString()}`);
lista2.removeMultiplos(10);
console.log(`Após remover múltiplos de 10: ${lista2.toString()}`);
console.log('(Nenhum elemento removido, pois não há posição 10)');

// Teste com múltiplo 1
console.log('\n5.2. Múltiplo igual a 1:');
const lista3 = new ListaAleatoria(0);
lista3.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista antes: ${lista3.toString()}`);
lista3.removeMultiplos(1);
console.log(`Após remover múltiplos de 1: ${lista3.toString()}`);
console.log('(Todos elementos removidos, pois todas posições são múltiplas de 1)');

// Teste com múltiplo 0
console.log('\n5.3. Múltiplo igual a 0:');
const lista4 = new ListaAleatoria(0);
lista4.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista antes: ${lista4.toString()}`);
lista4.removeMultiplos(0);
console.log(`Após remover múltiplos de 0: ${lista4.toString()}`);
console.log('(Lista permanece inalterada)');

// Teste com lista vazia
console.log('\n5.4. Lista vazia:');
const lista5 = new ListaAleatoria(0);
console.log(`Lista antes: ${lista5.toString()}`);
lista5.removeMultiplos(3);
console.log(`Após remover múltiplos de 3: ${lista5.toString()}`);

console.log('\n📍 Teste 6: Lista aleatória real');
const lista6 = new ListaAleatoria(15);
console.log(`Lista gerada: ${lista6.toString()}`);
console.log(`Tamanho original: ${lista6.tamanho()}`);

const elementosOriginais = [...lista6.getElementos()];
lista6.removeMultiplos(4);
console.log(`Após remover múltiplos de 4: ${lista6.toString()}`);
console.log(`Tamanho final: ${lista6.tamanho()}`);

// Mostrar quais elementos foram removidos
const elementosRemovidos: number[] = [];
for (let i = 0; i < elementosOriginais.length; i++) {
    const posicao = i + 1;
    if (posicao % 4 === 0) {
        elementosRemovidos.push(elementosOriginais[i]);
    }
}
console.log(`Elementos removidos (posições 4, 8, 12...): [${elementosRemovidos.join(', ')}]`);