/*
Next-fit (próximo encaixe): variante da estratégia first-fit que consiste em percorrer a
lista de áreas a partir da última área alocada ou liberada, para que o uso das
áreas livres seja distribuído de forma mais homogênea no espaço de memória
*/

import { saveOutputFile } from "../../utils/index.js";

function makeAllocation(memoryPartition, process, updatedMemoryPartitions) {
  const newProcess = {
    type: "P",
    start: memoryPartition.start,
    size: process,
    end: memoryPartition.start + process,
  };

  memoryPartition.start += process;

  memoryPartition.size -= process;

  updatedMemoryPartitions.splice(
    updatedMemoryPartitions.indexOf(memoryPartition),
    0,
    newProcess
  );
}

export function makeNextFit(memoryPartitions, processSizes) {
  const processosNaoAlocados = [];
  const updatedMemoryPartitions = [...memoryPartitions];

  let indiceNextFit = 0;

  for (const process of processSizes) {
    let allocated = false;

    for (let i = indiceNextFit; i < updatedMemoryPartitions.length; i++) {
      const memoryPartition = updatedMemoryPartitions[i];

      if (
        memoryPartition.type === "H" &&
        process <= memoryPartition.size &&
        !allocated
      ) {
        makeAllocation(memoryPartition, process, updatedMemoryPartitions);

        allocated = true;
        indiceNextFit = i;
      }
    }

    if (!allocated && indiceNextFit > 0) {
      for (let i = indiceNextFit; i >= 0; i--) {
        const memoryPartition = updatedMemoryPartitions[i];

        if (
          memoryPartition.type === "H" &&
          process <= memoryPartition.size &&
          !allocated
        ) {
          makeAllocation(memoryPartition, process, updatedMemoryPartitions);

          allocated = true;
          indiceNextFit = i;
        }
      }
    }

    if (!allocated) {
      processosNaoAlocados.push(process);
    }
  }

  const cleanedMemory = updatedMemoryPartitions.filter(
    (memoryPartition) => memoryPartition.size > 0
  );

  const result = {
    memoryPartitions: cleanedMemory,
    unallocatedProcessSizes: processosNaoAlocados,
  };

  saveOutputFile("next-fit", result);

  return result;
}
