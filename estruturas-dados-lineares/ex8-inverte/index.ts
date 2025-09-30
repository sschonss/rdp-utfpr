import { ListaAleatoria } from './ListaAleatoria';

console.log('=== EXERCÍCIO 8 - INVERTE ===\n');

// Teste básico
console.log('📍 Teste 1: Inversão básica');
const lista1 = new ListaAleatoria(0);
lista1.definirElementos([1, 2, 3, 4, 5]);
console.log(`Lista original: ${lista1.toString()}`);

lista1.inverte();
console.log(`Lista invertida: ${lista1.toString()}`);

console.log('\n📍 Teste 2: Lista com número par de elementos');
const lista2 = new ListaAleatoria(0);
lista2.definirElementos([10, 20, 30, 40, 50, 60]);
console.log(`Lista original: ${lista2.toString()}`);

lista2.inverte();
console.log(`Lista invertida: ${lista2.toString()}`);

console.log('\n📍 Teste 3: Lista com número ímpar de elementos');
const lista3 = new ListaAleatoria(0);
lista3.definirElementos([1, 2, 3, 4, 5, 6, 7]);
console.log(`Lista original: ${lista3.toString()}`);

lista3.inverte();
console.log(`Lista invertida: ${lista3.toString()}`);

console.log('\n📍 Teste 4: Lista com um único elemento');
const lista4 = new ListaAleatoria(0);
lista4.definirElementos([42]);
console.log(`Lista original: ${lista4.toString()}`);

lista4.inverte();
console.log(`Lista invertida: ${lista4.toString()}`);
console.log('(Lista com um elemento permanece igual)');

console.log('\n📍 Teste 5: Lista vazia');
const lista5 = new ListaAleatoria(0);
console.log(`Lista vazia: ${lista5.toString()}`);

lista5.inverte();
console.log(`Após inversão: ${lista5.toString()}`);
console.log('(Lista vazia permanece vazia)');

console.log('\n📍 Teste 6: Lista com dois elementos');
const lista6 = new ListaAleatoria(0);
lista6.definirElementos([100, 200]);
console.log(`Lista original: ${lista6.toString()}`);

lista6.inverte();
console.log(`Lista invertida: ${lista6.toString()}`);

console.log('\n📍 Teste 7: Lista com elementos iguais');
const lista7 = new ListaAleatoria(0);
lista7.definirElementos([5, 5, 5, 5, 5]);
console.log(`Lista original: ${lista7.toString()}`);

lista7.inverte();
console.log(`Lista invertida: ${lista7.toString()}`);
console.log('(Visualmente igual, mas elementos foram trocados)');

console.log('\n📍 Teste 8: Lista com números negativos');
const lista8 = new ListaAleatoria(0);
lista8.definirElementos([-10, -5, 0, 5, 10]);
console.log(`Lista original: ${lista8.toString()}`);

lista8.inverte();
console.log(`Lista invertida: ${lista8.toString()}`);

console.log('\n📍 Teste 9: Dupla inversão (deve retornar ao original)');
const lista9 = new ListaAleatoria(0);
lista9.definirElementos([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
console.log(`Lista original: ${lista9.toString()}`);

const listaOriginal = [...lista9.getElementos()];

lista9.inverte();
console.log(`Primeira inversão: ${lista9.toString()}`);

lista9.inverte();
console.log(`Segunda inversão: ${lista9.toString()}`);

// Verificar se voltou ao original
let voltouAoOriginal = true;
const elementosFinais = lista9.getElementos();
for (let i = 0; i < listaOriginal.length; i++) {
    if (listaOriginal[i] !== elementosFinais[i]) {
        voltouAoOriginal = false;
        break;
    }
}
console.log(`Voltou ao original: ${voltouAoOriginal ? 'SIM' : 'NÃO'}`);

console.log('\n📍 Teste 10: Lista aleatória real');
const lista10 = new ListaAleatoria(10);
console.log(`Lista gerada: ${lista10.toString()}`);

const elementosOriginais = [...lista10.getElementos()];
lista10.inverte();
console.log(`Lista invertida: ${lista10.toString()}`);

console.log('\nVerificação da inversão:');
const elementosInvertidos = lista10.getElementos();
for (let i = 0; i < elementosOriginais.length; i++) {
    const posicaoOriginal = i;
    const posicaoInvertida = elementosOriginais.length - 1 - i;
    console.log(`Posição ${posicaoOriginal} (${elementosOriginais[posicaoOriginal]}) -> Posição ${posicaoInvertida} (${elementosInvertidos[posicaoOriginal]})`);
}

console.log('\n📍 Teste 11: Lista grande');
const lista11 = new ListaAleatoria(0);
const listaGrande = [];
for (let i = 1; i <= 20; i++) {
    listaGrande.push(i);
}
lista11.definirElementos(listaGrande);

console.log(`Lista 1-20: ${lista11.toString()}`);
lista11.inverte();
console.log(`Invertida: ${lista11.toString()}`);

console.log('\n📍 Teste 12: Verificação de eficiência (sem métodos predefinidos)');
console.log('A implementação utiliza apenas:');
console.log('- Loop while com dois ponteiros');
console.log('- Troca manual de elementos (variável temporária)');
console.log('- Sem uso de reverse(), slice() ou outros métodos predefinidos');
console.log('- Complexidade O(n/2) = O(n)');