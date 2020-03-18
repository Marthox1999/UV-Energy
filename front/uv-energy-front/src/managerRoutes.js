import RegisteredAdmins from "views/Administrador-Administrador/RegisteredAdmins.js";

import RegisteredManagers from "views/Administrador-Gerente/RegisteredManagers.js"

var adminRoutes = [
  {
    path: "/registeredAdmins",
    name: "Registered Admins",
    icon: "ni ni-single-02 text-yellow",
    component: RegisteredAdmins,
    layout: "/manager"
  },
];

var managerRoutes = [
  {
    path: "/registeredManagers",
    name: "Registered Managers",
    icon: "ni ni-single-02 text-yellow",
    component: RegisteredManagers,
    layout: "/manager"
  },
];

export {
  adminRoutes,  
  managerRoutes,
}