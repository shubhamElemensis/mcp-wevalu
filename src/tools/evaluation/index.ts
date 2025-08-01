import { getProfilesTool } from "./get_profiles.tool";
import { getIterationTool } from "./get_iteration.tool";
import { getEvaluatorsListTool } from "./get_evaluators_list.tool";
import { createEvaluationTool } from "./create_evaluation.tool";

export const evaluationTools = [
  getProfilesTool,
  getIterationTool,
  getEvaluatorsListTool,
  createEvaluationTool,
];

export { getProfilesTool, getIterationTool, getEvaluatorsListTool, createEvaluationTool };
