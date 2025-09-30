import { PesquisadorPadrao } from './PesquisadorPadrao';

console.log('=== EXERCÍCIO 18 - PESQUISA DE PADRÃO ===\n');

console.log('📍 Teste 1: Exemplo do enunciado');
const base1 = [1, 2, 1, 2, 1, 2];
const padrao1 = [1, 2];

console.log(`Base: [${base1.join(', ')}]`);
console.log(`Padrão: [${padrao1.join(', ')}]`);

const posicoes1 = PesquisadorPadrao.encontrarPosicoes(base1, padrao1);
console.log(`Posições encontradas: [${posicoes1.join(', ')}]`);

const comSobreposicao = PesquisadorPadrao.contarOcorrencias(base1, padrao1, true);
const semSobreposicao = PesquisadorPadrao.contarOcorrencias(base1, padrao1, false);

console.log(`Com sobreposição: ${comSobreposicao} ocorrências`);
console.log(`Sem sobreposição: ${semSobreposicao} ocorrências`);

console.log('\n📍 Teste 2: Padrão não encontrado');
const base2 = [1, 2, 3, 4, 5];
const padrao2 = [6, 7];

console.log(`Base: [${base2.join(', ')}]`);
console.log(`Padrão: [${padrao2.join(', ')}]`);
console.log(`Ocorrências: ${PesquisadorPadrao.contarOcorrencias(base2, padrao2, true)}`);

console.log('\n📍 Teste 3: Padrão maior que a base');
const base3 = [1, 2];
const padrao3 = [1, 2, 3, 4];

console.log(`Base: [${base3.join(', ')}]`);
console.log(`Padrão: [${padrao3.join(', ')}]`);
console.log(`Ocorrências: ${PesquisadorPadrao.contarOcorrencias(base3, padrao3, true)}`);

console.log('\n📍 Teste 4: Padrão de um elemento');
const base4 = [1, 2, 1, 3, 1, 4, 1];
const padrao4 = [1];

console.log(`Base: [${base4.join(', ')}]`);
console.log(`Padrão: [${padrao4.join(', ')}]`);
console.log(`Ocorrências: ${PesquisadorPadrao.contarOcorrencias(base4, padrao4, true)}`);