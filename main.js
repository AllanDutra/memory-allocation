import path from "path";
import {
  readMemoryPartitionsFromInputFile,
  readProcessSizesFromInputFile,
} from "./utils/index.js";
import { makeFirstFit, makeWorstFit, makeNextFit } from "./functions/index.js";

const memoryFilePath = path.resolve("./files/input/", "memory.txt");
const processesFilePath = path.resolve("./files/input/", "processes.txt");

makeFirstFit(
  readMemoryPartitionsFromInputFile(memoryFilePath),
  readProcessSizesFromInputFile(processesFilePath)
);

makeWorstFit(
  readMemoryPartitionsFromInputFile(memoryFilePath),
  readProcessSizesFromInputFile(processesFilePath)
);

makeNextFit(
  readMemoryPartitionsFromInputFile(memoryFilePath),
  readProcessSizesFromInputFile(processesFilePath)
);
