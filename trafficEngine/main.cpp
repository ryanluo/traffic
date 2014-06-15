#include <iostream>
#include "core/vec2.h"
#include "unitTests/runTests.cpp"

#define RUN_TESTS 1

extern void runTests();

int main()
{
#if RUN_TESTS
    runTests();
#else
    std::cout << "Hello World!" << std::endl;
#endif

    return 0;
}

