import inquirer from 'inquirer';
import db from './db/queries.js';
import { connectToDatabase } from './db/database.js';

await connectToDatabase();

async function mainMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View Department',
                'Add Department',
                'View Roles',
                'Add Role',
                'View Employee',
                'Add Employee',
                'Update Employee Role',
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                'Exit'
            ]
        }
    ]);

   switch (action) {
        case 'View Department':
            console.table(await db.viewDepartment());
            break;
        case 'Add Department':
            const { departmentName } = await inquirer.prompt([
                { type: 'input', name: 'departmentName', message: 'Enter department name:' }
            ]);
            await db.addDepartment(departmentName);
            console.log('Department added successfully.');
            break;
        case 'View Roles':
            console.table(await db.viewRoles());
            break;
        case 'Add Role':
            const roleAnswers = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter role title:' },
                { type: 'input', name: 'salary', message: 'Enter role salary:' },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Select department:',
                    choices: await db.findDepartment()
                }
            ]);
            await db.addRole(roleAnswers);
            console.log('Role added successfully.');
            break;
        case 'View Employee':
            console.table(await db.viewEmployee());
            break;
        case 'Add Employee':
            const employeeAnswers = await inquirer.prompt([
                { type: 'input', name: 'firstName', message: 'Enter first name:' },
                { type: 'input', name: 'lastName', message: 'Enter last name:' },
                { type: 'list', name: 'role', message: 'Select role:', choices: await db.findRoles() },
                { type: 'list', name: 'manager', message: 'Select manager:', choices: await db.findEmployee() }
            ]);
            await db.addEmployee(employeeAnswers);
            console.log('Employee added successfully.');
            break;
        case 'Update Employee Role':
            const updateAnswers = await inquirer.prompt([
                { type: 'list', name: 'employee', message: 'Select employee:', choices: await db.findEmployee() },
                { type: 'list', name: 'role', message: 'Select new role:', choices: await db.findRoles() }
            ]);
            await db.updateEmployeeRole(updateAnswers);
            console.log('Employee role updated successfully.');
            break;
        case 'Delete Department':
            const { department } = await inquirer.prompt([
                { type: 'list', name: 'department', message: 'Select department to delete:', choices: await db.findDepartment() }
            ]);
            await db.deleteDepartment(department);
            console.log('Department deleted successfully.');
            break;
        case 'Delete Role':
            const { role } = await inquirer.prompt([
                { type: 'list', name: 'role', message: 'Select role to delete:', choices: await db.findRoles() }
            ]);
            await db.deleteRole(role);
            console.log('Role deleted successfully.');
            break;
        case 'Delete Employee':
            const { employee } = await inquirer.prompt([
                { type: 'list', name: 'employee', message: 'Select employee to delete:', choices: await db.findEmployee() }
            ]);
            await db.deleteEmployee(employee);
            console.log('Employee deleted successfully.');
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
    }

    
    mainMenu();
}
mainMenu();