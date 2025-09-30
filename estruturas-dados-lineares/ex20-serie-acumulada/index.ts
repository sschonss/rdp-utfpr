import { SerieAcumulada } from './SerieAcumulada';

console.log('=== EXERCÍCIO 20 - SÉRIE ACUMULADA ===\n');

console.log('📍 Teste 1: Exemplos do enunciado');
const serie1 = new SerieAcumulada([2, 5, 1, 4]);
console.log(`Lista: [${serie1.getElementos().join(', ')}]`);

const soma = serie1.somaAcumulada();
console.log(`Soma acumulada: [${soma.join(', ')}]`);
console.log('Explicação: [2, 2+5, 7+1, 8+4] = [2, 7, 8, 12]');

const produto = serie1.produtoAcumulado();
console.log(`Produto acumulado: [${produto.join(', ')}]`);
console.log('Explicação: [2, 2*5, 10*1, 10*4] = [2, 10, 10, 40]');

console.log('\n📍 Teste 2: Outras operações');
const serie2 = new SerieAcumulada([3, 1, 4, 2, 5]);
console.log(`Lista: [${serie2.getElementos().join(', ')}]`);

const maximo = serie2.maximoAcumulado();
console.log(`Máximo acumulado: [${maximo.join(', ')}]`);

const minimo = serie2.minimoAcumulado();
console.log(`Mínimo acumulado: [${minimo.join(', ')}]`);

const subtracao = serie2.transformarAcumulado(SerieAcumulada.operacoes.subtracao);
console.log(`Subtração acumulada: [${subtracao.join(', ')}]`);

console.log('\n📍 Teste 3: Casos extremos');

// Lista vazia
const serieVazia = new SerieAcumulada([]);
console.log(`Lista vazia - soma: [${serieVazia.somaAcumulada().join(', ')}]`);

// Lista com um elemento
const serieUm = new SerieAcumulada([42]);
console.log(`Lista [42] - soma: [${serieUm.somaAcumulada().join(', ')}]`);
console.log(`Lista [42] - produto: [${serieUm.produtoAcumulado().join(', ')}]`);

console.log('\n📍 Teste 4: Operação personalizada');
const serie4 = new SerieAcumulada([1, 2, 3, 4, 5]);
console.log(`Lista: [${serie4.getElementos().join(', ')}]`);

// Operação personalizada: diferença absoluta
const diferencaAbsoluta = (a: number, b: number) => Math.abs(a - b);
const resultado4 = serie4.transformarAcumulado(diferencaAbsoluta);
console.log(`Diferença absoluta acumulada: [${resultado4.join(', ')}]`);

// Operação personalizada: média
const media = (a: number, b: number) => (a + b) / 2;
const resultado5 = serie4.transformarAcumulado(media);
console.log(`Média acumulada: [${resultado5.join(', ')}]`);

console.log('\n📍 Teste 5: Números negativos');
const serie5 = new SerieAcumulada([-2, 3, -1, 4]);
console.log(`Lista com negativos: [${serie5.getElementos().join(', ')}]`);

console.log(`Soma: [${serie5.somaAcumulada().join(', ')}]`);
console.log(`Produto: [${serie5.produtoAcumulado().join(', ')}]`);
console.log(`Máximo: [${serie5.maximoAcumulado().join(', ')}]`);
console.log(`Mínimo: [${serie5.minimoAcumulado().join(', ')}]`);