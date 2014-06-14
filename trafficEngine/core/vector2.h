/**************************************************************************
**
**   vector2.h
**   Author : ericjang
**   Created: 6/12/2014
**
**************************************************************************/

#ifndef VECTOR2_H
#define VECTOR2_H

struct vec2
{
    union {
        float data[2];
        struct {float x,y};
    };

    inline vec2() { x=0.f; y=0.f; }
    inline vec2(float v) { x = v; y = v; }
    inline vec2(float xx, float yy) { x = xx; y = yy; }
    inline float& operator [] (int i) { return data[i]; }
    inline float operator [] (int i) const { return data[i]; }
    //inline static float dot

    // TODO - add support for more math operators
};

#endif // VECTOR2_H
