#ifndef _LIBTEST_H
#define _LIBTEST_H

#if defined(WIN32) || defined(_WIN32)
#define EXPORT __declspec(dllexport)
#else
#define EXPORT
#endif

#include "libtest.h"

extern "C" EXPORT double add(double a, double b);

#endif