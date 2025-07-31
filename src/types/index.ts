import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
  handler: (...args: any[]) => Promise<CallToolResult>;
}

export { CallToolResult };