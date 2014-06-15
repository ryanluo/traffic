/**************************************************************************
**
**   vector2.h
**   Author : ericjang
**   Created: 6/12/2014
**
**   This class is useful for representing things like:
**      - Position, velocity, acceleration in 2D space
**      - direction vectors
**      - points on bezier curve, location of interest
**
**   Usage:
**   vec2 a(1.4, 3.2);
**   vec2 b = vec2(3.0); // both x and y set to 3.0
**   vec2 c(a); // initialize c with contents of a
**
**   operators are overloaded to allow things like:
**   a - b
**   a + b
**   a + 5; // adds 5 to both elements
**************************************************************************/


#ifndef VECTOR2_H
#define VECTOR2_H

#include "math.h"

struct vec2
{
    union {
        float data[2];
        struct {float x,y;};
    };

    // constructors
    inline vec2() { x=0.f; y=0.f; }
    inline vec2(float v) { x = v; y = v; }
    inline vec2(float xx, float yy) { x = xx; y = yy; }
    inline vec2& operator = (const vec2 &rhs) {
        x = rhs.x;
        y = rhs.y;
        return *this;
    };

    // operator overrides
    inline float& operator [] (int i) { return data[i]; }
    inline float operator [] (int i) const { return data[i]; }
    inline vec2& operator -= ( const vec2 &rhs ) { x -= rhs.x; y -= rhs.y; return *this; }
    inline vec2 operator + ( const vec2 &rhs ) const { return vec2( x+rhs.x, y+rhs.y ); }
    inline vec2 operator - ( const vec2 &rhs ) const { return vec2( x-rhs.x, y-rhs.y ); }
    inline vec2& operator *= ( const vec2 &rhs ) { x *= rhs.x; y *= rhs.y; return *this; }
    inline vec2 operator * ( const vec2 &rhs ) const { return vec2( x*rhs.x, y*rhs.y ); }
    inline vec2& operator /= ( const vec2 &rhs ) { x /= rhs.x; y /= rhs.y; return *this; }
    inline vec2 operator / ( const vec2 &rhs ) const { return vec2( x/rhs.x, y/rhs.y ); }
    inline vec2& operator *= ( float f )  { x *= f; y *= f; return *this; }
    inline vec2 operator * ( float f ) const { return vec2( f*x, f*y ); }
    inline vec2& operator *= ( double d )  { x = (float)(x*d); y = (float)(y*d); return *this; }
    inline vec2 operator * ( double d ) const { return vec2( (float)(x*d), (float)(y*d) ); }
    inline vec2& operator /= ( float f ) { float fi = 1./f; x *= fi; y *= fi; return *this; }
    inline vec2 operator / ( float f ) const { float fi = 1.f/f; return vec2( x*fi, y*fi ); }
    inline vec2& operator += ( float f ) { x += f; y += f; return *this; }
    inline vec2 operator + ( float f ) const { return vec2( x+f, y+f ); }

    inline vec2& operator -= ( float f ) { x -= f; y -= f; return *this; }
    inline vec2 operator - ( float f ) const { return vec2( x-f, y-f ); }

    // static methods
    inline static vec2 floor(const vec2 &v) {
        return vec2(floorf(v.x),floorf(v.y));
    }
    inline static vec2 ceil(const vec2 &v) {
        return vec2(ceilf(v.x),ceilf(v.y));
    }
    inline static vec2 round(const vec2 &v) {
        return vec2(roundf(v.x),roundf(v.y));
    }

    static float sign( const float v ) { return (0 < v) - (v < 0);}
    inline static vec2 sign(const vec2 &v) {
        return vec2(sign(v.x),sign(v.y));
    }
    inline static vec2 normalize(const vec2 &v) {
        float f = 1.f/sqrtf(v.x*v.x+v.y*v.y);
        return vec2(f*v.x,f*v.y);
    }
    inline static float dot(const vec2 &a, const vec2 &b) {
        return a.x*b.x+a.y*b.y;
    }
    inline static vec2 cross(const vec2 &a, const vec2 &b) {
        return a.x*b.y-a.y*b.x;
    }
    inline static void print( const vec2 &v )
    {
        printf( "[%10f %10f]\n", v.x, v.y);
    }

    // distance functions
    inline static float dist2( const vec2 &a, const vec2 &b) {
        return (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y);
    }
    inline static float dist(const vec2 &a, const vec2 &b) {
        return sqrtf(dist2(a,b));
    }
};

#endif // VECTOR2_H
