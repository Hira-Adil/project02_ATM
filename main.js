#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 5000; // Dollar
let myPin = 54321;
// print welcome message
console.log(chalk.green("\n \tWelcome to ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("Enter your 5-Digit pin code: "),
        type: "number"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.blue("\nCorrect pin code, Login Successfully!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: chalk.yellow("Please select an option"),
            type: "list",
            choices: ["Withdraw", "Check balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw") {
        let WithdrawAns = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                message: chalk.yellow("Select a Withdrawal method"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (WithdrawAns.WithdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    message: chalk.yellow("Select Amount"),
                    type: "list",
                    choices: [1000, 2000, 3000, 4000, 5000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.green(`${fastCashAns.fastCash} Withdraw Successfully`));
                console.log(chalk.green(`Your Remaining Balance is: ${myBalance}`));
            }
        }
        else if (WithdrawAns.WithdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: chalk.yellow("Enter your amount to Withdraw"),
                    type: "number"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(`${amountAns.amount} Withdraw Successfully`));
                console.log(chalk.green(`Your Remaining Balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "Check balance") {
        console.log(chalk.green("Your Account Balance is: " + myBalance));
    }
}
else {
    console.log(chalk.red("Incorrect Pin Code, Try Again"));
}
