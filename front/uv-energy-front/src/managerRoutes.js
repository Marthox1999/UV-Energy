
import AddManager from "views/Administrador-Gerente/AddManager.js";
import RegisteredManagers from "views/Administrador-Gerente/RegisteredManagers.js"
import RUDDManager from "views/Administrador-Gerente/RUDDManager.js"

var managerRoutes = [

  {
      path: "/addManager",
      name: "Add Manager",
      icon: "ni ni-single-02 text-yellow",
      component: AddManager,
      layout: "/admin"
  },
  {
    path: "/registeredManagers",
    name: "Registered Managers",
    icon: "ni ni-single-02 text-yellow",
    component: RegisteredManagers,
    layout: "/admin"
  },
];
export default managerRoutes;
