#include "core/vec2.h"
#include "core/bezier3.h"

#include <iostream>

void vectorTest() {
    vec2 v(1.1,2);
    vec2::print(v);
}

void bezierTest() {
    bezier3 B(vec2(0,0), vec2(0,1), vec2(0,2), vec2(0,4));
    printf("total arc length: %f\n", B.arclength());
    B = bezier3(vec2(0.1,0.4), vec2(-.2,.5), vec2(-1,1), vec2(-1.1,.8));
    printf("total arc length: %f\n", B.arclength());
}

void runTests() {

    vectorTest();
    bezierTest();
    std::cout << "finished running tests!" << std::endl;
}
