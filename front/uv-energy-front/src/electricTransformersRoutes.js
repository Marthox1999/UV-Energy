import AddElectricTransformer from "views/Administrador-Transformador/AddElectricTransformer.js";


var electricTransformerRoutes = [

  {
      path: "/addElectricTransformer",
      name: "Add Operator",
      icon: "ni ni-single-02 text-yellow",
      component: AddElectricTransformer,
      layout: "/admin"
  },
];
export default electricTransformerRoutes;