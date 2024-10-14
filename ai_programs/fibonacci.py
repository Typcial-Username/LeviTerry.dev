def fibonacci(n):
    if n <= 0:
        return "Please enter a positive integer"
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    else:
        fib = [0, 1]
        for i in range(2, n):
            fib.append(fib[i-1] + fib[i-2])
        return fib

n = int(input("Enter the number of Fibonacci terms to generate: "))
result = fibonacci(n)
print(f"Fibonacci sequence up to {n} terms: {result}")
def fibonacci(n):
    if n <= 0:
        return "Please enter a positive integer"
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    else:
        fib = [0, 1]
        for i in range(2, n):
            fib.append(fib[i-1] + fib[i-2])
        return fib

n = int(input("Enter the number of Fibonacci terms to generate: "))
result = fibonacci(n)
print(f"Fibonacci sequence up to {n} terms: {result}")
