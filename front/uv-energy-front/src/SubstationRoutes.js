import AddSubstation from "views/Administrador-Subestacion/AddSubstation.js";


var SubstationRoutes = [
  {
    path: "/addSubstation",
    name: "Add Substation",
    icon: "ni ni-fat-add text-blue",
    component: AddSubstation,
    layout: "/admin"
  },
];
export default SubstationRoutes;