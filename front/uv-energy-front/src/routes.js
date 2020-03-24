import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import LMaps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/users/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import UVForm from "views/examples/Form.js";
import RUDDAdmin from "views/Administrador-Administrador/RUDDAdmin.js";
import RUDDManager from "views/Administrador-Gerente/RUDDManager.js"
import RUDDOperator from "views/Administrador-Operador/RUDDOperator.js"
import RUDDAdminM from "views/Gerente-Reportes/RUDDAdminM.js"
import RUDDManagerM from "views/Gerente-Reportes/RUDDManagerM.js"
import RUDDOperatorM from "views/Gerente-Reportes/RUDDOperatorM.js"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: LMaps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/form",
    name: "Form",
    icon: "ni ni-single-02 text-yellow",
    component: UVForm,
    layout: "/admin"
  },
  {
    path: "/RUDDManager",
    name: "Selected Manager",
    icon: "ni ni-single-02 text-yellow",
    component: RUDDManager,
    layout:"/admin"
 },
  {
    path: "/RUDDAdmin",
    name: "Selected Admin",
    icon: "ni ni-single-02 text-yellow",
    component: RUDDAdmin,
    layout: "/admin"
  },
  {
    path: "/RUDDOperator",
    name: "Selected Operator",
    icon: "ni ni-single-02 text-yellow",
    component: RUDDOperator,
    layout: "/admin"
  },
  {
    path: "/RUDDAdminM",
    name: "Selected Admin",
    icon: "ni ni-single-02 text-yellow",
    component: RUDDAdminM,
    layout: "/manager"
  },
  {
    path: "/RUDDManagerM",
    name: "Selected Admin",
    icon: "ni ni-single-02 text-yellow",
    component: RUDDManagerM,
    layout: "/manager"
  },
  {
    path: "/RUDDOperatorM",
    name: "Selected Operator",
    icon: "ni ni-single-02 text-yellow",
    component: RUDDOperatorM,
    layout: "/admin"
  },
];
export default routes;
