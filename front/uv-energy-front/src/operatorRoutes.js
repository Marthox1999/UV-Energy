import AddOperator from "views/Administrador-Operador/AddOperator";
import RegisteredOperators from "views/Administrador-Operador/RegisteredOperator.js";


var operatorRoutes = [

  {
      path: "/addOperator",
      name: "Add Operator",
      icon: "ni ni-single-02 text-yellow",
      component: AddOperator,
      layout: "/admin"
  },
  {
    path: "/registeredOperator",
    name: "Registered Operator",
    icon: "ni ni-single-02 text-yellow",
    component: RegisteredOperators,
    layout: "/admin"
  }
];
export default operatorRoutes;