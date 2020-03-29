import AddSubstation from "views/Administrador-Subestacion/AddSubstation.js";
import DeactivateSubstation from "views/Administrador-Subestacion/DeactivateSubstation.js";

var SubstationRoutes = [
  {
    path: "/addSubstation",
    name: "Add Substation",
    icon: "ni ni-single-02 text-yellow",
    component: AddSubstation,
    layout: "/admin"
  },
  {
    path: "/deactivateSubstation",
    name: "Deactivate Substation",
    icon: "ni ni-single-02 text-yellow",
    component: DeactivateSubstation,
    layout: "/admin"
  },
];
export default SubstationRoutes;