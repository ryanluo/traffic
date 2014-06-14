/**************************************************************************
**
**   math.h
**   Author : ericjang
**   Created: 6/12/2014
**
**************************************************************************/

#ifndef MATH_H
#define MATH_H

#include <math.h>
#include <stdlib.h>

#define EPSILON 1e-6

// double approximate equality comparison
#define EQ(a, b) ( fabs((a) - (b)) < _EPSILON_ )
#define NEQ(a, b) ( fabs((a) - (b)) > _EPSILON_ )

// float
#define EQF(a, b) ( fabsf((a) - (b)) < _EPSILON_ )
#define NEQF(a, b) ( fabsf((a) - (b)) > _EPSILON_ )

#define CLAMP( VALUE, A, B )                            \
({                                                      \
    __typeof__ (VALUE) _V_ = (VALUE);                   \
    __typeof__ (A) _A_ = (A);                           \
    __typeof__ (B) _B_ = (B);                           \
    ((_V_ < _A_) ? _A_ : ((_V_ > _B_) ? _B_ : _V_));    \
})

// convenience function for generating random number
static inline float urand( float min = 0.f, float max = 1.f )
{
    return min + (float(rand())/float(RAND_MAX))*(max-min);
}


#endif // MATH_H
