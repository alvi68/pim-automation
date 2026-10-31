import { EmployeeData } from '../types/employee';

/**
 * Generates unique employee data for each test run.
 * Using Date.now() ensures no collision with data created
 * by other test runs or other users on the shared demo environment.
 */
export function generateEmployeeData(): EmployeeData {
    const timestamp = Date.now();

    return {
        firstName: `QA_First_${timestamp}`,
        lastName: `QA_Last_${timestamp}`,
        employeeId: `${timestamp}`.slice(-6)
    };
}