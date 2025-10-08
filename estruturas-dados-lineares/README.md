# Estruturas de Dados Lineares

Resolução dos exercícios da disciplina de Resolução de Problemas da UTFPR Campus Guarapuava, ministrada pelo Prof. Dr. Eleandro Maschio.

## 📁 Estrutura do Projeto

```
estruturas-dados-lineares/
├── ex1-balanceamento/           # Verificação de balanceamento de expressões
├── ex2-lista-aleatoria/         # Geração de lista aleatória
├── ex3-valor-corte/             # Remoção por valor de corte
├── ex4-remove-multiplos/        # Remoção por posições múltiplas
├── ex5-mais-proximo-media/      # Elemento mais próximo da média
├── ex6-reduz/                   # Redução de lista
├── ex7-fatia/                   # Criação de fatias
├── ex8-inverte/                 # Inversão de lista
├── ex9-amplitude/               # Cálculo de amplitude
├── ex10-josephus/               # Problema de Josephus
├── ex11-rotacao-circular/       # Rotação circular de lista
├── ex12-intersecao-uniao/       # Interseção e união de listas
├── ex13-substituicao-condicional/ # Substituição condicional
├── ex14-mapa-frequencias/       # Mapa de frequências
├── ex15-nesimo-menor-maior/     # N-ésimo menor e maior
├── ex16-particionamento/        # Particionamento estilo quicksort
├── ex17-agrupamento-faixas/     # Agrupamento em faixas de valores
├── ex18-pesquisa-padrao/        # Pesquisa de padrão em lista
├── ex19-sorteio-sem-reposicao/  # Sorteio sem reposição
├── ex20-serie-acumulada/        # Série acumulada com operação genérica
├── ex21-merge-sort/             # Merge sort adaptado com otimizações
├── ex22-busca-binaria/          # Busca binária avançada
├── ex23-janela-deslizante/      # Análise com janela deslizante
├── ex24-compressao-rle/         # Compressão Run-Length Encoding
├── ex25-maquina-estados/        # Máquina de estados para validação
├── ex26-josephus-classico/      # Problema de Josephus clássico otimizado
├── ex27-problema-monge/         # Problema do Monge com redistribuição
├── ex28-selecao-distancia/      # Seleção baseada em distância euclidiana
├── ex29-rotacao-circular/       # Rotação circular inteligente com cache
├── ex30-eliminacao-padrao/      # Eliminação por padrões matemáticos
└── README.md                    # Este arquivo
```

## 🚀 Como Executar

Para cada exercício, navegue até a pasta correspondente e execute:

```bash
# Exemplo para o exercício 1
cd ex1-balanceamento
npx tsx index.ts
```

Ou com Node.js (se tiver TypeScript configurado globalmente):
```bash
tsc *.ts && node index.js
```

## 📝 Exercícios Implementados

### Exercício 1 - Balanceamento
**Classe:** `Balanceamento`
- Verifica se expressões matemáticas estão balanceadas quanto a chaves `{}`, colchetes `[]` e parênteses `()`
- Considera hierarquia: chaves > colchetes > parênteses
- Não permite chaves dentro de parênteses

### Exercício 2 - Lista Aleatória
**Classe:** `ListaAleatoria`
- Gera lista com `n` elementos inteiros aleatórios (-100 a 100)
- Implementa método `toString()` personalizado
- Base para os demais exercícios da lista

### Exercício 3 - Valor de Corte
**Método:** `removerMenoresQue(valorCorte: number)`
- Remove todos os elementos menores que o valor especificado
- Mantém apenas elementos >= valorCorte

### Exercício 4 - Remove Múltiplos
**Método:** `removeMultiplos(numero: number)`
- Remove elementos em posições múltiplas do número fornecido
- Posições são 1-indexed (posição 1, 2, 3...)
- Se número = 0, lista permanece inalterada

### Exercício 5 - Mais Próximo da Média
**Método:** `maisProximoDaMedia(): number | null`
- Retorna o elemento mais próximo da média aritmética
- Em caso de empate, retorna o primeiro encontrado
- Inclui método auxiliar `calcularMedia()`

### Exercício 6 - Reduz
**Método:** `reduz(n: number)`
- Reduz a lista para conter apenas os primeiros `n` elementos
- Se `n >= tamanho atual`, não faz alterações
- Se `n < 0`, trata como 0 (lista vazia)

### Exercício 7 - Fatia
**Método:** `fatia(inicio: number, fim: number)`
- Altera lista para conter apenas elementos do índice `inicio` ao `fim` (inclusive)
- Implementação manual, sem uso de `slice()`
- Valida e ajusta parâmetros automaticamente

### Exercício 8 - Inverte
**Método:** `inverte()`
- Inverte a ordem dos elementos (primeiro vira último, etc.)
- Implementação manual sem uso de `reverse()`
- Usa técnica de dois ponteiros para eficiência O(n/2)

### Exercício 9 - Amplitude
**Método:** `amplitude(): number`
- Retorna a diferença entre o maior e menor elemento
- Inclui métodos auxiliares `maiorElemento()` e `menorElemento()`
- Retorna 0 para listas vazias ou com um elemento

### Exercício 10 - Josephus
**Classe:** `Josephus`
- Implementa variação do Problema de Josephus
- Pessoas em círculo, cada uma escolhe um número
- Eliminação baseada no número da pessoa eliminada anteriormente
- Método `jogar(pessoaInicial)` e `jogarComSorteio()`

## 🛠️ Tecnologias Utilizadas

- **TypeScript**: Linguagem principal
- **Orientação a Objetos**: Paradigma utilizado
- **Estruturas de Dados Lineares**: Arrays, listas

## 📚 Características da Implementação

### Princípios Seguidos
- **Orientação a Objetos**: Cada exercício implementado como classe
- **Sem Bibliotecas Externas**: Implementações manuais dos algoritmos
- **TypeScript Puro**: Sem dependências adicionais
- **Métodos Nativos Evitados**: Implementações próprias para `reverse()`, `slice()`, etc.

### Estrutura das Classes
- Atributos privados para encapsulamento
- Métodos públicos para interface
- Métodos auxiliares quando necessário
- Validação de parâmetros
- Tratamento de casos extremos

### Casos de Teste
- Cada exercício inclui arquivo `index.ts` com testes abrangentes
- Casos normais, extremos e de borda
- Demonstrações passo-a-passo para melhor compreensão

## 🎯 Objetivos de Aprendizado

1. **Manipulação de Arrays**: Operações básicas e avançadas
2. **Algoritmos de Busca**: Encontrar elementos com critérios específicos
3. **Algoritmos de Ordenação**: Conceitos implícitos na organização
4. **Estruturas de Dados**: Compreensão prática de listas lineares
5. **Complexidade**: Análise da eficiência dos algoritmos
6. **Orientação a Objetos**: Aplicação prática do paradigma

## 📋 Como Testar

1. Clone ou baixe o projeto
2. Navegue até a pasta de um exercício
3. Execute o arquivo `index.ts`
4. Observe os resultados e compare com os casos de teste

### Exercício 26 - Josephus Clássico

**Classe:** `JosephusClassico`
- Implementa o problema de Josephus clássico com fórmula matemática otimizada
- Suporta números muito grandes (milhões) sem limitações de memória
- Inclui análise de padrões e predição de sobreviventes

### Exercício 27 - Problema do Monge

**Classe:** `ProblemaMonge`
- Variação do Josephus onde elementos são redistribuídos baseado em energias
- Combate por proximidade e regeneração de energia
- Múltiplas estratégias de eliminação

### Exercício 28 - Seleção por Distância

**Classe:** `SelecaoDistancia`
- Algoritmos de seleção baseados em distância euclidiana em círculo
- Múltiplos critérios: vizinho distante, dispersão máxima, Josephus geométrico
- Análise comparativa de eficiência

### Exercício 29 - Rotação Circular Inteligente

**Classe:** `RotacaoCircular`
- Rotações otimizadas com cache e predição de padrões
- Sistema de estatísticas de acesso e performance
- Busca por rotação e análise de comportamento

### Exercício 30 - Eliminação por Padrão

**Classe:** `EliminacaoPadrao`
- Eliminação baseada em padrões matemáticos (Fibonacci, primos, perfeitos, etc.)
- Múltiplas estratégias de combinação de padrões
- Análise de eficiência e cache de cálculos

## 🤝 Contribuição

Este projeto foi desenvolvido como material didático. Sugestões de melhorias são bem-vindas!

## 📄 Licença

Material didático desenvolvido para a disciplina de Resolução de Problemas da UTFPR.

---

**Universidade Tecnológica Federal do Paraná**  
Campus Guarapuava  
Tecnologia em Sistemas para Internet  
Prof. Dr. Eleandro Maschio  
2024