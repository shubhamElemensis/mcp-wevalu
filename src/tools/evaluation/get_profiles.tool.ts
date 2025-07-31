import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from "zod";

const inputSchema = {
  employeeName: z
    .string()
    .optional()
    .describe("Optional employee name to filter by"),
};

const handler = async ({
  employeeName,
}: {
  employeeName?: string;
}): Promise<CallToolResult> => {
  try {
    const response = await fetch(
      "http://localhost:5001/api/profiles/get-by/host-company",
      {
        method: "GET",
        headers: {
          "x-auth-token": process.env.X_AUTH_TOKEN || "",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return {
        content: [
          {
            type: "text",
            text: `API request failed with status: ${response.status}`,
          },
        ],
      };
    }

    const apiResponse = await response.json();

    if (!apiResponse.success || !apiResponse.data) {
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

    const employees = Array.isArray(apiResponse.data)
      ? apiResponse.data
      : [apiResponse.data];

    if (employeeName) {
      const filteredEmployee = employees.find(
        (emp: any) =>
          emp.firstName?.toLowerCase().includes(employeeName.toLowerCase()) ||
          emp.lastName?.toLowerCase().includes(employeeName.toLowerCase()) ||
          `${emp.firstName} ${emp.lastName}`
            .toLowerCase()
            .includes(employeeName.toLowerCase())
      );

      if (!filteredEmployee) {
        return {
          content: [
            {
              type: "text",
              text: `No employee found with name containing "${employeeName}"`,
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
                id: filteredEmployee._id,
                name: `${filteredEmployee.firstName} ${filteredEmployee.lastName}`,
                employeeData: filteredEmployee,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    const employeeList = employees.map((emp: any) => ({
      id: emp._id,
      name: `${emp.firstName} ${emp.lastName}`,
      email: emp.email,
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              totalEmployees: employeeList.length,
              employees: employeeList,
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
          text: `Error fetching employee data: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      ],
    };
  }
};

export const getProfilesTool = {
  name: "get_profiles",
  description:
    "Retrieves employee profiles from the host company. If employeeName is provided, returns that specific employee's data. Otherwise returns all employees with their IDs and names.",
  inputSchema,
  handler,
};
