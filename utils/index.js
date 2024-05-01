import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function readFileLines(filePath) {
  const data = readFileSync(filePath, "utf8");
  return data.split("\n").filter((line) => line.trim() !== "");
}

export function readMemoryPartitionsFromInputFile(filePath) {
  const memoryPartitions = [];
  const lines = readFileLines(filePath);

  for (const line of lines) {
    const [type, start, size] = line.split(" ");

    const memoryPartition = {
      type,
      start: parseInt(start, 10),
      size: parseInt(size, 10),
      end: parseInt(start, 10) + parseInt(size, 10),
    };

    memoryPartitions.push(memoryPartition);
  }

  return memoryPartitions;
}

export function readProcessSizesFromInputFile(filePath) {
  const processSizes = [];
  const lines = readFileLines(filePath);

  for (const line of lines) {
    const size = parseInt(line.trim(), 10);

    processSizes.push(size);
  }

  return processSizes;
}

export function saveOutputFile(algorithmName, result) {
  const lines = [];

  for (const memoryPartition of result.memoryPartitions) {
    const newLine = `${memoryPartition.type} ${memoryPartition.start} ${memoryPartition.size}`;
    lines.push(newLine);
  }

  if (result.unallocatedProcessSizes.length > 0) {
    const unallocatedProcesses = result.unallocatedProcessSizes.join(", ");
    lines.push(`PROCESSOS NÃO ALOCADOS (TAMANHOS): ${unallocatedProcesses}`);
  }

  const outputFilePath = path.resolve(
    __dirname,
    "../files/output/",
    `${algorithmName.toLowerCase()}-memory.txt`
  );

  writeFileSync(outputFilePath, lines.join("\n"), "utf8");

  console.log(
    `ALGORITMO ${algorithmName.toUpperCase()} CONCLUÍDO, RESULTADO NO ARQUIVO:`,
    outputFilePath
  );
}
