// Luiz Schons - Exercício: As Figurinhas de Sheldon

/**
 * Classe Album para gerenciamento de coleção de figurinhas
 * Resolve o problema das figurinhas de Sheldon Cooper
 */
export class Album {
    private figurinhas: number[];

    /**
     * Construtor da classe Album
     * @param figurinhas matriz unidimensional de inteiros não ordenados representando a coleção
     */
    constructor(figurinhas: number[]) {
        this.figurinhas = [...figurinhas];
    }

    /**
     * Retorna uma matriz com as figurinhas repetidas ordenadas
     * Se uma figurinha aparece 3 vezes, mostra 2 vezes (as repetidas)
     * @returns matriz unidimensional com figurinhas repetidas ordenadas
     */
    public getRepeated(): number[] {
        const contagem = new Map<number, number>();
        const repetidas: number[] = [];

        // Contar ocorrências de cada figurinha
        for (const figurinha of this.figurinhas) {
            contagem.set(figurinha, (contagem.get(figurinha) || 0) + 1);
        }

        // Adicionar repetidas (quantidade - 1 para cada figurinha)
        for (const [figurinha, quantidade] of contagem) {
            for (let i = 0; i < quantidade - 1; i++) {
                repetidas.push(figurinha);
            }
        }

        // Retornar ordenado
        return repetidas.sort((a, b) => a - b);
    }

    /**
     * Retorna matriz com figurinhas que estão faltando na coleção
     * @param figurinhasParaTroca lista de figurinhas de outro colecionador
     * @returns matriz unidimensional com figurinhas faltantes, sem repetir
     */
    public getWanted(figurinhasParaTroca: number[]): number[] {
        const minhasNumerosUnicos = new Set(this.figurinhas);
        const faltantes = new Set<number>();

        // Verificar quais figurinhas para troca não tenho na minha coleção
        for (const figurinha of figurinhasParaTroca) {
            if (!minhasNumerosUnicos.has(figurinha)) {
                faltantes.add(figurinha);
            }
        }

        // Retornar como array ordenado
        return Array.from(faltantes).sort((a, b) => a - b);
    }
}