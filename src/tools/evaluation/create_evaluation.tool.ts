import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from "zod";
import { apiInstance } from "../../utils/api";

const inputSchema = {
  userId: z
    .string()
    .describe("User ID for creating the evaluation (used in API endpoint)"),
  evaluated: z.string().describe("ID of the person being evaluated"),
  year: z
    .number()
    .describe(
      "REQUIRED: Year of the evaluation. MUST ask user to provide this value. Do not auto-generate."
    ),
  iteration: z.number().describe("Iteration number for the evaluation"),
  startDate: z
    .string()
    .describe(
      "REQUIRED: Start date in ISO format. MUST ask user to provide this value. Do not auto-generate. )"
    ),
  endDate: z
    .string()
    .describe(
      "REQUIRED: End date in ISO format. MUST ask user to provide this value. Do not auto-generate. )"
    ),
  evaluators: z
    .array(z.string())
    .describe(
      "REQUIRED: Array of evaluator IDs to assign to this evaluation. MUST ask user to provide these IDs. Do not auto-generate."
    ),
};

const handler = async ({
  userId,
  evaluated,
  year,
  iteration,
  startDate,
  endDate,
  evaluators,
}: {
  userId: string;
  evaluated: string;
  year: number;
  iteration: number;
  startDate: string;
  endDate: string;
  evaluators: string[];
}): Promise<CallToolResult> => {
  try {
    // Step 1: Create the evaluation
    const createPayload = {
      evaluated,
      year,
      iteration,
      startDate,
      endDate,
    };

    const createResponse = await apiInstance.post<any>(
      `/ts-evaluations/${userId}`,
      createPayload
    );

    if (!createResponse.success || !createResponse.data) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to create evaluation: ${
              createResponse.message || "Unknown error"
            }`,
          },
        ],
      };
    }

    const evaluationId = createResponse.data._id || createResponse.data.id;

    if (!evaluationId) {
      return {
        content: [
          {
            type: "text",
            text: `Evaluation created but no ID returned in response: ${JSON.stringify(
              createResponse.data,
              null,
              2
            )}`,
          },
        ],
      };
    }

    // Step 2: Update the evaluation with evaluators
    const updatePayload = {
      evaluations: evaluators.map((evaluatorId) => ({
        evaluator: evaluatorId,
      })),
    };

    const updateResponse = await apiInstance.patch<any>(
      `/ts-evaluations/${evaluationId}`,
      updatePayload
    );

    if (!updateResponse.success) {
      return {
        content: [
          {
            type: "text",
            text: `Evaluation created successfully but failed to assign evaluators: ${
              updateResponse.message || "Unknown error"
            }. Evaluation ID: ${evaluationId}`,
          },
        ],
      };
    }

    const evaluationUrl = `https://dev.wevalu.io/evaluations/360-evaluation/detail/${evaluationId}`;

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              evaluationCreated: createResponse.data,
              evaluatorsAssigned: updateResponse.data || "Success",
              evaluationId: evaluationId,
              assignedEvaluators: evaluators,
              evaluationUrl: evaluationUrl,
              message:
                "Evaluation created and evaluators assigned successfully. You can check the evaluation at the provided URL.",
              success: true,
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
          text: `Error creating evaluation: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      ],
    };
  }
};

export const createEvaluationTool = {
  name: "create_evaluation",
  description:
    "Creates a new TS evaluation and assigns evaluators to it. CRITICAL: You MUST ask the user to provide: 1) year , 2) startDate (ISO format), 3) endDate (ISO format), 4) evaluators array (list of evaluator IDs). DO NOT automatically generate or assume these values. Always prompt the user for these specific inputs before calling this tool. Returns evaluation URL for verification after successful creation.",
  inputSchema,
  handler,
};
