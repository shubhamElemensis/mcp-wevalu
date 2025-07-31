# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `npm run dev` - Build TypeScript and run the MCP server
- `npm run build` - Compile TypeScript to JavaScript in the `dist/` directory

### Project Structure

This is a Model Context Protocol (MCP) server built with TypeScript that provides tools for weather alerts and employee profile retrieval.

## Architecture

### Core Components

**Server (`src/server/index.ts`)**

- Uses `@modelcontextprotocol/sdk` to create an MCP server
- Runs on stdio transport for communication with MCP clients
- Registers all tools from the tools registry

**Tools Registry (`src/tools/index.ts`)**

- Aggregates tools from different modules (weather, evaluation)
- Each tool exports an array of tool definitions

**Tool Structure**
Tools follow a consistent pattern with:

- `name`: Tool identifier
- `description`: Tool purpose
- `inputSchema`: Zod schema for validation
- `handler`: Async function that processes requests

### Available Tools

**Weather Tools (`src/tools/weather/`)**

- `getAlerts`: Fetches weather alerts from National Weather Service API
- Uses utility functions in `utils.ts` for formatting
- Type definitions in `types.ts`

**Evaluation Tools (`src/tools/evaluation/`)**

- `get_profiles`: Retrieves employee profiles from a local API (localhost:5001)
- Requires `X_AUTH_TOKEN` environment variable
- Can filter by employee name or return all employees

### Utilities

- `src/utils/http.ts`: HTTP request utility with proper headers for weather API
- `src/types/index.ts`: Shared TypeScript interfaces

### Environment Variables

- `X_AUTH_TOKEN`: Required for employee profile API authentication

### TypeScript Configuration

- Compiles from `src/` to `dist/`
- Uses CommonJS modules with ES2016 target
- Strict type checking enabled
