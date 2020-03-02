import AddAdmin from "views/Administrador-Administrador/AddAdmin.js";
import RegisteredAdmins from "views/Administrador-Administrador/RegisteredAdmins.js";


var adminRoutes = [
  {
      path: "/addAdmin",
      name: "Add Admin",
      icon: "ni ni-single-02 text-yellow",
      component: AddAdmin,
      layout: "/admin"
  },
  {
    path: "/registeredAdmins",
    name: "Registered Admins",
    icon: "ni ni-single-02 text-yellow",
    component: RegisteredAdmins,
    layout: "/admin"
  },
];
export default adminRoutes;