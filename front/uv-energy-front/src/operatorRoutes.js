import ReadSubstation from "views/Operador-Subestacion/ReadSubstation.js";
import ReadElectricTransformer from "views/Operador-Subestacion/ReadElectricTransformer.js";

var electricTransformerRoutes = [
  {
    path: "/ReadElectricTransformer",
    name: "Registered Electric Transformer",
    icon: "ni ni-fat-delete text-blue",
    component: ReadElectricTransformer,
    layout: "/operator"
  },
];

var substationRoutes = [
  {
    path: "/ReadSubstation",
    name: "Registered Substation",
    icon: "ni ni-fat-delete text-blue",
    component: ReadSubstation,
    layout: "/operator"
  },
];

var clientRoutes = [
  {
    path: "/AddClient",
    name: "Add Client",
    icon: "ni ni-fat-delete text-blue",
    component: ReadSubstation,
    layout: "/operator"
  },
];

export {
  clientRoutes,
  electricTransformerRoutes,
  substationRoutes
}