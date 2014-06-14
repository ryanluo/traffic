TEMPLATE = app
CONFIG += console
CONFIG -= app_bundle
CONFIG -= qt

SOURCES += main.cpp \
    core/path.cpp \
    core/road.cpp \
    core/lane.cpp \
    core/vehicle.cpp

HEADERS += \
    core/math.h \
    core/path.h \
    core/road.h \
    core/lane.h \
    core/vehicle.h \
    core/vec2.h


