import AddAdmin from "views/Administrador-Administrador/AddAdmin.js";


var adminRoutes = [

  {
      path: "/addAdmin",
      name: "Add Admin",
      icon: "ni ni-single-02 text-yellow",
      component: AddAdmin,
      layout: "/admin"
  },
];
export default adminRoutes;