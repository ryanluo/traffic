/**************************************************************************
**
**   bezier3.h
**   Author : ericjang
**   Created: 6/14/2014
**
**   General-purpose cubic bezier curve. Smooth enough for most purposes.
**   This forms the mathematical primitive of a path.
**
**************************************************************************/

#ifndef BEZIER3_H
#define BEZIER3_H

#include "vec2.h"

struct bezier3
{
    vec2 p0,p1,p2,p3;
//    union {
//        vec2 data[4];
//        struct {vec2 a,b,c,d;};
//        struct {};
//    };
    // constructor
    inline bezier3() { p0=vec2();p1=vec2();p2=vec2();p3=vec2(); }
    inline bezier3(vec2 a, vec2 b, vec2 c, vec2 d) { p0=a;p1=b;p2=c;p3=d;}
    inline bezier3& operator = (const bezier3 &rhs) {
        p0=rhs.p0;
        p1=rhs.p1;
        p2=rhs.p2;
        p3=rhs.p3;
        return *this;
    };

    // Adaptive Subdivision of Bezier Curves
    //http://antigrain.com/research/adaptive_bezier/
    static inline float arclength(vec2 a,vec2 b,vec2 c,vec2 d) {
        float TOLERANCE = .01;
        float L0,L1;
        L1 = vec2::dist(a,b)+vec2::dist(b,c)+vec2::dist(c,d);
        L0 = vec2::dist(a,d);

        if (L1-L0 > TOLERANCE) {
            // perform recursive subdivision
            vec2 p01 = (a+b)/2;
            vec2 p12 = (b+c)/2;
            vec2 p23 = (c+d)/2;

            vec2 p012 = (p01+p12)/2;
            vec2 p123 = (p12+p23)/2;

            vec2 p0123 = (p012+p123)/2;
            return arclength(a,p01,p012,p0123) + arclength(p0123,p123,p23,d);
        } else {
            return (L0+L1)/2;
        }
    }

    inline float arclength() {
        return arclength(p0,p1,p2,p3);
    }

    // returns point on curve parameterized from t between 0,1
    inline vec2 bezierP(float t) {
        return bezierP(p0,p1,p2,p3,t);
    }

    // class static method for convenience
    static inline vec2 bezierP(vec2 a, vec2 b, vec2 c, vec2 d, float t) {
        float x = (1-t);
        return a*(x*x*x)+b*(3*x*x*t)+c*(3*x*t*t)+d*(t*t*t);
    };

    static inline void print(const bezier3 &b) {
        printf("p0 : [%10f %10f]\n", b.p0.x, b.p0.y );
        printf("p1 : [%10f %10f]\n", b.p1.x, b.p1.y );
        printf("p2 : [%10f %10f]\n", b.p2.x, b.p2.y );
        printf("p3 : [%10f %10f]\n", b.p3.x, b.p3.y );
    }
};


#endif // BEZIER3_H
