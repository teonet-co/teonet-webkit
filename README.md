# teonet-webkit

This project is a Template base for the generator-teonet-webkit. This project applications uses 
Teonet server library, Node, Node-Webkit, and AngularJS. To create this project the yeoman angular
generator version 0.15.1 was used and it possible to use angular subgenerator extend the this project.

Look at available AngularJS sub-generators at the: https://github.com/yeoman/generator-angular#generators)


## Build & development

Run `grunt` for building and `grunt serve` for preview.


## Run your webkit application

Install none-webkit

    npm install -g nw

Run teonet-webkit application

    nw dist --disable-logging=stderr teo-nw teo-app

or with output console.log to terminal

    nw dist --enable-logging=stderr teo-nw teo-app

*See WKJS documentation:
http://docs.nwjs.io/en/latest/


## Build your webkit application 

### Use grunt to build your webkit application

    grunt build
    grunt build-nwjs

### Run your compiled webkit application

    build-nwjs/teo-nw/linux64/teo-nw --enable-logging=stderr teo-nw teo-app

<hr>


## Some additional information

### *Rebuild node_modules which uses NaN


*This code include to grunt script and may be executet as grunt `build-NaN`

Rebuild node modules in folder dist/node_modules/ffi && ref

    cd dist
    npm install
    nw-gyp rebuild --target=0.15.0 --arch=x64


### Use nw-builder to build your webkit application

Install nw-builder Global

    npm install nw-builder -g

or  
Install nw-builder Local

    npm install nw-builder --save-dev


### Build your application

    sudo nwbuild -p linux64 landing-short/

or if you install nwbuild locally

    node_modules/nw-builder/bin/nwbuild -p linux64 dist


#### nw-builder usage 

    Usage: nwbuild [options] [path]
    
    Options:
      -p, --platforms      Platforms to build, comma-sperated, can be: win32,win64,osx32,osx64,linux32,linux64   ['osx32', 'osx64', 'win32', 'win64']
      -v, --version        The nw version, eg. 0.8.4                                             [default: "latest"]
      -r, --run            Runs NW.js for the current platform                                   [default: false]
      -o, --buildDir       The build folder                                                      [default: "./build"]
      -f, --forceDownload  Force download of NW.js                                               [default: false]
      --cacheDir           The cache folder
      --quiet              Disables logging                                                      [default: false]


## Testing

Running `grunt test` will run the unit tests with karma.
