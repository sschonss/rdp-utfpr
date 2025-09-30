import { ContadorFrequencias } from './ContadorFrequencias';

console.log('=== EXERCÍCIO 14 - MAPA DE FREQUÊNCIAS ===\n');

const contador = new ContadorFrequencias();

console.log('📍 Teste 1: Exemplo do enunciado');
const lista1 = [2, 5, 2, 3, 5, 2];
console.log(`Lista: [${lista1.join(', ')}]`);

const frequencias1 = contador.contarFrequencias(lista1);
console.log(`Frequências: ${ContadorFrequencias.mapParaString(frequencias1)}`);
console.log('Esperado: {2 → 3, 3 → 1, 5 → 2}');

console.log('\n📍 Teste 2: Lista sem repetições');
const lista2 = [1, 2, 3, 4, 5];
console.log(`Lista: [${lista2.join(', ')}]`);

const frequencias2 = contador.contarFrequencias(lista2);
console.log(`Frequências: ${ContadorFrequencias.mapParaString(frequencias2)}`);

console.log('\n📍 Teste 3: Lista com um elemento repetido');
const lista3 = [7, 7, 7, 7];
console.log(`Lista: [${lista3.join(', ')}]`);

const frequencias3 = contador.contarFrequencias(lista3);
console.log(`Frequências: ${ContadorFrequencias.mapParaString(frequencias3)}`);

console.log('\n📍 Teste 4: Lista vazia');
const lista4: number[] = [];
console.log(`Lista vazia: []`);

const frequencias4 = contador.contarFrequencias(lista4);
console.log(`Frequências: ${ContadorFrequencias.mapParaString(frequencias4)}`);

console.log('\n📍 Teste 5: Frequências como objeto');
const lista5 = [1, 2, 1, 3, 2, 1];
console.log(`Lista: [${lista5.join(', ')}]`);

const frequenciasObj = contador.contarFrequenciasComoObjeto(lista5);
console.log(`Frequências (objeto):`, frequenciasObj);

console.log('\n📍 Teste 6: Elementos ordenados por frequência');
const lista6 = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
console.log(`Lista: [${lista6.join(', ')}]`);

const elementosPorFreq = contador.elementosPorFrequencia(lista6);
console.log('Elementos por frequência (mais frequente primeiro):');
elementosPorFreq.forEach(item => {
    console.log(`  ${item.elemento}: ${item.frequencia} vezes`);
});

console.log('\n📍 Teste 7: Elemento mais e menos frequente');
const lista7 = [1, 1, 1, 2, 2, 3, 4, 4, 4, 4, 4];
console.log(`Lista: [${lista7.join(', ')}]`);

const maisFrequente = contador.elementoMaisFrequente(lista7);
const menosFrequente = contador.elementoMenosFrequente(lista7);

console.log(`Mais frequente: ${maisFrequente?.elemento} (${maisFrequente?.frequencia} vezes)`);
console.log(`Menos frequente: ${menosFrequente?.elemento} (${menosFrequente?.frequencia} vez)`);

console.log('\n📍 Teste 8: Elementos com frequência específica');
const lista8 = [1, 1, 2, 2, 2, 3, 4, 4, 5, 5, 5];
console.log(`Lista: [${lista8.join(', ')}]`);

console.log(`Elementos que aparecem 1 vez: [${contador.elementosComFrequencia(lista8, 1).join(', ')}]`);
console.log(`Elementos que aparecem 2 vezes: [${contador.elementosComFrequencia(lista8, 2).join(', ')}]`);
console.log(`Elementos que aparecem 3 vezes: [${contador.elementosComFrequencia(lista8, 3).join(', ')}]`);
console.log(`Elementos que aparecem 5 vezes: [${contador.elementosComFrequencia(lista8, 5).join(', ')}]`);

console.log('\n📍 Teste 9: Diversidade da lista');
const lista9 = [1, 1, 1, 1];
const lista10 = [1, 2, 3, 4, 5];
const lista11 = [1, 2, 1, 3, 2];

console.log(`Lista [1,1,1,1] - Diversidade: ${contador.diversidade(lista9)}`);
console.log(`Lista [1,2,3,4,5] - Diversidade: ${contador.diversidade(lista10)}`);
console.log(`Lista [1,2,1,3,2] - Diversidade: ${contador.diversidade(lista11)}`);

console.log('\n📍 Teste 10: Números negativos e zero');
const lista12 = [-1, 0, -1, 2, 0, -1, 3];
console.log(`Lista: [${lista12.join(', ')}]`);

const frequencias12 = contador.contarFrequencias(lista12);
console.log(`Frequências: ${ContadorFrequencias.mapParaString(frequencias12)}`);

console.log('\n📍 Teste 11: Casos extremos com elemento único');
const lista13 = [42];
console.log(`Lista com um elemento: [${lista13.join(', ')}]`);

const maisFreq13 = contador.elementoMaisFrequente(lista13);
const menosFreq13 = contador.elementoMenosFrequente(lista13);

console.log(`Mais frequente: ${maisFreq13?.elemento} (${maisFreq13?.frequencia} vez)`);
console.log(`Menos frequente: ${menosFreq13?.elemento} (${menosFreq13?.frequencia} vez)`);
console.log(`Diversidade: ${contador.diversidade(lista13)}`);

console.log('\n📍 Teste 12: Lista vazia - casos extremos');
const listaVazia: number[] = [];
const maisFreqVazia = contador.elementoMaisFrequente(listaVazia);
const menosFreqVazia = contador.elementoMenosFrequente(listaVazia);

console.log(`Lista vazia - Mais frequente: ${maisFreqVazia}`);
console.log(`Lista vazia - Menos frequente: ${menosFreqVazia}`);
console.log(`Lista vazia - Diversidade: ${contador.diversidade(listaVazia)}`);