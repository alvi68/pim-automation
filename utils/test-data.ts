import { EmployeeData, LoginDetails } from '../types/employee';

export function generateEmployeeData(): EmployeeData {
    const timestamp = Date.now();

    return {
        firstName: `QA_First_${timestamp}`,
        lastName: `QA_Last_${timestamp}`,
        employeeId: `${timestamp}`.slice(-6)
    };
}

export function generateLoginDetails(): LoginDetails {
    const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

    return {
        username: `qa_user_${unique}`,
        password: `Qa@${unique}`
    };
}