import { z } from "zod";
import { CallToolResult, ToolDefinition } from "../../types";
import { makeHttpRequest } from "../../utils/http";
import { AlertsResponse } from "./types";
import { formatAlert } from "./utils";

const inputSchema = {
  state: z.string().length(2).describe("Two-letter state code (e.g. CA, NY)"),
};

const handler = async ({ state }: { state: string }): Promise<CallToolResult> => {
  const stateCode = state.toUpperCase();
  const alertsUrl = `https://api.weather.gov/alerts?area=${stateCode}`;
  const alertsData = await makeHttpRequest<AlertsResponse>(alertsUrl);

  if (!alertsData) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to retrieve alerts data",
        },
      ],
    };
  }

  const features = alertsData.features || [];
  if (features.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: `No active alerts for ${stateCode}`,
        },
      ],
    };
  }

  const formattedAlerts = features.map(formatAlert);
  const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join(
    "\n"
  )}`;

  return {
    content: [
      {
        type: "text",
        text: alertsText,
      },
    ],
  };
};

export const alertsTool: ToolDefinition = {
  name: "getAlerts",
  description: "Fetches weather alerts from the National Weather Service",
  inputSchema,
  handler,
};