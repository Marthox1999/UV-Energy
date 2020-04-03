import RegisteredAdmins from "views/Administrador-Administrador/RegisteredAdmins.js";
import RegisteredManagers from "views/Administrador-Gerente/RegisteredManagers.js";
import RegisteredOperators from "views/Administrador-Operador/RegisteredOperator.js";


var adminRoutes = [
  {
    path: "/registeredAdmins",
    name: "Admin.RegisteredAdmins.1",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredAdmins,
    layout: "/manager"
  },
];

var managerRoutes = [
  {
    path: "/registeredManagers",
    name: "Registered Managers",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredManagers,
    layout: "/manager"
  },
];

var operatorRoutes = [
  {
    path: "/registeredOperators",
    name: "Registered Operators",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredOperators,
    layout: "/manager"
  },
];

export {
  adminRoutes,  
  managerRoutes,
  operatorRoutes
}