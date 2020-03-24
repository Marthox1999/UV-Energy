import AddElectricTransformer from "views/Administrador-Transformador/AddElectricTransformer";
import DeactivateElectricTransformer from "views/Administrador-Transformador/DeactivateElectricTransformer.js";


var electricTransformerRoutes = [
  {
    path: "/addElectricTransformer",
    name: "Add Electric Transformer",
    icon: "ni ni-fat-add text-blue",
    component: AddElectricTransformer,
    layout: "/admin"
  },
  {
    path: "/DeactivateElectricTransformer",
    name: "Deactivate Electric Transformer",
    icon: "ni ni-fat-delete text-blue",
    component: DeactivateElectricTransformer,
    layout: "/admin"
  },
];
export default electricTransformerRoutes;