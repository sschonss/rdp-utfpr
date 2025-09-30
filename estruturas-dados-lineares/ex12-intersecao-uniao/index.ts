import { OperacoesLista } from './OperacoesLista';

console.log('=== EXERCÍCIO 12 - INTERSEÇÃO E UNIÃO ===\n');

console.log('📍 Teste 1: Exemplo básico');
const lista1 = [1, 2, 3, 2, 4];
const lista2 = [2, 3, 3, 5, 2];

console.log(`Lista A: [${lista1.join(', ')}]`);
console.log(`Lista B: [${lista2.join(', ')}]`);

const intersecao1 = OperacoesLista.intersecao(lista1, lista2);
const uniao1 = OperacoesLista.uniao(lista1, lista2);

console.log(`Interseção: [${intersecao1.join(', ')}]`);
console.log(`União: [${uniao1.join(', ')}]`);
console.log('Explicação da interseção:');
console.log('- Elemento 2: aparece 2x em A e 2x em B → min(2,2) = 2 vezes');
console.log('- Elemento 3: aparece 1x em A e 2x em B → min(1,2) = 1 vez');

console.log('\n📍 Teste 2: Listas sem elementos comuns');
const lista3 = [1, 2, 3];
const lista4 = [4, 5, 6];

console.log(`Lista A: [${lista3.join(', ')}]`);
console.log(`Lista B: [${lista4.join(', ')}]`);

const intersecao2 = OperacoesLista.intersecao(lista3, lista4);
const uniao2 = OperacoesLista.uniao(lista3, lista4);

console.log(`Interseção: [${intersecao2.join(', ')}] (vazia)`);
console.log(`União: [${uniao2.join(', ')}]`);

console.log('\n📍 Teste 3: Uma lista contida na outra');
const lista5 = [1, 2];
const lista6 = [1, 1, 2, 2, 3];

console.log(`Lista A: [${lista5.join(', ')}]`);
console.log(`Lista B: [${lista6.join(', ')}]`);

const intersecao3 = OperacoesLista.intersecao(lista5, lista6);
const uniao3 = OperacoesLista.uniao(lista5, lista6);

console.log(`Interseção: [${intersecao3.join(', ')}]`);
console.log(`União: [${uniao3.join(', ')}]`);

console.log('\n📍 Teste 4: Listas idênticas');
const lista7 = [1, 2, 3, 2];
const lista8 = [1, 2, 3, 2];

console.log(`Lista A: [${lista7.join(', ')}]`);
console.log(`Lista B: [${lista8.join(', ')}]`);

const intersecao4 = OperacoesLista.intersecao(lista7, lista8);
const uniao4 = OperacoesLista.uniao(lista7, lista8);

console.log(`Interseção: [${intersecao4.join(', ')}]`);
console.log(`União: [${uniao4.join(', ')}]`);

console.log('\n📍 Teste 5: Lista vazia');
const lista9 = [1, 2, 3];
const lista10: number[] = [];

console.log(`Lista A: [${lista9.join(', ')}]`);
console.log(`Lista B: [] (vazia)`);

const intersecao5 = OperacoesLista.intersecao(lista9, lista10);
const uniao5 = OperacoesLista.uniao(lista9, lista10);

console.log(`Interseção: [${intersecao5.join(', ')}] (vazia)`);
console.log(`União: [${uniao5.join(', ')}]`);

console.log('\n📍 Teste 6: Versões alternativas');
const listaA = [1, 2, 2, 3];
const listaB = [2, 3, 3, 4];

console.log(`Lista A: [${listaA.join(', ')}]`);
console.log(`Lista B: [${listaB.join(', ')}]`);

const intersecaoOriginal = OperacoesLista.intersecao(listaA, listaB);
const intersecaoPreservada = OperacoesLista.intersecaoOrdemPreservada(listaA, listaB);

console.log(`Interseção normal: [${intersecaoOriginal.join(', ')}]`);
console.log(`Interseção ordem preservada: [${intersecaoPreservada.join(', ')}]`);

const uniaoOriginal = OperacoesLista.uniao(listaA, listaB);
const uniaoSemDuplicatas = OperacoesLista.uniaoSemDuplicatas(listaA, listaB);

console.log(`União com repetições: [${uniaoOriginal.join(', ')}]`);
console.log(`União sem duplicatas: [${uniaoSemDuplicatas.join(', ')}]`);

console.log('\n📍 Teste 7: Caso com muitas repetições');
const listaX = [1, 1, 1, 2, 2];
const listaY = [1, 2, 2, 2, 3];

console.log(`Lista A: [${listaX.join(', ')}]`);
console.log(`Lista B: [${listaY.join(', ')}]`);

const intersecaoX = OperacoesLista.intersecao(listaX, listaY);
const uniaoX = OperacoesLista.uniao(listaX, listaY);

console.log(`Interseção: [${intersecaoX.join(', ')}]`);
console.log(`União: [${uniaoX.join(', ')}]`);
console.log('Explicação da interseção:');
console.log('- Elemento 1: min(3,1) = 1 vez');
console.log('- Elemento 2: min(2,3) = 2 vezes');
console.log('Explicação da união:');
console.log('- Elemento 1: 3+1 = 4 vezes');
console.log('- Elemento 2: 2+3 = 5 vezes');
console.log('- Elemento 3: 0+1 = 1 vez');