import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "../tools";

// Create server instance
const server = new McpServer({
  name: "wevalu-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register all tools
tools.forEach((tool) => {
  server.tool(
    tool.name,
    tool.description,
    tool.inputSchema,
    async (params: any) => {
      console.log(`Tool called: ${tool.name}`, params);
      return await tool.handler(params);
    }
  );
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Wevalu MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
