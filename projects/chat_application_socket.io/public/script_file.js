//script vs module
//a file without any top-level import or export declarations is treated as a script whose contents are available in the
// global scope (and therefore to modules as well) - check in console to confirm
//Modules are executed within their own scope, not in the global scope. This means that variables, functions, classes, etc.
//declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms.
//Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.
{
  const y = 4;
  //y is not accessed as it is in module scope
}

let x = 3;

function tarak() {
  console.log("hi");
  return "u are accessing this fn from module";
}

//x and tarak is accessed in console
