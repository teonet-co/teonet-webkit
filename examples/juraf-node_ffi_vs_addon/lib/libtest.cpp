#include <stdint.h>
#include "libtest.h"

extern "C" EXPORT uint64_t factorial(int max) {
	int i = max;
	uint64_t result = 1;

	while (i >= 2) {
		result *= i--;
	}

	return result;
}

extern "C" EXPORT const char* sayHi() {
	return "hello world";
}

extern "C" EXPORT double add(double a, double b) {
	return a + b;
}