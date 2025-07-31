import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { z } from "zod";
import { apiInstance } from "../../utils/api";

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
    const apiResponse = await apiInstance.get("/profiles/get-by/host-company");

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
                userId: filteredEmployee.user?._id,
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
      userId: emp.user?._id,
      name: `${emp.firstName} ${emp.lastName}`,
      email: emp.email,
      note: "Use 'userId' field for get_iteration tool, NOT 'id' field"
    }));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              totalEmployees: employeeList.length,
              employees: employeeList,
              instructions: "IMPORTANT: To get iteration numbers, use the 'userId' field from each employee with the get_iteration tool. Do NOT use the 'id' field."
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
    "Retrieves employee profiles with employee data, IDs, names, emails and user IDs. IMPORTANT: The 'userId' field returned by this tool should be used with the get_iteration tool (NOT the 'id' field). Use userId for getting iteration numbers.",
  inputSchema,
  handler,
};
