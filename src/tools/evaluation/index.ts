import { getProfilesTool } from "./get_profiles.tool";
import { getIterationTool } from "./get_iteration.tool";
import { getEvaluatorsListTool } from "./get_evaluators_list.tool";

export const evaluationTools = [
  getProfilesTool,
  getIterationTool,
  getEvaluatorsListTool,
];

export { getProfilesTool, getIterationTool, getEvaluatorsListTool };
