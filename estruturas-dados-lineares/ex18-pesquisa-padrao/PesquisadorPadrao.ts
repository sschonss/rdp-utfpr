/**
 * Classe que implementa pesquisa de padrão em lista
 */
export class PesquisadorPadrao {
    
    /**
     * Conta ocorrências de um padrão em uma lista base
     * @param base lista onde buscar o padrão
     * @param padrao padrão a ser encontrado
     * @param sobreposicao se permite sobreposições entre ocorrências
     * @returns número de ocorrências encontradas
     */
    public static contarOcorrencias(base: number[], padrao: number[], sobreposicao: boolean): number {
        if (padrao.length === 0 || base.length < padrao.length) {
            return 0;
        }
        
        let contador = 0;
        let i = 0;
        
        while (i <= base.length - padrao.length) {
            if (this.corresponde(base, i, padrao)) {
                contador++;
                // Se não permite sobreposição, pula o comprimento do padrão
                i += sobreposicao ? 1 : padrao.length;
            } else {
                i++;
            }
        }
        
        return contador;
    }
    
    /**
     * Verifica se o padrão corresponde à posição específica da lista base
     * @param base lista base
     * @param inicio posição inicial para verificação
     * @param padrao padrão a ser comparado
     * @returns true se corresponde, false caso contrário
     */
    private static corresponde(base: number[], inicio: number, padrao: number[]): boolean {
        for (let i = 0; i < padrao.length; i++) {
            if (base[inicio + i] !== padrao[i]) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Encontra todas as posições onde o padrão ocorre
     * @param base lista onde buscar
     * @param padrao padrão a ser encontrado
     * @returns array com todas as posições de início das ocorrências
     */
    public static encontrarPosicoes(base: number[], padrao: number[]): number[] {
        const posicoes: number[] = [];
        
        if (padrao.length === 0 || base.length < padrao.length) {
            return posicoes;
        }
        
        for (let i = 0; i <= base.length - padrao.length; i++) {
            if (this.corresponde(base, i, padrao)) {
                posicoes.push(i);
            }
        }
        
        return posicoes;
    }
}