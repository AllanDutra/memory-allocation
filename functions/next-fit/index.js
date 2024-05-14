/*
Next-fit (próximo encaixe): variante da estratégia first-fit que consiste em percorrer a
lista de áreas a partir da última área alocada ou liberada, para que o uso das
áreas livres seja distribuído de forma mais homogênea no espaço de memória
*/

import { saveOutputFile } from "../../utils/index.js";

export function makeNextFit(memoryPartitions, processSizes){
    tamMemo = -1;
    auxN = [];
    num = 0;

    for (process in processSizes) {

        for (i = num; i < memoryPartitions.length; i++) {

            tamanhoM = memoryPartitions[i].tamanho;
            tamanhoM = (tamanhoM < 0 ? -tamanhoM : tamanhoM);

            if ((memoryPartitions[i].estado == 'H' && process.computacao <= tamanhoM) && (process.alocado == 0)){
                memoryPartitions[i].estado = 'P';
                memoryPartitions[i].idProcesso = process.id;
                process.alocado = 1;
                num = i;
            }

            if (i + 1 == memoryPartitions.length) {
                num = 0;
            }

        }
    }

    for (process in processSizes) {
        if (process.alocado == 0) {
            auxN.id = process.id;
            auxN.tamanho = process.computacao;
            ProcessosNALOCADOS.add(auxN);
        }
        auxN = new ProcessoN();
    }
    result = ProcessosNALOCADOS;

    saveOutputFile("next-fit", result);
    return result;
}