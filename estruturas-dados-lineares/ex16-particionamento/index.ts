import { Particionador } from './Particionador';

console.log('=== EXERCÍCIO 16 - PARTICIONAMENTO (ESTILO QUICKSORT) ===\n');

console.log('📍 Teste 1: Particionamento básico');
const lista1 = [3, 7, 1, 9, 4, 5, 2, 8, 6];
const pivo1 = 5;
console.log(`Lista: [${lista1.join(', ')}]`);
console.log(`Pivô: ${pivo1}`);

const resultado1 = Particionador.particionar(lista1, pivo1);
console.log(`Resultado: [${resultado1.join(', ')}]`);
console.log('Estrutura: [menores que 5] + [iguais a 5] + [maiores que 5]');

console.log('\n📍 Teste 2: Pivô não presente na lista');
const lista2 = [1, 3, 7, 9];
const pivo2 = 5;
console.log(`Lista: [${lista2.join(', ')}]`);
console.log(`Pivô: ${pivo2} (não presente)`);

const resultado2 = Particionador.particionar(lista2, pivo2);
console.log(`Resultado: [${resultado2.join(', ')}]`);

console.log('\n📍 Teste 3: Pivô é o menor elemento');
const lista3 = [5, 3, 8, 1, 6, 1, 9];
const pivo3 = 1;
console.log(`Lista: [${lista3.join(', ')}]`);
console.log(`Pivô: ${pivo3} (menor elemento)`);

const resultado3 = Particionador.particionar(lista3, pivo3);
console.log(`Resultado: [${resultado3.join(', ')}]`);

console.log('\n📍 Teste 4: Pivô é o maior elemento');
const lista4 = [5, 3, 8, 1, 6, 9, 2];
const pivo4 = 9;
console.log(`Lista: [${lista4.join(', ')}]`);
console.log(`Pivô: ${pivo4} (maior elemento)`);

const resultado4 = Particionador.particionar(lista4, pivo4);
console.log(`Resultado: [${resultado4.join(', ')}]`);

console.log('\n📍 Teste 5: Lista com muitas repetições');
const lista5 = [3, 5, 3, 7, 5, 1, 5, 3];
const pivo5 = 5;
console.log(`Lista: [${lista5.join(', ')}]`);
console.log(`Pivô: ${pivo5}`);

const resultado5 = Particionador.particionar(lista5, pivo5);
console.log(`Resultado: [${resultado5.join(', ')}]`);

console.log('\n📍 Teste 6: Particionamento in-place');
const lista6 = [3, 7, 1, 9, 4, 5, 2, 8, 6];
const pivo6 = 5;
console.log(`Lista original: [${lista6.join(', ')}]`);
console.log(`Pivô: ${pivo6}`);

const indiceMenores = Particionador.particionarInPlace(lista6, pivo6);
console.log(`Lista após particionamento: [${lista6.join(', ')}]`);
console.log(`Índice fim dos menores: ${indiceMenores}`);

console.log('\n📍 Teste 7: Casos extremos');

// Lista vazia
const listaVazia: number[] = [];
const resultadoVazio = Particionador.particionar(listaVazia, 5);
console.log(`Lista vazia com pivô 5: [${resultadoVazio.join(', ')}]`);

// Lista com um elemento
const listaUm = [7];
const resultadoUm = Particionador.particionar(listaUm, 5);
console.log(`Lista [7] com pivô 5: [${resultadoUm.join(', ')}]`);

// Todos elementos iguais ao pivô
const listaTodosIguais = [5, 5, 5, 5];
const resultadoTodosIguais = Particionador.particionar(listaTodosIguais, 5);
console.log(`Lista [5,5,5,5] com pivô 5: [${resultadoTodosIguais.join(', ')}]`);

console.log('\n📍 Teste 8: Particionamento múltiplo');
const lista8 = [8, 3, 5, 1, 9, 2, 7, 4, 6];
const pivos = [3, 7];
console.log(`Lista: [${lista8.join(', ')}]`);
console.log(`Pivôs: [${pivos.join(', ')}]`);

const resultado8 = Particionador.particionarMultiplo(lista8, pivos);
console.log(`Resultado: [${resultado8.join(', ')}]`);
console.log('Estrutura: [< 3] + [= 3] + [3 < x < 7] + [= 7] + [> 7]');

console.log('\n📍 Teste 9: Demonstração da estabilidade');
// Usando objetos simulados com números para mostrar ordem relativa
const listaEstabilidade = [31, 72, 51, 33, 74, 52];
console.log(`Lista: [${listaEstabilidade.join(', ')}]`);
console.log('(Números terminados em 1,2 = categoria A; 3,4 = categoria B)');
console.log(`Pivô: 50`);

const resultadoEstabilidade = Particionador.particionar(listaEstabilidade, 50);
console.log(`Resultado: [${resultadoEstabilidade.join(', ')}]`);
console.log('Ordem relativa preservada dentro de cada seção');

console.log('\n📍 Teste 10: Diferentes tipos de pivô');
const lista10 = [-2, 5, -1, 0, 3, -3, 4];
console.log(`Lista com negativos: [${lista10.join(', ')}]`);

const resultadoZero = Particionador.particionar(lista10, 0);
console.log(`Pivô 0: [${resultadoZero.join(', ')}]`);

const resultadoNegativo = Particionador.particionar(lista10, -1);
console.log(`Pivô -1: [${resultadoNegativo.join(', ')}]`);