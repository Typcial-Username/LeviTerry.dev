#include <iostream>
#include <string>
#include <random>
#include <algorithm>
#include <stdexcept>
#include <chrono>

// Class to generate secure passwords
class PasswordGenerator {
private:
    std::string lowercase = "abcdefghijklmnopqrstuvwxyz";
    std::string uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    std::string numbers = "0123456789";
    std::string special_chars = "!@#$%^&*()-_=+[]{}|;:,.<>?";
    std::string charset;
    std::mt19937 rng; // Mersenne Twister random number generator

public:
    // Constructor to seed the random number generator with a high-resolution clock
    PasswordGenerator() : rng(std::chrono::high_resolution_clock::now().time_since_epoch().count()) {}

    // Function to set the character set based on user preferences
    void setCharset(bool useLower, bool useUpper, bool useNumbers, bool useSpecial) {
        charset.clear();
        if (useLower) charset += lowercase;
        if (useUpper) charset += uppercase;
        if (useNumbers) charset += numbers;
        if (useSpecial) charset += special_chars;
        
        if (charset.empty()) {
            throw std::runtime_error("Error: You must select at least one character set.");
        }
    }

    // Function to generate a random password of a given length
    std::string generate(int length) {
        if (length <= 0) {
            throw std::invalid_argument("Password length must be positive.");
        }

        std::string password;
        std::uniform_int_distribution<> dist(0, charset.length() - 1);

        // Generate the password using the selected character set
        for (int i = 0; i < length; ++i) {
            password += charset[dist(rng)];
        }

        // Ensure at least one character from each selected set is included
        if (charset.find_first_of(lowercase) != std::string::npos) {
            password[dist(rng)] = lowercase[dist(rng) % lowercase.length()];
        }
        if (charset.find_first_of(uppercase) != std::string::npos) {
            password[dist(rng)] = uppercase[dist(rng) % uppercase.length()];
        }
        if (charset.find_first_of(numbers) != std::string::npos) {
            password[dist(rng)] = numbers[dist(rng) % numbers.length()];
        }
        if (charset.find_first_of(special_chars) != std::string::npos) {
            password[dist(rng)] = special_chars[dist(rng) % special_chars.length()];
        }

        // Shuffle the password to ensure randomness
        std::shuffle(password.begin(), password.end(), rng);

        return password;
    }
};

int main() {
    PasswordGenerator generator;
    int length;
    bool useLower, useUpper, useNumbers, useSpecial;

    // Prompt the user for password length and character set preferences
    std::cout << "Enter the length of the password: ";
    std::cin >> length;

    std::cout << "Include lowercase letters? (1 for yes, 0 for no): ";
    std::cin >> useLower;
    std::cout << "Include uppercase letters? (1 for yes, 0 for no): ";
    std::cin >> useUpper;
    std::cout << "Include numbers? (1 for yes, 0 for no): ";
    std::cin >> useNumbers;
    std::cout << "Include special characters? (1 for yes, 0 for no): ";
    std::cin >> useSpecial;

    try {
        // Set the character set based on user input
        generator.setCharset(useLower, useUpper, useNumbers, useSpecial);
        // Generate and display the password
        std::string password = generator.generate(length);
        std::cout << "Generated Password: " << password << std::endl;
    } catch (const std::exception& e) {
        // Handle any errors that occur
        std::cerr << e.what() << std::endl;
        return 1;
    }

    return 0;
}