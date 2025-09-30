import { ListaSubstituivel } from './ListaSubstituivel';

console.log('=== EXERCÍCIO 13 - SUBSTITUIÇÃO CONDICIONAL ===\n');

console.log('📍 Teste 1: Exemplo do enunciado');
const lista1 = new ListaSubstituivel([3, 7, 3, 4, 3]);
console.log(`Lista inicial: ${lista1.toString()}`);

lista1.substituir(3, 9);
console.log(`Após substituir(3, 9): ${lista1.toString()}`);
console.log('Esperado: [9, 7, 9, 4, 9]');

console.log('\n📍 Teste 2: Substituir valor que não existe');
const lista2 = new ListaSubstituivel([1, 2, 3, 4, 5]);
console.log(`Lista inicial: ${lista2.toString()}`);

lista2.substituir(10, 99);
console.log(`Após substituir(10, 99): ${lista2.toString()}`);
console.log('Lista permanece inalterada (valor 10 não existe)');

console.log('\n📍 Teste 3: Substituir por ele mesmo');
const lista3 = new ListaSubstituivel([1, 2, 2, 3, 2]);
console.log(`Lista inicial: ${lista3.toString()}`);

lista3.substituir(2, 2);
console.log(`Após substituir(2, 2): ${lista3.toString()}`);
console.log('Lista permanece inalterada (substituição por si mesmo)');

console.log('\n📍 Teste 4: Lista vazia');
const lista4 = new ListaSubstituivel([]);
console.log(`Lista vazia: ${lista4.toString()}`);

lista4.substituir(5, 10);
console.log(`Após substituir(5, 10): ${lista4.toString()}`);
console.log('Lista permanece vazia');

console.log('\n📍 Teste 5: Substituir apenas o primeiro');
const lista5 = new ListaSubstituivel([1, 2, 1, 3, 1, 4]);
console.log(`Lista inicial: ${lista5.toString()}`);

const sucesso1 = lista5.substituirPrimeiro(1, 99);
console.log(`Após substituirPrimeiro(1, 99): ${lista5.toString()}`);
console.log(`Substituição realizada: ${sucesso1}`);

const sucesso2 = lista5.substituirPrimeiro(10, 88);
console.log(`Após substituirPrimeiro(10, 88): ${lista5.toString()}`);
console.log(`Substituição realizada: ${sucesso2}`);

console.log('\n📍 Teste 6: Substituir apenas o último');
const lista6 = new ListaSubstituivel([1, 2, 1, 3, 1, 4]);
console.log(`Lista inicial: ${lista6.toString()}`);

const sucesso3 = lista6.substituirUltimo(1, 77);
console.log(`Após substituirUltimo(1, 77): ${lista6.toString()}`);
console.log(`Substituição realizada: ${sucesso3}`);

console.log('\n📍 Teste 7: Substituir N ocorrências');
const lista7 = new ListaSubstituivel([5, 5, 5, 5, 5]);
console.log(`Lista inicial: ${lista7.toString()}`);

const substituicoes1 = lista7.substituirN(5, 10, 3);
console.log(`Após substituirN(5, 10, 3): ${lista7.toString()}`);
console.log(`Número de substituições: ${substituicoes1}`);

const lista8 = new ListaSubstituivel([1, 2, 1, 2, 1]);
const substituicoes2 = lista8.substituirN(1, 100, 2);
console.log(`Lista [1,2,1,2,1] após substituirN(1, 100, 2): ${lista8.toString()}`);
console.log(`Número de substituições: ${substituicoes2}`);

console.log('\n📍 Teste 8: Contagem de ocorrências');
const lista9 = new ListaSubstituivel([1, 2, 1, 3, 1, 2, 1]);
console.log(`Lista: ${lista9.toString()}`);

console.log(`Ocorrências de 1: ${lista9.contarOcorrencias(1)}`);
console.log(`Ocorrências de 2: ${lista9.contarOcorrencias(2)}`);
console.log(`Ocorrências de 3: ${lista9.contarOcorrencias(3)}`);
console.log(`Ocorrências de 99: ${lista9.contarOcorrencias(99)}`);

console.log('\n📍 Teste 9: Substituições múltiplas');
const lista10 = new ListaSubstituivel([1, 2, 3, 1, 2, 3]);
console.log(`Lista inicial: ${lista10.toString()}`);

lista10.substituir(1, 10);
console.log(`Após substituir 1→10: ${lista10.toString()}`);

lista10.substituir(2, 20);
console.log(`Após substituir 2→20: ${lista10.toString()}`);

lista10.substituir(3, 30);
console.log(`Após substituir 3→30: ${lista10.toString()}`);

console.log('\n📍 Teste 10: Valores negativos e zero');
const lista11 = new ListaSubstituivel([-1, 0, -1, 5, 0, -1]);
console.log(`Lista inicial: ${lista11.toString()}`);

lista11.substituir(-1, 1);
console.log(`Após substituir -1→1: ${lista11.toString()}`);

lista11.substituir(0, 100);
console.log(`Após substituir 0→100: ${lista11.toString()}`);

console.log('\n📍 Teste 11: Demonstração com diferentes métodos');
const listaDemo = new ListaSubstituivel([7, 7, 7, 7, 7]);
console.log(`Lista para demonstração: ${listaDemo.toString()}`);

console.log('\nTestando substituirN com diferentes valores de n:');
for (let n = 1; n <= 6; n++) {
    const listaCopia = new ListaSubstituivel([7, 7, 7, 7, 7]);
    const substituicoes = listaCopia.substituirN(7, 9, n);
    console.log(`n=${n}: ${listaCopia.toString()} (${substituicoes} substituições)`);
}