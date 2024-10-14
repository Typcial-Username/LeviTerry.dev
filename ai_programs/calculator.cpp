#include <iostream>
#include <string>

int main() {
    double num1, num2;
    char operation;
    std::string input;

    while (true) {
        std::cout << "Enter an operation (+, -, *, /) or 'q' to quit: ";
        std::getline(std::cin, input);
        
        if (input == "q") {
            break;
        }
        
        if (input.length() != 1 || std::string("+-*/").find(input[0]) == std::string::npos) {
            std::cout << "Invalid operation. Please try again." << std::endl;
            continue;
        }
        
        operation = input[0];

        std::cout << "Enter first number: ";
        std::cin >> num1;
        std::cout << "Enter second number: ";
        std::cin >> num2;
        std::cin.ignore(); // Clear the newline from the input buffer

        switch(operation) {
            case '+':
                std::cout << "Result: " << num1 + num2 << std::endl;
                break;
            case '-':
                std::cout << "Result: " << num1 - num2 << std::endl;
                break;
            case '*':
                std::cout << "Result: " << num1 * num2 << std::endl;
                break;
            case '/':
                if(num2 != 0)
                    std::cout << "Result: " << num1 / num2 << std::endl;
                else
                    std::cout << "Error: Division by zero" << std::endl;
                break;
        }
    }

    std::cout << "Calculator closed." << std::endl;
    return 0;
}
