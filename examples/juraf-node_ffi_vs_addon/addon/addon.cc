#include <nan.h>
#include <iostream>
#include "libtest.h"

using namespace v8;

NAN_METHOD(RunCallback) {
  NanScope();

  Local<Function> cb = args[0].As<Function>();
  const unsigned argc = 1;
  Local<Value> argv[argc] = { NanNew("hello world") };
  NanMakeCallback(NanGetCurrentContext()->Global(), cb, argc, argv);

  NanReturnUndefined();
}

NAN_METHOD(Add) {
  NanScope();

  if (args.Length() < 2) {
    NanThrowTypeError("Wrong number of arguments");
    NanReturnUndefined();
  }

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    NanThrowTypeError("Wrong arguments");
    NanReturnUndefined();
  }

  double arg0 = args[0]->NumberValue();
  double arg1 = args[1]->NumberValue();
  Local<Number> num = NanNew(arg0 + arg1);

  NanReturnValue(num);
}


NAN_METHOD(AddAsync) {
  NanScope();


  if (args.Length() < 3) {
    NanThrowTypeError("Wrong number of arguments");
    NanReturnUndefined();
  }

  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    NanThrowTypeError("Wrong arguments");
    NanReturnUndefined();
  }

  double arg0 = args[0]->NumberValue();
  double arg1 = args[1]->NumberValue();
  
  Local<Number> num = NanNew(add(arg0, arg1));  // libtest library function call

  if(!args[2]->IsFunction()) {
     NanThrowTypeError("Wrong callback");    
     NanReturnUndefined();
  }

  Local<Function> cb = args[2].As<Function>();
  const unsigned argc = 1;
  Local<Value> argv[argc] = { NanNew(num)};
  NanMakeCallback(NanGetCurrentContext()->Global(), cb, argc, argv);

  NanReturnUndefined();
}



void Init(Handle<Object> exports) {
  exports->Set(NanNew("sayHiAsync"), NanNew<FunctionTemplate>(RunCallback)->GetFunction());
  exports->Set(NanNew("add"), NanNew<FunctionTemplate>(Add)->GetFunction());
  exports->Set(NanNew("addAsync"), NanNew<FunctionTemplate>(AddAsync)->GetFunction());

}

NODE_MODULE(addon, Init)