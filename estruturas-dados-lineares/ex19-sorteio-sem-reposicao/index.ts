import { SorteadorSemReposicao } from './SorteadorSemReposicao';

console.log('=== EXERCÍCIO 19 - SORTEIO SEM REPOSIÇÃO ===\n');

console.log('📍 Teste 1: Sorteio básico');
const lista1 = [10, 20, 30, 40, 50];
console.log(`Lista original: [${lista1.join(', ')}]`);

const listaCopia1 = [...lista1];
const sorteados1 = SorteadorSemReposicao.sortearESubtrair(listaCopia1, 3);

console.log(`Elementos sorteados: [${sorteados1.join(', ')}]`);
console.log(`Lista restante: [${listaCopia1.join(', ')}]`);
console.log('(Ordem dos sorteados mantém a ordem original)');

console.log('\n📍 Teste 2: Sorteio aleatório');
const lista2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(`Lista: [${lista2.join(', ')}]`);

console.log('Demonstrando aleatoriedade:');
for (let i = 1; i <= 3; i++) {
    const sorteadosAleatorios = SorteadorSemReposicao.sortearAleatorio(lista2, 4);
    console.log(`Sorteio ${i}: [${sorteadosAleatorios.join(', ')}]`);
}

console.log('\n📍 Teste 3: Casos extremos');

// m = 0
const lista3 = [1, 2, 3];
const listaCopia3 = [...lista3];
const sorteados3 = SorteadorSemReposicao.sortearESubtrair(listaCopia3, 0);
console.log(`Sortear 0 de [1,2,3]: sorteados=[${sorteados3.join(', ')}], restante=[${listaCopia3.join(', ')}]`);

// m = tamanho da lista
const lista4 = [1, 2, 3];
const listaCopia4 = [...lista4];
const sorteados4 = SorteadorSemReposicao.sortearESubtrair(listaCopia4, 3);
console.log(`Sortear todos de [1,2,3]: sorteados=[${sorteados4.join(', ')}], restante=[${listaCopia4.join(', ')}]`);