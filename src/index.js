import inquirer from 'inquirer';
import db from './db/queries.js';

async function mainMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View Departments',
                'Add Department',
                'View Roles',
                'Add Role',
                'View Employees',
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
        case 'View Departments':
            console.table(await db.viewDepartments());
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
                    choices: await db.findDepartments()
                }
            ]);
            await db.addRole(roleAnswers);
            console.log('Role added successfully.');
            break;
        case 'View Employees':
            console.table(await db.viewEmployees());
            break;
        case 'Add Employee':
            const employeeAnswers = await inquirer.prompt([
                { type: 'input', name: 'firstName', message: 'Enter first name:' },
                { type: 'input', name: 'lastName', message: 'Enter last name:' },
                { type: 'list', name: 'role', message: 'Select role:', choices: await db.findRoles() },
                { type: 'list', name: 'manager', message: 'Select manager:', choices: await db.findEmployees() }
            ]);
            await db.addEmployee(employeeAnswers);
            console.log('Employee added successfully.');
            break;
        case 'Update Employee Role':
            const updateAnswers = await inquirer.prompt([
                { type: 'list', name: 'employee', message: 'Select employee:', choices: await db.findEmployees() },
                { type: 'list', name: 'role', message: 'Select new role:', choices: await db.findRoles() }
            ]);
            await db.updateEmployeeRole(updateAnswers);
            console.log('Employee role updated successfully.');
            break;
        case 'Delete Department':
            const { department } = await inquirer.prompt([
                { type: 'list', name: 'department', message: 'Select department to delete:', choices: await db.findDepartments() }
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
                { type: 'list', name: 'employee', message: 'Select employee to delete:', choices: await db.findEmployees() }
            ]);
            await db.deleteEmployee(employee);
            console.log('Employee deleted successfully.');
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
    }

    // Loop back to the main menu
    mainMenu();
}

// Start the application
mainMenu();