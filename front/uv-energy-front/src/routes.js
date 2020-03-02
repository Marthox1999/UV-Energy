/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import LMaps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/users/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import UVForm from "views/examples/Form.js";
*/
import AddManager from "views/Administrador-Gerente/AddManager.js";
//import ModifyManager from "views/Administrador-Gerente/ModifyManager.js";
import AddElectricTransformer from "views/Administrador-Transformador/AddElectricTransformer.js";
import AddAdmin from "views/Administrador-Administrador/AddAdmin.js";
import AddSubstation from "views/Administrador-Subestacion/AddSubstation.js";
import AddOperator from "views/Administrador-Operador/AddOperator";
import RUDDManager from "views/Administrador-Gerente/RUDDManager.js";
import RUDDOperator from "views/Administrador-Operador/RUDDOperator.js"


var routes = [

/*
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
  */
  {
      path: "/addManager",
      name: "Add Manager",
      icon: "ni ni-single-02 text-yellow",
      component: AddManager,
      layout: "/admin"
  },
  /*
  {
      path: "/modifyManager",
      name: "Modificar Gerente",
      icon: "ni ni-single-02 text-yellow",
      component: ModifyManager,
      layout: "/admin"
  },*/
  {
      path: "/addSubstation",
      name: "Add Substation",
      icon: "ni ni-single-02 text-yellow",
      component: AddSubstation,
      layout: "/admin"
  },
  {
      path: "/addElectricTransformer",
      name: "Add Electric Transformer",
      icon: "ni ni-single-02 text-yellow",
      component: AddElectricTransformer,
      layout: "/admin"
  },
  {
      path: "/addAdmin",
      name: "Add Admin",
      icon: "ni ni-single-02 text-yellow",
      component: AddAdmin,
      layout: "/admin"
  },
  {
      path: "/addOperator",
      name: "Add Operator",
      icon: "ni ni-single-02 text-yellow",
      component: AddOperator,
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
    path: "/RUDDOperator",
    name: "Selected Operator",
    icon: "ni ni-single-02 text-yellow",
    component: RUDDOperator,
    layout:"/admin"
 },
];
export default routes;
