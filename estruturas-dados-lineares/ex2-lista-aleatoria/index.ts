import { ListaAleatoria } from './ListaAleatoria';

console.log('=== EXERCÍCIO 2 - LISTA ALEATÓRIA ===\n');

// Teste com diferentes tamanhos de lista
const tamanhos = [5, 10, 15, 0, 1];

tamanhos.forEach((tamanho, index) => {
    console.log(`📍 Teste ${index + 1}: Lista com ${tamanho} elementos`);
    
    const lista = new ListaAleatoria(tamanho);
    
    console.log(`Lista gerada: ${lista.toString()}`);
    console.log(`Tamanho: ${lista.tamanho()}`);
    console.log(`Elementos: ${JSON.stringify(lista.getElementos())}`);
    console.log('---');
});

console.log('\n📍 Demonstração de que os números são realmente aleatórios:');
console.log('Gerando 5 listas de 10 elementos cada:');

for (let i = 1; i <= 5; i++) {
    const lista = new ListaAleatoria(10);
    console.log(`Lista ${i}: ${lista.toString()}`);
}