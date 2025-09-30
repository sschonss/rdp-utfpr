import { ListaAleatoria } from './ListaAleatoria';

console.log('=== EXERCÍCIO 5 - MAIS PRÓXIMO DA MÉDIA ===\n');

// Teste com lista específica
console.log('📍 Teste 1: Lista com valores conhecidos');
const lista1 = new ListaAleatoria(0);
lista1.definirElementos([10, 20, 30, 40, 50]);
console.log(`Lista: ${lista1.toString()}`);
console.log(`Média: ${lista1.calcularMedia()}`);
console.log(`Mais próximo da média: ${lista1.maisProximoDaMedia()}`);

console.log('\n📍 Teste 2: Lista com empate (primeiro encontrado)');
const lista2 = new ListaAleatoria(0);
lista2.definirElementos([10, 25, 30, 35, 50]); // Média = 30, elementos 25 e 35 equidistantes
console.log(`Lista: ${lista2.toString()}`);
console.log(`Média: ${lista2.calcularMedia()}`);
console.log(`Mais próximo da média: ${lista2.maisProximoDaMedia()}`);
console.log('(25 e 35 estão igualmente próximos de 30, mas 25 aparece primeiro)');

console.log('\n📍 Teste 3: Lista com número ímpar de elementos');
const lista3 = new ListaAleatoria(0);
lista3.definirElementos([5, 15, 25]); // Média = 15
console.log(`Lista: ${lista3.toString()}`);
console.log(`Média: ${lista3.calcularMedia()}`);
console.log(`Mais próximo da média: ${lista3.maisProximoDaMedia()}`);

console.log('\n📍 Teste 4: Lista com um único elemento');
const lista4 = new ListaAleatoria(0);
lista4.definirElementos([42]);
console.log(`Lista: ${lista4.toString()}`);
console.log(`Média: ${lista4.calcularMedia()}`);
console.log(`Mais próximo da média: ${lista4.maisProximoDaMedia()}`);

console.log('\n📍 Teste 5: Lista vazia');
const lista5 = new ListaAleatoria(0);
console.log(`Lista: ${lista5.toString()}`);
console.log(`Média: ${lista5.calcularMedia()}`);
console.log(`Mais próximo da média: ${lista5.maisProximoDaMedia()}`);

console.log('\n📍 Teste 6: Lista com números negativos');
const lista6 = new ListaAleatoria(0);
lista6.definirElementos([-50, -30, -10, 10, 30]); // Média = -10
console.log(`Lista: ${lista6.toString()}`);
console.log(`Média: ${lista6.calcularMedia()}`);
console.log(`Mais próximo da média: ${lista6.maisProximoDaMedia()}`);

console.log('\n📍 Teste 7: Lista com todos elementos iguais');
const lista7 = new ListaAleatoria(0);
lista7.definirElementos([7, 7, 7, 7, 7]);
console.log(`Lista: ${lista7.toString()}`);
console.log(`Média: ${lista7.calcularMedia()}`);
console.log(`Mais próximo da média: ${lista7.maisProximoDaMedia()}`);

console.log('\n📍 Teste 8: Lista aleatória real');
const lista8 = new ListaAleatoria(10);
console.log(`Lista gerada: ${lista8.toString()}`);
console.log(`Média: ${lista8.calcularMedia().toFixed(2)}`);
console.log(`Mais próximo da média: ${lista8.maisProximoDaMedia()}`);

// Demonstrar cálculo manual
const elementos = lista8.getElementos();
const media = lista8.calcularMedia();
console.log('\nDetalhamento:');
elementos.forEach((elemento, index) => {
    const distancia = Math.abs(elemento - media);
    console.log(`Elemento ${elemento}: distância da média = |${elemento} - ${media.toFixed(2)}| = ${distancia.toFixed(2)}`);
});

console.log('\n📍 Teste 9: Lista com média decimal');
const lista9 = new ListaAleatoria(0);
lista9.definirElementos([1, 2, 3, 4, 5, 6]); // Média = 3.5
console.log(`Lista: ${lista9.toString()}`);
console.log(`Média: ${lista9.calcularMedia()}`);
console.log(`Mais próximo da média: ${lista9.maisProximoDaMedia()}`);
console.log('(3 e 4 estão igualmente próximos de 3.5, mas 3 aparece primeiro)');