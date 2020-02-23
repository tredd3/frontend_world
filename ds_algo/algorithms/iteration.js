function primeFactors(n) {
    // Print the number of 2s that divide n  
    while (n % 2 == 0) {
        cout << 2 << " ";
        n = n / 2;
    }

    // n must be odd at this point. So we can skip  
    // one element (Note i = i +2)  
    for (let i = 3; i <= sqrt(n); i = i + 2) {
        // While i divides n, print i and divide n  
        while (n % i == 0) {
            cout << i << " ";
            n = n / i;
        }
    }

    // This condition is to handle the case when n  
    // is a prime number greater than 2  
    if (n > 2)
        cout << n << " ";
}

// Recursive function to return gcd of a and b 
function gcd(a, b) {
    // Everything divides 0  
    if (a == 0)
        return b;
    if (b == 0)
        return a;

    // base case 
    if (a == b)
        return a;

    // a is greater 
    if (a > b)
        return gcd(a - b, b);
    return gcd(a, b - a);
}

function gcd(a, b) {
    if (b == 0)
        return a;
    return gcd(b, a % b);
}

//rotate image
//[[1,2,3],
// [4,5,6],
// [7,8,9]] to 
//[[7,4,1],
// [8,5,2],
// [9,6,3]]

var image = [[1, 2, 3],
[4, 5, 6],
[7, 8, 9]]
function rotate_image(image) {
    if (image.length !== image[0].length) return 0;
    let N = image.length
    //convert rows to colums
    for (let i = 0; i < N; i++) {
        for (let j = i; j < N; j++) {
            [image[i][j], image[j][i]] = [image[j][i], image[i][j]]
        }
    }

    //flip the image
    let mid = Math.floor(N / 2);
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < mid; j++) {
            [image[i][j], image[i][N - 1 - j]] = [image[i][N - 1 - j], image[i][j]]
        }
    }
    return image;
}
