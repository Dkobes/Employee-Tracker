import inquirer from 'inquirer';
import { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './queries.js';

const mainMenu = async () => {
   const menuChoices = [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Quit',
   ];

   const { choice } = await inquirer.prompt([
      {
         type: 'list',
         name: 'choice',
         message: 'What would you like to do?',
         choices: menuChoices
      }
   ]);

   switch (choice) {
      case 'View All Departments':
          const departments = await getDepartments();
          console.log('Departments:', departments);
          break;

      case 'View All Roles':
          const roles = await getRoles();
          console.log('Roles:', roles);
          break;

      case 'View All Employees':
          const employees = await getEmployees();
          console.log('Employees:', employees);
          break;

      case 'Add a Department':
          const { departmentName } = await inquirer.prompt([
              {
                  type: 'input',
                  name: 'departmentName',
                  message: 'Enter the name of the department:',
                  validate: input => input ? true : 'Department name is required.'
              }
          ]);
          await addDepartment(departmentName);
          console.log(`Department "${departmentName}" added.`);
          break;

          case 'Add a Role':
            const roleDetails = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleTitle',
                    message: 'Enter the title of the role:',
                    validate: input => input ? true : 'Role title is required.'
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'Enter the salary for the role:',
                    validate: input => !isNaN(input) ? true : 'Salary must be a number.'
                },
                {
                    type: 'input',
                    name: 'departmentId',
                    message: 'Enter the department ID for this role:',
                    validate: input => !isNaN(input) ? true : 'Department ID must be a number.'
                }
            ]);
            await addRole(roleDetails.roleTitle, roleDetails.roleSalary, roleDetails.departmentId);
            console.log(`Role "${roleDetails.roleTitle}" added.`);
            break;

            case 'Add an Employee':
            const employeeDetails = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the employee\'s first name:',
                    validate: input => input ? true : 'First name is required.'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the employee\'s last name:',
                    validate: input => input ? true : 'Last name is required.'
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'Enter the employee\'s role ID:',
                    validate: input => !isNaN(input) ? true : 'Role ID must be a number.'
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter the employee\'s manager ID (leave blank if none):',
                    validate: input => input === '' || !isNaN(input) ? true : 'Manager ID must be a number or left blank.'
                }
            ]);
            await addEmployee(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId || null);
            console.log(`Employee "${employeeDetails.firstName} ${employeeDetails.lastName}" added.`);
            break;

        case 'Update an Employee Role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeId',
                    message: 'Enter the employee ID to update:',
                    validate: input => !isNaN(input) ? true : 'Employee ID must be a number.'
                },
                {
                    type: 'input',
                    name: 'newRoleId',
                    message: 'Enter the new role ID for this employee:',
                    validate: input => !isNaN(input) ? true : 'New Role ID must be a number.'
                }
            ]);
            await updateEmployeeRole(employeeId, newRoleId);
            console.log(`Employee ID ${employeeId} role updated to Role ID ${newRoleId}.`);
            break;

        case 'Quit':
            console.log('Goodbye!');
            return;
    }

    await mainMenu();
};

mainMenu();