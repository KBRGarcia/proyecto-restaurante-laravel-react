import axios from "axios";
import type { FormInstance } from "antd";
import { useCallback } from "react";
import { useParams } from "react-router";

export type EmployeeAssignmentFormValue = {
    branch_id?: number;
    position?: string;
    start_date?: string;
    active?: boolean;
};

type ValidateAssignmentResponse = {
    valid: boolean;
    message?: string;
};

const API_URL = "/api";

export const useEmployeeAssignmentValidation = () => {
    const { id } = useParams();

    const employeeId = id ? Number(id) : null;

    const validateAssignment = useCallback(
        async (
            branchId: number,
            position: string,
            assignments: EmployeeAssignmentFormValue[],
            assignmentIndex: number,
        ): Promise<string | undefined> => {
            const token = localStorage.getItem("auth_token");

            try {
                const response = await axios.post<ValidateAssignmentResponse>(
                    `${API_URL}/employees/validate-assignment`,
                    {
                        employee_id: employeeId,
                        branch_id: branchId,
                        position,
                        assignments,
                        assignment_index: assignmentIndex,
                    },
                    {
                        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                    },
                );

                if (!response.data.valid) {
                    return response.data.message ?? "La asignacion no cumple las reglas de negocio.";
                }

                return undefined;
            } catch (error) {
                if (axios.isAxiosError<{ message?: string }>(error)) {
                    return error.response?.data?.message ?? "No se pudo validar la asignacion.";
                }

                return "No se pudo validar la asignacion.";
            }
        },
        [employeeId],
    );

    const validateAssignmentRow = useCallback(
        async (
            form: FormInstance | undefined,
            assignmentIndex: number,
            overrides?: Partial<Pick<EmployeeAssignmentFormValue, "branch_id" | "position">>,
        ): Promise<string | undefined> => {
            const assignments: EmployeeAssignmentFormValue[] = form?.getFieldValue("assignments") ?? [];
            const currentAssignment = {
                ...(assignments[assignmentIndex] ?? {}),
                ...overrides,
            };

            if (!currentAssignment.branch_id || !currentAssignment.position) {
                return undefined;
            }

            const normalizedAssignments = [...assignments];
            normalizedAssignments[assignmentIndex] = currentAssignment;

            return validateAssignment(
                currentAssignment.branch_id,
                currentAssignment.position,
                normalizedAssignments,
                assignmentIndex,
            );
        },
        [validateAssignment],
    );

    const createAssignmentValidator = useCallback(
        (form: FormInstance | undefined, assignmentIndex: number) =>
            async (): Promise<void> => {
                const message = await validateAssignmentRow(form, assignmentIndex);

                if (message) {
                    throw new Error(message);
                }
            },
        [validateAssignmentRow],
    );

    const revalidateAssignments = useCallback(
        (form: FormInstance | undefined, changedIndex?: number) => {
            const assignments: EmployeeAssignmentFormValue[] = form?.getFieldValue("assignments") ?? [];

            assignments.forEach((assignment, index) => {
                if (!assignment?.branch_id || !assignment?.position) {
                    return;
                }

                void form?.validateFields([
                    ["assignments", index, "branch_id"],
                    ["assignments", index, "position"],
                ]);
            });

            if (changedIndex !== undefined) {
                void form?.validateFields([
                    ["assignments", changedIndex, "branch_id"],
                    ["assignments", changedIndex, "position"],
                ]);
            }
        },
        [],
    );

    return {
        createAssignmentValidator,
        revalidateAssignments,
        validateAssignmentRow,
    };
};
