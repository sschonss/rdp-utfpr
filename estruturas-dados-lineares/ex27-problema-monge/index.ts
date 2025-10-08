import { ProblemaMonge } from './ProblemaMonge';

console.log('=== EXERCÍCIO 27 - PROBLEMA DO MONGE ===\n');

const problemaMonge = new ProblemaMonge();

// Configuração básica - 5 monges
console.log('🏮 Teste 1: Configuração Básica');
const nomes1 = ['Akira', 'Buda', 'Chen', 'Dao', 'Feng'];
const niveis1 = [3, 7, 5, 2, 8];
const energias1 = [45, 80, 60, 30, 90];

problemaMonge.inicializarMonges(nomes1, niveis1, energias1);
console.log('Monges iniciais:', problemaMonge.getMonges().map(m => `${m.nome}(N${m.nivel}/E${m.energia})`).join(', '));

const vencedor1 = problemaMonge.jogarCompleto();
console.log(`\n🏆 Vencedor: ${vencedor1.nome}`);
console.log(`📊 Total de rodadas: ${problemaMonge.getRodadaAtual()}`);

// Mostrar algumas linhas do histórico
const historico1 = problemaMonge.getHistorico();
console.log('\n📜 Últimos movimentos:');
historico1.slice(-8).forEach(linha => console.log(linha));
console.log();

// Teste com monges equilibrados
console.log('⚖️ Teste 2: Monges Equilibrados');
const nomes2 = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const niveis2 = [5, 5, 5, 5];
const energias2 = [50, 50, 50, 50];

problemaMonge.reiniciar();
problemaMonge.inicializarMonges(nomes2, niveis2, energias2);
const vencedor2 = problemaMonge.jogarCompleto();
console.log(`🏆 Vencedor: ${vencedor2.nome} em ${problemaMonge.getRodadaAtual()} rodadas\n`);

// Teste com grande disparidade
console.log('💪 Teste 3: Grande Disparidade');
const nomes3 = ['Novato', 'Mestre', 'Aprendiz'];
const niveis3 = [1, 10, 3];
const energias3 = [20, 100, 40];

problemaMonge.reiniciar();
problemaMonge.inicializarMonges(nomes3, niveis3, energias3);
const vencedor3 = problemaMonge.jogarCompleto();
console.log(`🏆 Vencedor: ${vencedor3.nome} em ${problemaMonge.getRodadaAtual()} rodadas\n`);

// Análise estatística de múltiplos jogos
console.log('📊 Análise Estatística (10 jogos por configuração):');

const configuracoes = [
    {
        nomes: ['Forte', 'Fraco'],
        niveis: [8, 2],
        energias: [80, 30]
    },
    {
        nomes: ['Rápido', 'Lento', 'Médio'],
        niveis: [4, 6, 5],
        energias: [90, 40, 60]
    },
    {
        nomes: ['A', 'B', 'C', 'D'],
        niveis: [7, 3, 5, 9],
        energias: [70, 85, 45, 60]
    }
];

const estatisticas = problemaMonge.analisarEstatisticas(configuracoes, 10);

estatisticas.forEach((stat, index) => {
    console.log(`\n🎯 Configuração ${stat.config}:`);
    console.log(`   Participantes: ${configuracoes[index].nomes.join(', ')}`);
    console.log(`   Rodadas médias: ${stat.rodadasMedia.toFixed(1)}`);
    console.log(`   Vitórias:`);
    
    Object.entries(stat.vencedores)
        .sort(([,a], [,b]) => b - a)
        .forEach(([nome, vitorias]) => {
            const porcentagem = (vitorias / 10 * 100).toFixed(0);
            const barra = '█'.repeat(Math.floor(vitorias / 2));
            console.log(`     ${nome}: ${vitorias}/10 (${porcentagem}%) ${barra}`);
        });
});

// Teste de capacidade máxima
console.log('\n🚀 Teste de Capacidade Máxima (12 monges):');
const nomesGrande = ['Monge1', 'Monge2', 'Monge3', 'Monge4', 'Monge5', 'Monge6', 
                   'Monge7', 'Monge8', 'Monge9', 'Monge10', 'Monge11', 'Monge12'];
const niveisGrande = Array.from({length: 12}, () => Math.floor(Math.random() * 10) + 1);
const energiasGrande = Array.from({length: 12}, () => Math.floor(Math.random() * 80) + 20);

problemaMonge.reiniciar();
problemaMonge.inicializarMonges(nomesGrande, niveisGrande, energiasGrande);

console.log('Configuração inicial:');
const configTexto: string[] = [];
problemaMonge.getMonges().forEach((monge, i) => {
    if (i % 4 === 0 && i > 0) configTexto.push('\n');
    configTexto.push(`${monge.nome}(N${monge.nivel}/E${monge.energia}) `);
});
console.log(configTexto.join(''));

const inicio = performance.now();
const vencedorGrande = problemaMonge.jogarCompleto();
const tempo = performance.now() - inicio;

console.log(`🏆 Vencedor: ${vencedorGrande.nome}`);
console.log(`⏱️ Tempo: ${tempo.toFixed(2)}ms`);
console.log(`🔄 Rodadas: ${problemaMonge.getRodadaAtual()}`);

// Exemplo de progressão rodada por rodada
console.log('\n🔍 Exemplo de jogo passo a passo (3 monges):');
problemaMonge.reiniciar();
problemaMonge.inicializarMonges(['Guerreiro', 'Sábio', 'Ninja'], [6, 4, 8], [70, 90, 55]);

let rodadas = 0;
let resultado = null;
while (!resultado && rodadas < 5) {
    resultado = problemaMonge.executarRodada();
    const historico = problemaMonge.getHistorico();
    
    // Mostrar movimentos da última rodada
    const ultimaRodada = historico.filter(linha => linha.includes(`RODADA ${problemaMonge.getRodadaAtual()}`));
    const indiceRodada = historico.lastIndexOf(ultimaRodada[0]);
    const movimentosRodada = historico.slice(indiceRodada);
    
    movimentosRodada.forEach(linha => console.log(linha));
    
    if (!resultado) {
        console.log('---');
    }
    rodadas++;
}

console.log('\n✅ Exercício 27 concluído - Problema do Monge implementado!');