import AddAdmin from "views/Administrador-Administrador/AddAdmin.js";
import RegistredAdmins from "views/Administrador-Administrador/RegistredAdmins.js";


var adminRoutes = [

  {
      path: "/addAdmin",
      name: "Add Admin",
      icon: "ni ni-single-02 text-yellow",
      component: AddAdmin,
      layout: "/admin"
  },
  {
    path: "/registeredAdmin",
    name: "Registered Admin",
    icon: "ni ni-single-02 text-yellow",
    component: RegistredAdmins,
    layout: "/admin"
},
];
export default adminRoutes;