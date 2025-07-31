import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from "zod";
import { apiInstance } from "../../utils/api";

const inputSchema = {
  userId: z
    .string()
    .describe("User ID (NOT employee ID) required to get the next iteration number for ts-evaluation. This should be the user._id from employee profiles."),
};

const handler = async ({
  userId,
}: {
  userId: string;
}): Promise<CallToolResult> => {
  try {
    const apiResponse: any = await apiInstance.get(
      `/evaluations/get-next-iteration/${userId}/ts-evaluation`
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
              nextIteration: apiResponse.data?.nextIteration,
              count: apiResponse.count,
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
          text: `Error fetching iteration data: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      ],
    };
  }
};

export const getIterationTool = {
  name: "get_iteration",
  description:
    "Retrieves the next iteration number for ts-evaluation. CRITICAL: This tool accepts ONLY ONE parameter called 'userId'. Do NOT provide 'id', 'employeeId', or any other parameter. Only provide 'userId' which comes from the user._id field in get_profiles response. Example usage: { userId: '6746d43e2d436446294c87d2' }",
  inputSchema,
  handler,
};
