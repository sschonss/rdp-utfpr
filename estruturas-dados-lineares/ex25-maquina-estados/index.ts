import { MaquinaEstados } from './MaquinaEstados';

console.log('=== EXERCÍCIO 25 - MÁQUINA DE ESTADOS ===\n');

const sequencias = [
    [2, 1, 3, 0, 4, 1],     // Válida: par→ímpar→crescente→decrescente
    [1, 2, 4, 3, 5],        // Válida: ímpar→par→crescente→decrescente
    [2, 2, 1],              // Inválida: dois pares seguidos
    [1, 3, 5],              // Inválida: três ímpares
    [2, 1],                 // Muito curta
    [4, 3, 5, 2, 7, 1],     // Alternando crescente/decrescente
];

sequencias.forEach((seq, i) => {
    console.log(`Teste ${i + 1}: [${seq.join(', ')}]`);
    
    const resultado = MaquinaEstados.validarPadrao(seq);
    console.log(`Resultado: ${resultado.valida ? '✅ VÁLIDA' : '❌ INVÁLIDA'}`);
    
    console.log('Histórico de transições:');
    resultado.historico.forEach((transicao, j) => {
        console.log(`  ${j + 1}. ${transicao}`);
    });
    console.log('');
});