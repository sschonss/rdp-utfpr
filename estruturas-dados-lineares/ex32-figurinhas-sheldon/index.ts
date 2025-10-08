import { Album } from './Album';

console.log('=== EXERCÍCIO 32 - AS FIGURINHAS DE SHELDON ===\n');

// Teste do exemplo fornecido no enunciado
console.log('🎯 Teste do Exemplo Original:');
let sheldon = new Album([3, 6, 9, 6, 12, 3, 6]);
console.log('Coleção do Sheldon:', [3, 6, 9, 6, 12, 3, 6]);
console.log('Repetidas:', sheldon.getRepeated());
console.log('Esperado: [3, 6, 6]');
console.log();

console.log('Figurinhas para troca:', [3, 6, 4, 12, 8, 4]);
console.log('Faltantes:', sheldon.getWanted([3, 6, 4, 12, 8, 4]));
console.log('Esperado: [4, 8]');
console.log();

// Testes adicionais para validar a implementação
console.log('📋 Testes Adicionais:');

// Teste 1: Coleção sem repetidas
console.log('1. Coleção sem repetidas:');
const album1 = new Album([1, 2, 3, 4, 5]);
console.log('  Coleção:', [1, 2, 3, 4, 5]);
console.log('  Repetidas:', album1.getRepeated());
console.log('  Esperado: []');
console.log();

// Teste 2: Muitas repetições da mesma figurinha
console.log('2. Muitas repetições:');
const album2 = new Album([7, 7, 7, 7, 7]);
console.log('  Coleção:', [7, 7, 7, 7, 7]);
console.log('  Repetidas:', album2.getRepeated());
console.log('  Esperado: [7, 7, 7, 7] (4 repetidas de 5 total)');
console.log();

// Teste 3: Coleção vazia
console.log('3. Coleção vazia:');
const album3 = new Album([]);
console.log('  Coleção:', []);
console.log('  Repetidas:', album3.getRepeated());
console.log('  Faltantes de [1, 2, 3]:', album3.getWanted([1, 2, 3]));
console.log('  Esperado: [] para repetidas, [1, 2, 3] para faltantes');
console.log();

// Teste 4: Números não ordenados
console.log('4. Números não ordenados:');
const album4 = new Album([15, 2, 8, 2, 15, 1, 8, 15]);
console.log('  Coleção:', [15, 2, 8, 2, 15, 1, 8, 15]);
console.log('  Repetidas:', album4.getRepeated());
console.log('  Esperado: [2, 8, 15, 15] (ordenadas)');
console.log();

// Teste 5: Troca com todas figurinhas já possuídas
console.log('5. Troca com figurinhas já possuídas:');
const album5 = new Album([1, 2, 3, 4]);
console.log('  Coleção:', [1, 2, 3, 4]);
console.log('  Troca oferecida:', [1, 2, 3]);
console.log('  Faltantes:', album5.getWanted([1, 2, 3]));
console.log('  Esperado: [] (não falta nenhuma)');
console.log();

// Teste 6: Troca com repetidas na oferta
console.log('6. Troca com repetidas na oferta:');
const album6 = new Album([5, 10]);
console.log('  Coleção:', [5, 10]);
console.log('  Troca oferecida:', [1, 1, 2, 2, 3]);
console.log('  Faltantes:', album6.getWanted([1, 1, 2, 2, 3]));
console.log('  Esperado: [1, 2, 3] (sem repetir)');
console.log();

// Teste 7: Caso complexo
console.log('7. Caso complexo:');
const albumComplexo = new Album([1, 5, 3, 5, 7, 1, 3, 5, 9, 1]);
console.log('  Coleção:', [1, 5, 3, 5, 7, 1, 3, 5, 9, 1]);
console.log('  Repetidas:', albumComplexo.getRepeated());

const trocaCompleta = [2, 4, 6, 8, 1, 3, 5, 10, 11, 12];
console.log('  Troca oferecida:', trocaCompleta);
console.log('  Faltantes:', albumComplexo.getWanted(trocaCompleta));
console.log();

// Teste 8: Verificação de ordenação
console.log('8. Verificação de ordenação:');
const albumOrdem = new Album([100, 50, 75, 25, 50, 100, 75]);
console.log('  Coleção:', [100, 50, 75, 25, 50, 100, 75]);
console.log('  Repetidas:', albumOrdem.getRepeated());
console.log('  Esperado: [50, 75, 100] (ordenado crescente)');
console.log();

// Demonstração prática: Simulação de troca entre colecionadores
console.log('🤝 Simulação de Troca entre Colecionadores:');
const sheldonAlbum = new Album([1, 3, 5, 7, 9, 3, 5, 11, 13]);
const leonardAlbum = new Album([2, 4, 6, 8, 10, 3, 12, 14]);

console.log('Coleção do Sheldon:', [1, 3, 5, 7, 9, 3, 5, 11, 13]);
console.log('Repetidas do Sheldon:', sheldonAlbum.getRepeated());

console.log('\nColeção do Leonard:', [2, 4, 6, 8, 10, 3, 12, 14]);
console.log('O que Sheldon quer da coleção do Leonard:', sheldonAlbum.getWanted([2, 4, 6, 8, 10, 3, 12, 14]));

console.log('\nTroca benéfica:');
console.log('- Sheldon pode oferecer suas repetidas:', sheldonAlbum.getRepeated());
console.log('- Sheldon quer:', sheldonAlbum.getWanted([2, 4, 6, 8, 10, 3, 12, 14]));

console.log('\n✅ Exercício 32 concluído - As Figurinhas de Sheldon implementadas!');
console.log('💡 Implementação segue exatamente as especificações do Prof. Dr. Eleandro Maschio');