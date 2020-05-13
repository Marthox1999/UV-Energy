import AddAdmin from "views/Administrador-Administrador/AddAdmin.js";
import RegisteredAdmins from "views/Administrador-Administrador/RegisteredAdmins.js";
import AddElectricTransformer from "views/Administrador-Transformador/AddElectricTransformer";
import ModifyElectricTransformer from "views/Administrador-Transformador/ModifyElectricTransformer.js";
import AddManager from "views/Administrador-Gerente/AddManager.js";
import RegisteredManagers from "views/Administrador-Gerente/RegisteredManagers.js"
import AddOperator from "views/Administrador-Operador/AddOperator";
import RegisteredOperators from "views/Administrador-Operador/RegisteredOperator.js";
import AddSubstation from "views/Administrador-Subestacion/AddSubstation.js";
import ModifySubstation from "views/Administrador-Subestacion/ModifySubstation.js";
import SetInvoices from "views/Administrador-Configurar/SetInvoices.js";
import UploadInvoices from "views/Administrador-Configurar/UploadInvoices.js";

var settingRoutes = [
  
  {
    path: "/invoices",
    name: "Settings.SetUpInvoices.1",
    icon: "ni ni-settings text-blue",
    component: SetInvoices,
    layout: "/admin"
  },
  {
    path: "/upload",
    name: "Settings.Upload.1",
    icon: "ni ni-settings text-blue",
    component: UploadInvoices,
    layout: "/admin"
  },
]


var adminRoutes = [
  {
    path: "/addAdmin",
    name: "Admin.AddAdmin.1",
    icon: "ni ni-fat-add text-blue",
    component: AddAdmin,
    layout: "/admin"
  },
  {
    path: "/registeredAdmins",
    name: "Admin.RegisteredAdmins.1",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredAdmins,
    layout: "/admin"
  },
];

var electricTransformerRoutes = [
  {
    path: "/addElectricTransformer",
    name: "ETransformer.AddET.1",
    icon: "ni ni-fat-add text-blue",
    component: AddElectricTransformer,
    layout: "/admin"
  },
  {
    path: "/ModifyElectricTransformer",
    name: "ETransformer.ModifyET.1",
    icon: "ni ni-settings text-blue",
    component: ModifyElectricTransformer,
    layout: "/admin"
  },
];

var managerRoutes = [
  {
      path: "/addManager",
      name: "Manager.AddManager.1",
      icon: "ni ni-fat-add text-blue",
      component: AddManager,
      layout: "/admin"
  },
  {
    path: "/registeredManagers",
    name: "Manager.RegisteredManagers.1",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredManagers,
    layout: "/admin"
  },
];

var operatorRoutes = [
  {
      path: "/addOperator",
      name: "Operator.AddOperator.1",
      icon: "ni ni-fat-add text-blue",
      component: AddOperator,
      layout: "/admin"
  },
  {
    path: "/registeredOperators",
    name: "Operator.RegisteredOperators.1",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredOperators,
    layout: "/admin"
},
];

var substationRoutes = [
  {
    path: "/addSubstation",

    name: "Substation.AddSubstation.1",
    icon: "ni ni-fat-add text-blue",
    component: AddSubstation,
    layout: "/admin"
  },
  {
    path: "/modifySubstation",
    name: "Substation.ModifySubstation.1",
    icon: "ni ni-settings text-blue",
    component: ModifySubstation,
    layout: "/admin"
  },
];
export {
  settingRoutes,
  adminRoutes,
  electricTransformerRoutes,
  managerRoutes,
  operatorRoutes,
  substationRoutes
}