/**
 * Classe que implementa contagem de frequências de elementos em uma lista
 */
export class ContadorFrequencias {
    
    /**
     * Conta a frequência de cada elemento na lista
     * @param lista lista de elementos para contar
     * @returns mapa onde chave é o elemento e valor é sua frequência
     */
    public contarFrequencias(lista: number[]): Map<number, number> {
        const frequencias = new Map<number, number>();
        
        for (const elemento of lista) {
            const frequenciaAtual = frequencias.get(elemento) || 0;
            frequencias.set(elemento, frequenciaAtual + 1);
        }
        
        return frequencias;
    }
    
    /**
     * Retorna o mapa de frequências como um objeto JavaScript
     * @param lista lista de elementos para contar
     * @returns objeto onde chave é o elemento e valor é sua frequência
     */
    public contarFrequenciasComoObjeto(lista: number[]): { [key: number]: number } {
        const frequencias: { [key: number]: number } = {};
        
        for (const elemento of lista) {
            frequencias[elemento] = (frequencias[elemento] || 0) + 1;
        }
        
        return frequencias;
    }
    
    /**
     * Retorna os elementos ordenados por frequência (mais frequente primeiro)
     * @param lista lista de elementos
     * @returns array de objetos com elemento e sua frequência, ordenado por frequência decrescente
     */
    public elementosPorFrequencia(lista: number[]): Array<{ elemento: number, frequencia: number }> {
        const mapaFrequencias = this.contarFrequencias(lista);
        const resultado: Array<{ elemento: number, frequencia: number }> = [];
        
        for (const [elemento, frequencia] of mapaFrequencias.entries()) {
            resultado.push({ elemento, frequencia });
        }
        
        // Ordena por frequência decrescente, depois por valor crescente (desempate)
        resultado.sort((a, b) => {
            if (a.frequencia !== b.frequencia) {
                return b.frequencia - a.frequencia; // Decrescente por frequência
            }
            return a.elemento - b.elemento; // Crescente por valor (desempate)
        });
        
        return resultado;
    }
    
    /**
     * Encontra o elemento mais frequente
     * @param lista lista de elementos
     * @returns objeto com o elemento mais frequente e sua frequência, ou null se lista vazia
     */
    public elementoMaisFrequente(lista: number[]): { elemento: number, frequencia: number } | null {
        if (lista.length === 0) {
            return null;
        }
        
        const frequencias = this.contarFrequencias(lista);
        let maxFrequencia = 0;
        let elementoMaisFrequente = lista[0];
        
        for (const [elemento, frequencia] of frequencias.entries()) {
            if (frequencia > maxFrequencia) {
                maxFrequencia = frequencia;
                elementoMaisFrequente = elemento;
            }
        }
        
        return { elemento: elementoMaisFrequente, frequencia: maxFrequencia };
    }
    
    /**
     * Encontra o elemento menos frequente
     * @param lista lista de elementos
     * @returns objeto com o elemento menos frequente e sua frequência, ou null se lista vazia
     */
    public elementoMenosFrequente(lista: number[]): { elemento: number, frequencia: number } | null {
        if (lista.length === 0) {
            return null;
        }
        
        const frequencias = this.contarFrequencias(lista);
        let minFrequencia = Number.MAX_SAFE_INTEGER;
        let elementoMenosFrequente = lista[0];
        
        for (const [elemento, frequencia] of frequencias.entries()) {
            if (frequencia < minFrequencia) {
                minFrequencia = frequencia;
                elementoMenosFrequente = elemento;
            }
        }
        
        return { elemento: elementoMenosFrequente, frequencia: minFrequencia };
    }
    
    /**
     * Encontra todos os elementos que aparecem exatamente n vezes
     * @param lista lista de elementos
     * @param n frequência desejada
     * @returns array com elementos que aparecem n vezes
     */
    public elementosComFrequencia(lista: number[], n: number): number[] {
        const frequencias = this.contarFrequencias(lista);
        const resultado: number[] = [];
        
        for (const [elemento, frequencia] of frequencias.entries()) {
            if (frequencia === n) {
                resultado.push(elemento);
            }
        }
        
        // Ordena o resultado para ter uma saída consistente
        resultado.sort((a, b) => a - b);
        
        return resultado;
    }
    
    /**
     * Calcula a diversidade da lista (número de elementos únicos)
     * @param lista lista de elementos
     * @returns número de elementos únicos
     */
    public diversidade(lista: number[]): number {
        const frequencias = this.contarFrequencias(lista);
        return frequencias.size;
    }
    
    /**
     * Converte o mapa de frequências para uma representação string legível
     * @param frequencias mapa de frequências
     * @returns string representando o mapa
     */
    public static mapParaString(frequencias: Map<number, number>): string {
        const pares: string[] = [];
        
        // Ordena as chaves para ter uma saída consistente
        const chavesOrdenadas = Array.from(frequencias.keys()).sort((a, b) => a - b);
        
        for (const chave of chavesOrdenadas) {
            const valor = frequencias.get(chave)!;
            pares.push(`${chave} → ${valor}`);
        }
        
        return `{${pares.join(', ')}}`;
    }
}