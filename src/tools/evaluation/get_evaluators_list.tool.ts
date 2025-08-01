import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from "zod";
import { apiInstance } from "../../utils/api";
import { TsEvaluationResponse } from "../../types/evaluation";

const inputSchema = {
  id: z
    .string()
    .describe(
      "need id (NOT userId) to get evaluators list for ts-evaluation. Use the 'id' field from get_profiles tool, NOT the 'userId' field. Example usage: { id: '6746d43e2d4364462987d285' }"
    ),
};

const handler = async ({ id }: { id: string }): Promise<CallToolResult> => {
  try {
    const apiResponse: TsEvaluationResponse = await apiInstance.get(
      `/ts-evaluations/get-by/evaluator/${id}`
    );

    if (!apiResponse.success) {
      return {
        content: [
          {
            type: "text",
            text: `API returned error: ${
              apiResponse.message || "Unknown error"
            }`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              treeView: apiResponse.data.treeView,
              listView: apiResponse.data.listView,
              message: apiResponse.message,
              success: apiResponse.success,
            },
            null,
            2
          ),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error fetching evaluators data: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      ],
    };
  }
};

export const getEvaluatorsListTool = {
  name: "get_evaluators_list",
  description:
    "Retrieves evaluators list for ts-evaluation based on id. Returns both treeView (hierarchical structure) and listView (flat array) data. CRITICAL: This tool accepts ONLY ONE parameter called 'id'. Use the 'id' field from get_profiles tool (NOT the 'userId' field). Example usage: { id: '6746d43e2d436446294c87d2' }",
  inputSchema,
  handler,
};
