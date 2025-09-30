import { Josephus } from './Josephus';

console.log('=== EXERCÍCIO 10 - PROBLEMA DE JOSEPHUS ===\n');

// Teste básico
console.log('📍 Teste 1: Exemplo básico');
const numeros1 = [2, 3, 1, 4, 2];
const jogo1 = new Josephus(numeros1);
console.log(`Pessoas: ${jogo1.getPessoas()}`);
console.log(`Quantidade: ${jogo1.getQuantidadePessoas()}`);
console.log();

const vencedor1 = jogo1.jogar(0); // Começar da pessoa 1
console.log('='.repeat(50));

// Teste com início em pessoa diferente
console.log('\n📍 Teste 2: Mesmo grupo, início diferente');
const jogo2 = new Josephus(numeros1);
console.log(`Pessoas: ${jogo2.getPessoas()}`);
console.log();

const vencedor2 = jogo2.jogar(2); // Começar da pessoa 3
console.log('='.repeat(50));

// Teste com números maiores
console.log('\n📍 Teste 3: Números maiores');
const numeros3 = [5, 7, 3, 8, 4, 6];
const jogo3 = new Josephus(numeros3);
console.log(`Pessoas: ${jogo3.getPessoas()}`);
console.log();

const vencedor3 = jogo3.jogar(1); // Começar da pessoa 2
console.log('='.repeat(50));

// Teste com apenas duas pessoas
console.log('\n📍 Teste 4: Apenas duas pessoas');
const numeros4 = [3, 5];
const jogo4 = new Josephus(numeros4);
console.log(`Pessoas: ${jogo4.getPessoas()}`);
console.log();

const vencedor4 = jogo4.jogar(0);
console.log('='.repeat(50));

// Teste com uma pessoa
console.log('\n📍 Teste 5: Apenas uma pessoa');
const numeros5 = [10];
const jogo5 = new Josephus(numeros5);
console.log(`Pessoas: ${jogo5.getPessoas()}`);
console.log();

const vencedor5 = jogo5.jogar(0);
console.log('='.repeat(50));

// Teste com lista vazia
console.log('\n📍 Teste 6: Lista vazia');
const numeros6: number[] = [];
const jogo6 = new Josephus(numeros6);
console.log(`Pessoas: ${jogo6.getPessoas()}`);
console.log(`Quantidade: ${jogo6.getQuantidadePessoas()}`);
console.log();

const vencedor6 = jogo6.jogar(0);
console.log(`Resultado: ${vencedor6 ? `Pessoa ${vencedor6.id}` : 'Nenhum vencedor'}`);
console.log('='.repeat(50));

// Teste com números 1
console.log('\n📍 Teste 7: Todos escolhem número 1');
const numeros7 = [1, 1, 1, 1, 1];
const jogo7 = new Josephus(numeros7);
console.log(`Pessoas: ${jogo7.getPessoas()}`);
console.log('(Cada pessoa elimina a próxima)');
console.log();

const vencedor7 = jogo7.jogar(0);
console.log('='.repeat(50));

// Teste com números grandes
console.log('\n📍 Teste 8: Números grandes');
const numeros8 = [10, 15, 8, 20];
const jogo8 = new Josephus(numeros8);
console.log(`Pessoas: ${jogo8.getPessoas()}`);
console.log('(Números maiores que a quantidade de pessoas)');
console.log();

const vencedor8 = jogo8.jogar(0);
console.log('='.repeat(50));

// Teste com sorteio aleatório
console.log('\n📍 Teste 9: Início com sorteio aleatório');
const numeros9 = [3, 2, 4, 1, 5, 2];
const jogo9 = new Josephus(numeros9);
console.log(`Pessoas: ${jogo9.getPessoas()}`);
console.log();

const vencedor9 = jogo9.jogarComSorteio();
console.log('='.repeat(50));

// Teste demonstrativo detalhado
console.log('\n📍 Teste 10: Exemplo passo a passo detalhado');
const numeros10 = [2, 3, 1, 2];
const jogo10 = new Josephus(numeros10);
console.log('Situação inicial:');
console.log('- Pessoa 1 escolhe número 2');
console.log('- Pessoa 2 escolhe número 3');
console.log('- Pessoa 3 escolhe número 1');
console.log('- Pessoa 4 escolhe número 2');
console.log();
console.log('Simulação:');

const vencedor10 = jogo10.jogar(0);
console.log('='.repeat(50));

// Teste com múltiplos jogos
console.log('\n📍 Teste 11: Múltiplos jogos com mesmo grupo');
const numeros11 = [2, 3, 4, 1, 2];
console.log(`Testando diferentes pontos de partida para: [${numeros11.join(', ')}]`);
console.log();

for (let inicio = 0; inicio < numeros11.length; inicio++) {
    const jogo = new Josephus(numeros11);
    console.log(`🎯 Iniciando da pessoa ${inicio + 1}:`);
    const vencedor = jogo.jogar(inicio);
    console.log(`Vencedor: Pessoa ${vencedor?.id}\n`);
}

console.log('\n📍 Explicação do algoritmo:');
console.log('1. As pessoas ficam em círculo');
console.log('2. Uma pessoa é sorteada para começar');
console.log('3. Usa-se o número da pessoa atual para contar');
console.log('4. Conta-se a partir da PRÓXIMA pessoa');
console.log('5. A pessoa onde a contagem para é eliminada');
console.log('6. O número da pessoa eliminada é usado para a próxima contagem');
console.log('7. Repete até sobrar apenas uma pessoa');