TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt


SOURCES += main.cpp \
    core/path.cpp \
    core/road.cpp \
    core/lane.cpp \
    core/vehicle.cpp \
    unitTests/runTests.cpp

HEADERS += \
    core/math.h \
    core/path.h \
    core/road.h \
    core/lane.h \
    core/vehicle.h \
    core/vec2.h \
    core/bezier3.h


# C++ flags
QMAKE_CXXFLAGS_RELEASE=-O3
QMAKE_CXXFLAGS += -std=c++11
