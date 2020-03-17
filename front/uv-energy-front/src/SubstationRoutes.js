import AddSubstation from "views/Administrador-Subestacion/AddSubstation.js";


var SubstationRoutes = [
  {
    path: "/addSubstation",
    name: "Add Substation",
    icon: "ni ni-single-02 text-yellow",
    component: AddSubstation,
    layout: "/admin"
  },
];
export default SubstationRoutes;