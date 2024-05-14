import { saveOutputFile } from "../../utils/index.js";

// Worst-fit: Consiste em escolher a maior área livre possível, de forma que a "sobra" seja grande o suficiente para alocar outros processos
export function makeWorstFit(memoryPartitions, processSizes) {
  const unallocatedProcessSizes = [];
  const updatedMemoryPartitions = [...memoryPartitions];

  for (const processSize of processSizes) {
    let largestHoleIndex = -1;
    let largestHoleSize = 0;

    for (let i = 0; i < updatedMemoryPartitions.length; i++) {
      const memoryPartition = updatedMemoryPartitions[i];

      // H = Hole, partição livre
      if (memoryPartition.type === "H" && memoryPartition.size >= processSize) {
        if (memoryPartition.size > largestHoleSize) {
          largestHoleIndex = i;
          largestHoleSize = memoryPartition.size;
        }
      }
    }

    if (largestHoleIndex !== -1) {
      const memoryPartition = updatedMemoryPartitions[largestHoleIndex];

      const newProcess = {
        type: "P", // P = Processo, partição alocada
        start: memoryPartition.start,
        size: processSize,
        end: memoryPartition.start + processSize,
      };

      memoryPartition.start += processSize; // Foi alocado um processo no começo desta partição, o início deve ser atualizado para após o processo recém-alocado.
      memoryPartition.size -= processSize; // O tamanho da partição é reduzido pois o processo recém-alocado ocupou espaço dentro da partição

      // Insere a nova partição (newProcess) antes da partição existente
      updatedMemoryPartitions.splice(largestHoleIndex, 0, newProcess);
    } else {
      unallocatedProcessSizes.push(processSize);
    }
  }

  // "limpar" ou "filtrar" partições que não têm mais utilidade, ou seja, as que têm tamanho zero. Podem surgir após alocações ou modificações na memória.
  const cleanedMemory = updatedMemoryPartitions.filter(
    (memoryPartition) => memoryPartition.size > 0
  );

  const result = {
    memoryPartitions: cleanedMemory,
    unallocatedProcessSizes,
  };

  saveOutputFile("worst-fit", result);

  return result;
}
