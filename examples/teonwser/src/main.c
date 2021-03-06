/* -*- Mode: C; indent-tabs-mode: t; c-basic-offset: 4; tab-width: 4 -*- */
/*
 * teonwser application
 *
 * main.cpp
 * Copyright (C) Kirill Scherba 2011-2014 <kirill@scherba.ru>
 *
 * teonwser is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * teonwser is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include "ev_mgr.h"

// Add configuration header
#undef PACKAGE
#undef VERSION
#undef GETTEXT_PACKAGE
#undef PACKAGE_VERSION
#undef PACKAGE_TARNAME
#undef PACKAGE_STRING
#undef PACKAGE_NAME
#undef PACKAGE_BUGREPORT
#include "config.h"

#define APP_VERSION "0.0.1"

#ifdef TEO_THREAD
volatile int teonet_run = 1;
#endif

/**
 * Teonet event handler
 *
 * @param ke
 * @param event
 * @param data
 * @param data_length
 * @param user_data
 */
void event_cb(ksnetEvMgrClass *ke, ksnetEvMgrEvents event, void *data,
              size_t data_length, void *user_data) {

    switch(event) {


	// DATA received
        case EV_K_RECEIVED:
        {

            // DATA event
            ksnCorePacketData *rd = data;

            // Applications commands
            switch(rd->cmd) {
                
                // CMD #129
                case 129:
                    printf("%s\n", (char*)rd->data);
                    break;
                    
                default: break;
            }
	}

        // Calls after event manager stopped
        case EV_K_STOPPED:
//            #ifdef TEO_THREAD
//            teonet_run = 0;
//            #endif
            break;

        default: break;
    }
}

/**
 * Main application function
 * 
 * @param argc
 * @param argv
 * @return 
 */
int main(int argc, char** argv) {

    printf("Teonet server native C application ver. " APP_VERSION ", "
           "based on teonet ver. %s\n",
           teoGetLibteonetVersion()
    );

    // Initialize teonet event manager and Read configuration
    ksnetEvMgrClass *ke = ksnetEvMgrInit(argc, argv, event_cb /*NULL*/, READ_ALL);
    
    // Set application version
    teoSetAppVersion(ke, APP_VERSION);

    // Start teonet
    ksnetEvMgrRun(ke);

    return (EXIT_SUCCESS);
}
