import { Balanceamento } from './Balanceamento';

console.log('=== EXERCÍCIO 1 - BALANCEAMENTO ===\n');

// Casos de teste com expressões válidas
const expressõesVálidas = [
    '(a + b)',
    '{a * [c – b * (e + f)]} – 2',
    '{[()]}',
    '((()))',
    '[[[a]]]',
    '{a + [b * (c + d)]}',
    ''
];

// Casos de teste com expressões inválidas
const expressõesInválidas = [
    '(a + b',
    'a + b)',
    '{a * [(c – b * (e + f)]} – 2',
    '([)]',
    '{[}]',
    '(a + [b)]',
    '{(a + b)}',  // chaves dentro de parênteses
    '[a + (b + {c})]'  // chaves dentro de parênteses via colchetes
];

console.log('📍 Testando expressões VÁLIDAS:');
expressõesVálidas.forEach((expr, index) => {
    const balanceamento = new Balanceamento(expr);
    const resultado = balanceamento.estaBalanceada();
    console.log(`${index + 1}. "${expr}" -> ${resultado ? '✅ BALANCEADA' : '❌ NÃO BALANCEADA'}`);
});

console.log('\n📍 Testando expressões INVÁLIDAS:');
expressõesInválidas.forEach((expr, index) => {
    const balanceamento = new Balanceamento(expr);
    const resultado = balanceamento.estaBalanceada();
    console.log(`${index + 1}. "${expr}" -> ${resultado ? '✅ BALANCEADA' : '❌ NÃO BALANCEADA'}`);
});

console.log('\n📍 Teste específico com hierarquia:');
const testesHierarquia = [
    '{a + [b + (c + d)]}',  // Correto: chaves > colchetes > parênteses
    '(a + [b + c])',        // Incorreto: colchetes dentro de parênteses
    '(a + {b + c})',        // Incorreto: chaves dentro de parênteses
];

testesHierarquia.forEach((expr, index) => {
    const balanceamento = new Balanceamento(expr);
    const resultado = balanceamento.estaBalanceada();
    console.log(`${index + 1}. "${expr}" -> ${resultado ? '✅ BALANCEADA' : '❌ NÃO BALANCEADA'}`);
});