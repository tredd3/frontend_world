//recursion - a function calling itself
//1)it takes atleast one param
//2)breaking if condition with a return statement
//all those statements written before function calling itself are executed during bottom to top 
//traversal and the statements written after function calling itself are executed during top to bottom traversal
//except for last function as they are not executed for them

function fibnocci(n) {
    // 1 1 2 3 5 8
    if (n > 2) {
        return fibnocci(n - 1) + fibnocci(n - 2)
    } else {
        return 1;
    }
}

fibnocci(4);

//dp - time efficient
function fib_dp(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    let fib_array = [];
    fib_array[1] = 1;
    fib_array[2] = 1;
    for (var i = 3; i <= n; i++) {
        fib_array[i] = fib_array[i - 1] + fib_array[i - 2]
    }
    console.log(fib_array)
    return fib_array[n]
}

//dp-space efficient
function fib_dp(n) {
    if (n === 1 || n === 2) {
        return 1;
    }
    let fib_array = [];
    fib_array[1] = 1;
    fib_array[2] = 1;
    for (var i = 3; i < n; i++) {
        let latest_value = fib_array[1] + fib_array[2];
        fib_array[1] = fib_array[2]
        fib_array[2] = latest_value
    }
    console.log(fib_array)
    return fib_array[1] + fib_array[2]
}

