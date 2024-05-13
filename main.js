import path from "path";
import {
  readMemoryPartitionsFromInputFile,
  readProcessSizesFromInputFile,
} from "./utils/index.js";
import { makeFirstFit, makeWorstFit } from "./functions/index.js";

const memoryFilePath = path.resolve("./files/input/", "memory.txt");
const processesFilePath = path.resolve("./files/input/", "processes.txt");

const memoryPartitions = readMemoryPartitionsFromInputFile(memoryFilePath);
const processSizes = readProcessSizesFromInputFile(processesFilePath);

makeFirstFit(memoryPartitions, processSizes);
makeWorstFit(memoryPartitions, processSizes);
