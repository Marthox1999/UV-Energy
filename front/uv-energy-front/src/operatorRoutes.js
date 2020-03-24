import AddOperator from "views/Administrador-Operador/AddOperator";


var operatorRoutes = [

  {
      path: "/addOperator",
      name: "Add Operator",
      icon: "ni ni-single-02 text-yellow",
      component: AddOperator,
      layout: "/admin"
  },
];
export default operatorRoutes;