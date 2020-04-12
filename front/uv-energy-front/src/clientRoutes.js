import CheckBill from "views/Clientes/CheckBill.js";


var clientRoutes = [

  {
      path: "/checkBill",
      name: "Check Bill",
      icon: "ni ni-fat-add text-blue",
      component: CheckBill,
      layout: "/client"
  },
];
export default clientRoutes;