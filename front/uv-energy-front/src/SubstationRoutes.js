import AddSubstation from "views/Administrador-Subestacion/AddSubstation.js";
import DeactivateSubstation from "views/Administrador-Subestacion/DeactivateSubstation.js";


var SubstationRoutes = [
  {
    path: "/addSubstation",
    name: "Add Substation",
    icon: "ni ni-fat-add text-blue",
    component: AddSubstation,
    layout: "/admin"
  },
  {
    path: "/deactivateSubstation",
    name: "Deactivate Substation",
    icon: "ni ni-single-02 text-blue",
    component: DeactivateSubstation,
    layout: "/admin"
  },
];
export default SubstationRoutes;