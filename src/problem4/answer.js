var sum_to_n_a = function(n) {
    return Array(n).fill(0).reduce((prev, _, index) => prev + index + 1, 0)
};

var sum_to_n_b = function(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
};

var sum_to_n_c = function(n) {
    if(n <= 0) return 0;

    return n + sum_to_n_c(n - 1);
};