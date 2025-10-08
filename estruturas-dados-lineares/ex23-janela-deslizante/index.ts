import { JanelaDeslizante } from './JanelaDeslizante';

console.log('=== EXERCÍCIO 23 - JANELA DESLIZANTE ===\n');

const janela = new JanelaDeslizante([1, 3, 2, 5, 4, 6, 8, 7, 9], 3);
console.log(`Lista: ${janela.toString()}`);
console.log(`Tamanho da janela: ${janela.getTamanhoJanela()}`);

console.log(`Máximos: [${janela.maximosJanela().join(', ')}]`);
console.log(`Mínimos: [${janela.minimosJanela().join(', ')}]`);
console.log(`Somas: [${janela.somasJanela().join(', ')}]`);
console.log(`Médias: [${janela.mediasJanela().map(m => m.toFixed(2)).join(', ')}]`);