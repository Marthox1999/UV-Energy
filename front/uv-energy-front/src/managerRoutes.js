import RegisteredAdmins from "views/Administrador-Administrador/RegisteredAdmins.js";
import RegisteredManagers from "views/Administrador-Gerente/RegisteredManagers.js";
import RegisteredOperators from "views/Administrador-Operador/RegisteredOperator.js";
import RegisteredElectricTransformer from "views/Gerente-Transformador/RegisteredTransformer.js";
import RegisteredSubstation from "views/Gerente-Subestacion/RegisteredSubstation.js";
import managerReport from "views/Gerente-Reportes/Reportes.js"


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
    name: "Manager.RegisteredManagers.1",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredManagers,
    layout: "/manager"
  },
];

var operatorRoutes = [
  {
    path: "/registeredOperators",
    name: "Operator.RegisteredOperators.1",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredOperators,
    layout: "/manager"
  },
];

var electricTransformerRoutes = [
  {
    path: "/registeredElectricTransformer",
    name: "ETransformer.Registered.1",
    icon: "ni ni-istanbul text-blue",
    component: RegisteredElectricTransformer,
    layout: "/manager"
  },
];

var substationRoutes = [
  {
    path: "/registeredSubstation",
    name: "Substation.Registered.1",
    icon: "ni ni-single-02 text-yellow",
    component: RegisteredSubstation,
    layout: "/manager"
  },
];

var reportRoutes =[
  {
    path: "/reportes",
    name: "Report.Name.1",
    icon: "ni ni-books text-blue",
    component: managerReport,
    layout: "/manager" 
  },
];

export {
  adminRoutes,  
  managerRoutes,
  operatorRoutes,
  substationRoutes,
  electricTransformerRoutes,
  reportRoutes
}