import AddAdmin from "views/Administrador-Administrador/AddAdmin.js";
import RegisteredAdmins from "views/Administrador-Administrador/RegisteredAdmins.js";

import AddElectricTransformer from "views/Administrador-Transformador/AddElectricTransformer";
import DeactivateElectricTransformer from "views/Administrador-Transformador/DeactivateElectricTransformer.js";

import AddManager from "views/Administrador-Gerente/AddManager.js";
import RegisteredManagers from "views/Administrador-Gerente/RegisteredManagers.js"

import AddOperator from "views/Administrador-Operador/AddOperator";
import RegisteredOperators from "views/Administrador-Operador/RegisteredOperator.js";

import AddSubstation from "views/Administrador-Subestacion/AddSubstation.js";


var adminRoutes = [
  {
    path: "/addAdmin",
    name: "Add Admin",
    icon: "ni ni-fat-add text-blue",
    component: AddAdmin,
    layout: "/admin"
  },
  {
    path: "/registeredAdmins",
    name: "Registered Admins",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredAdmins,
    layout: "/admin"
  },
];

var electricTransformerRoutes = [
  {
    path: "/addElectricTransformer",
    name: "Add Electric Transformer",
    icon: "ni ni-fat-add text-blue",
    component: AddElectricTransformer,
    layout: "/admin"
  },
  {
    path: "/DeactivateElectricTransformer",
    name: "Deactivate Electric Transformer",
    icon: "ni ni-fat-delete text-blue",
    component: DeactivateElectricTransformer,
    layout: "/admin"
  },
];

var managerRoutes = [
  {
      path: "/addManager",
      name: "Add Manager",
      icon: "ni ni-fat-add text-blue",
      component: AddManager,
      layout: "/admin"
  },
  {
    path: "/registeredManagers",
    name: "Registered Managers",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredManagers,
    layout: "/admin"
  },
];

var operatorRoutes = [
  {
      path: "/addOperator",
      name: "Add Operator",
      icon: "ni ni-fat-add text-blue",
      component: AddOperator,
      layout: "/admin"
  },
  {
    path: "/registeredOperators",
    name: "Registered Operators",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredOperators,
    layout: "/admin"
},
];

var substationRoutes = [
  {
    path: "/addSubstation",
    name: "Add Substation",
    icon: "ni ni-fat-add text-blue",
    component: AddSubstation,
    layout: "/admin"
  },
];

export {
  adminRoutes,
  electricTransformerRoutes,
  managerRoutes,
  operatorRoutes,
  substationRoutes
}