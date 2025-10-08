import { BuscaBinaria } from './BuscaBinaria';

console.log('=== EXERCÍCIO 22 - BUSCA BINÁRIA AVANÇADA ===\n');

console.log('📍 Teste 1: Busca binária básica');
const busca1 = new BuscaBinaria([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
console.log(`Lista: ${busca1.toString()}`);
console.log(`Está ordenada: ${busca1.isOrdenado()}`);

const testes = [7, 10, 1, 19, 20];
testes.forEach(valor => {
    const indice = busca1.buscar(valor);
    console.log(`Buscar ${valor}: índice ${indice} (${busca1.obterComparacoes()} comparações)`);
});

console.log('\n📍 Teste 2: Primeira e última ocorrência');
const busca2 = new BuscaBinaria([1, 2, 2, 2, 3, 4, 4, 5, 5, 5, 5, 6]);
console.log(`Lista com duplicatas: ${busca2.toString()}`);

const valorDuplicado = 5;
const primeiro = busca2.buscarPrimeiro(valorDuplicado);
const ultimo = busca2.buscarUltimo(valorDuplicado);
console.log(`Valor ${valorDuplicado}: primeira ocorrência=${primeiro}, última=${ultimo}`);
console.log(`Todas as ocorrências nos índices: ${Array.from({length: ultimo - primeiro + 1}, (_, i) => primeiro + i)}`);

console.log('\n📍 Teste 3: Busca por faixa');
const busca3 = new BuscaBinaria([10, 15, 20, 25, 30, 35, 40, 45, 50]);
console.log(`Lista: ${busca3.toString()}`);

const faixas = [
    [20, 40],
    [12, 18],
    [45, 60],
    [5, 15]
];

faixas.forEach(([min, max]) => {
    const indices = busca3.buscarFaixa(min, max);
    const valores = indices.map(i => busca3.getElementos()[i]);
    console.log(`Faixa [${min}, ${max}]: índices [${indices.join(',')}] = valores [${valores.join(',')}]`);
});

console.log('\n📍 Teste 4: Elemento mais próximo');
const busca4 = new BuscaBinaria([10, 20, 30, 40, 50]);
console.log(`Lista: ${busca4.toString()}`);

const valoresTeste = [15, 25, 35, 5, 55, 30];
valoresTeste.forEach(valor => {
    const proximo = busca4.buscarMaisProximo(valor);
    console.log(`Mais próximo de ${valor}: índice ${proximo.indice}, valor ${proximo.valor}, distância ${proximo.distancia}`);
});

console.log('\n📍 Teste 5: Posição de inserção');
const busca5 = new BuscaBinaria([10, 30, 50, 70, 90]);
console.log(`Lista: ${busca5.toString()}`);

const valoresInserir = [5, 25, 45, 65, 95, 30];
valoresInserir.forEach(valor => {
    const posicao = busca5.buscarPosicaoInsercao(valor);
    console.log(`Inserir ${valor} na posição ${posicao}`);
});

console.log('\n📍 Teste 6: Inserção ordenada');
const busca6 = new BuscaBinaria([10, 30, 50, 70, 90]);
console.log(`Lista inicial: ${busca6.toString()}`);

const novosValores = [25, 45, 5, 95, 30];
novosValores.forEach(valor => {
    const posicao = busca6.inserirOrdenado(valor);
    console.log(`Inserido ${valor} na posição ${posicao}: ${busca6.toString()}`);
});

console.log('\n📍 Teste 7: Lista não ordenada');
const busca7 = new BuscaBinaria([5, 2, 8, 1, 9]);
console.log(`Lista não ordenada: ${busca7.toString()}`);
console.log(`Está ordenada: ${busca7.isOrdenado()}`);

try {
    busca7.buscar(5);
} catch (error) {
    console.log(`Erro esperado: ${(error as Error).message}`);
}

console.log('Forçando ordenação...');
busca7.ordenar();
console.log(`Lista após ordenação: ${busca7.toString()}`);
console.log(`Agora está ordenada: ${busca7.isOrdenado()}`);

const resultado = busca7.buscar(5);
console.log(`Buscar 5: índice ${resultado}`);

console.log('\n📍 Teste 8: Casos extremos');

// Lista vazia
try {
    const buscaVazia = new BuscaBinaria([]);
    buscaVazia.buscarMaisProximo(5);
} catch (error) {
    console.log(`Lista vazia - erro esperado: ${(error as Error).message}`);
}

// Lista com um elemento
const buscaUm = new BuscaBinaria([42]);
console.log(`Lista [42]: buscar 42 = índice ${buscaUm.buscar(42)}`);
console.log(`Lista [42]: buscar 40 = índice ${buscaUm.buscar(40)}`);

const proximoUm = buscaUm.buscarMaisProximo(40);
console.log(`Mais próximo de 40: valor ${proximoUm.valor}, distância ${proximoUm.distancia}`);

console.log('\n📍 Teste 9: Análise de desempenho');
const tamanhos = [100, 1000, 10000];

tamanhos.forEach(n => {
    // Gera lista ordenada
    const listaGrande = Array.from({length: n}, (_, i) => i * 2);
    const buscaGrande = new BuscaBinaria(listaGrande);
    
    // Busca elemento no meio
    const valorMedio = Math.floor(n);
    const inicio = Date.now();
    const resultado = buscaGrande.buscar(valorMedio);
    const fim = Date.now();
    
    console.log(`Lista de ${n} elementos:`);
    console.log(`  Buscar ${valorMedio}: índice ${resultado}`);
    console.log(`  Comparações: ${buscaGrande.obterComparacoes()}`);
    console.log(`  Tempo: ${fim - inicio}ms`);
    console.log(`  Comparações teóricas máximas: ${Math.ceil(Math.log2(n))}`);
});