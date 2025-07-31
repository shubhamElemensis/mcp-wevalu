import { evaluationTools } from "./evaluation";
import { weatherTools } from "./weather";

export const tools = [...weatherTools, ...evaluationTools];

export * from "./weather";
