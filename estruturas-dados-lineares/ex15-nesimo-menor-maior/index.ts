import { NesimoElemento } from './NesimoElemento';

console.log('=== EXERCÍCIO 15 - N-ÉSIMO MENOR E MAIOR ===\n');

console.log('📍 Teste 1: Exemplo do enunciado');
const lista1 = [5, 2, 8, 2, 7];
console.log(`Lista: [${lista1.join(', ')}]`);
console.log(`Valores únicos ordenados: [${NesimoElemento.valoresUnicosOrdenados(lista1).join(', ')}]`);

console.log('\nCritério: apenas valores distintos');
for (let n = 1; n <= 5; n++) {
    const menor = NesimoElemento.nEsimoMenor(lista1, n);
    const maior = NesimoElemento.nEsimoMaior(lista1, n);
    console.log(`${n}º menor: ${menor}, ${n}º maior: ${maior}`);
}

console.log('\n📍 Teste 2: Comparação com critério incluindo duplicatas');
console.log(`Lista ordenada com duplicatas: [${[...lista1].sort((a, b) => a - b).join(', ')}]`);
console.log('Critério: incluindo duplicatas');
for (let n = 1; n <= lista1.length; n++) {
    const menor = NesimoElemento.nEsimoMenorComDuplicatas(lista1, n);
    const maior = NesimoElemento.nEsimoMaiorComDuplicatas(lista1, n);
    console.log(`${n}º menor: ${menor}, ${n}º maior: ${maior}`);
}

console.log('\n📍 Teste 3: Lista sem duplicatas');
const lista2 = [10, 5, 8, 3, 1];
console.log(`Lista: [${lista2.join(', ')}]`);
console.log(`Valores únicos ordenados: [${NesimoElemento.valoresUnicosOrdenados(lista2).join(', ')}]`);

for (let n = 1; n <= lista2.length; n++) {
    const menor = NesimoElemento.nEsimoMenor(lista2, n);
    const maior = NesimoElemento.nEsimoMaior(lista2, n);
    console.log(`${n}º menor: ${menor}, ${n}º maior: ${maior}`);
}

console.log('\n📍 Teste 4: Lista com muitas duplicatas');
const lista3 = [3, 3, 3, 1, 1, 5, 5, 5, 5];
console.log(`Lista: [${lista3.join(', ')}]`);
console.log(`Valores únicos ordenados: [${NesimoElemento.valoresUnicosOrdenados(lista3).join(', ')}]`);

console.log('Apenas valores distintos:');
for (let n = 1; n <= 4; n++) {
    const menor = NesimoElemento.nEsimoMenor(lista3, n);
    const maior = NesimoElemento.nEsimoMaior(lista3, n);
    console.log(`${n}º menor: ${menor}, ${n}º maior: ${maior}`);
}

console.log('\n📍 Teste 5: Casos extremos');

// Lista vazia
console.log('\n5.1. Lista vazia:');
const listaVazia: number[] = [];
console.log(`1º menor: ${NesimoElemento.nEsimoMenor(listaVazia, 1)}`);
console.log(`1º maior: ${NesimoElemento.nEsimoMaior(listaVazia, 1)}`);

// Lista com um elemento
console.log('\n5.2. Lista com um elemento:');
const listaUm = [42];
console.log(`Lista: [${listaUm.join(', ')}]`);
console.log(`1º menor: ${NesimoElemento.nEsimoMenor(listaUm, 1)}`);
console.log(`1º maior: ${NesimoElemento.nEsimoMaior(listaUm, 1)}`);
console.log(`2º menor: ${NesimoElemento.nEsimoMenor(listaUm, 2)}`);

// N inválido
console.log('\n5.3. Valores de n inválidos:');
const lista4 = [1, 2, 3];
console.log(`Lista: [${lista4.join(', ')}]`);
console.log(`0º menor: ${NesimoElemento.nEsimoMenor(lista4, 0)}`);
console.log(`-1º menor: ${NesimoElemento.nEsimoMenor(lista4, -1)}`);
console.log(`10º menor: ${NesimoElemento.nEsimoMenor(lista4, 10)}`);

console.log('\n📍 Teste 6: Mediana');
const lista5 = [1, 3, 5, 7, 9]; // ímpar
const lista6 = [1, 2, 3, 4]; // par
const lista7 = [5, 2, 8, 2, 7]; // com duplicatas

console.log(`Lista ímpar [${lista5.join(', ')}] - Mediana: ${NesimoElemento.mediana(lista5)}`);
console.log(`Lista par [${lista6.join(', ')}] - Mediana: ${NesimoElemento.mediana(lista6)}`);
console.log(`Lista com duplicatas [${lista7.join(', ')}] - Mediana: ${NesimoElemento.mediana(lista7)}`);

console.log('\n📍 Teste 7: K menores e maiores');
const lista8 = [8, 3, 5, 4, 7, 6, 1, 2];
console.log(`Lista: [${lista8.join(', ')}]`);

console.log(`3 menores: [${NesimoElemento.kMenores(lista8, 3).join(', ')}]`);
console.log(`3 maiores: [${NesimoElemento.kMaiores(lista8, 3).join(', ')}]`);
console.log(`5 menores: [${NesimoElemento.kMenores(lista8, 5).join(', ')}]`);
console.log(`5 maiores: [${NesimoElemento.kMaiores(lista8, 5).join(', ')}]`);

console.log('\n📍 Teste 8: Números negativos');
const lista9 = [-3, -1, 0, 2, -5, 4];
console.log(`Lista: [${lista9.join(', ')}]`);
console.log(`Valores únicos ordenados: [${NesimoElemento.valoresUnicosOrdenados(lista9).join(', ')}]`);

for (let n = 1; n <= 6; n++) {
    const menor = NesimoElemento.nEsimoMenor(lista9, n);
    const maior = NesimoElemento.nEsimoMaior(lista9, n);
    console.log(`${n}º menor: ${menor}, ${n}º maior: ${maior}`);
}

console.log('\n📍 Teste 9: Demonstração da diferença entre critérios');
const listaDemo = [1, 1, 2, 2, 2, 3, 4, 4];
console.log(`Lista para demonstração: [${listaDemo.join(', ')}]`);
console.log(`Valores únicos: [${NesimoElemento.valoresUnicosOrdenados(listaDemo).join(', ')}]`);
console.log(`Lista ordenada: [${[...listaDemo].sort((a, b) => a - b).join(', ')}]`);

console.log('\nComparação de critérios para 2º menor:');
console.log(`Valores distintos: ${NesimoElemento.nEsimoMenor(listaDemo, 2)}`);
console.log(`Com duplicatas: ${NesimoElemento.nEsimoMenorComDuplicatas(listaDemo, 2)}`);