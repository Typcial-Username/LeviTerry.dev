import random

number = random.randint(1, 100)
print("I'm thinking of a number between 1 and 100.")

while True:
    guess_str = input("What's your guess? ")
    if not guess_str.isdigit():
        print("Please enter a valid number.")
        continue
    
    guess = int(guess_str)
    if guess == number:
        print("Congratulations! You guessed it right!")
        break
    elif guess < number:
        print("Too low. Try again.")
    else:
        print("Too high. Try again.")
