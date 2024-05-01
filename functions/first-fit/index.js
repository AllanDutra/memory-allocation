import { saveOutputFile } from "../../utils/index.js";

export function makeFirstFit(memoryPartitions, processSizes) {
  const unallocatedProcessSizes = [];
  const updatedMemoryPartitions = [...memoryPartitions];

  for (const processSize of processSizes) {
    let allocated = false;

    for (const memoryPartition of updatedMemoryPartitions) {
      // H = Hole, partição livre
      if (memoryPartition.type === "H" && memoryPartition.size >= processSize) {
        const newProcess = {
          type: "P", // P = Processo, partição alocada
          start: memoryPartition.start,
          size: processSize,
          end: memoryPartition.start + processSize,
        };

        memoryPartition.start += processSize; // Foi alocado um processo no começo desta partição, o início deve ser atualizado para após o processo recém-alocado.
        memoryPartition.size -= processSize; // O tamanho da partição é reduzido pois o processo recém-alocado ocupou espaço dentro da partição

        // Insere a nova partição (newProcess) antes da partição existente
        updatedMemoryPartitions.splice(
          updatedMemoryPartitions.indexOf(memoryPartition),
          0,
          newProcess
        );

        allocated = true;
        break;
      }
    }

    if (!allocated) unallocatedProcessSizes.push(processSize);
  }

  // "limpar" ou "filtrar" partições que não têm mais utilidade, ou seja, as que têm tamanho zero. Podem surgir após alocações ou modificações na memória.
  const cleanedMemory = updatedMemoryPartitions.filter(
    (memoryPartition) => memoryPartition.size > 0
  );

  const result = {
    memoryPartitions: cleanedMemory,
    unallocatedProcessSizes,
  };

  saveOutputFile("first-fit", result);

  return result;
}
