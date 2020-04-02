import AddOperator from "views/Administrador-Operador/AddOperator";


var operatorRoutes = [

  {
      path: "/addOperator",
      name: "Add Operator",
      icon: "ni ni-fat-add text-blue",
      component: AddOperator,
      layout: "/admin"
  },
];
export default operatorRoutes;