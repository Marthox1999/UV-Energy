import CheckAllBills from "views/Clientes/CheckAllBills.js";
import CheckPaidBills from "views/Clientes/CheckPaidBills.js";
import CheckPendingBills from "views/Clientes/CheckPendingBills.js";


var clientRoutes = [
  {
      path: "/checkAllBills",
      name: "All Bills",
      icon: "ni ni-fat-add text-blue",
      component: CheckAllBills,
      layout: "/client"
  },
  {
      path: "/checkPaidBills",
      name: "Paid Bills",
      icon: "ni ni-fat-add text-blue",
      component: CheckPaidBills,
      layout: "/client"
  },
  {
      path: "/checkPendingBills",
      name: "Pending Bills",
      icon: "ni ni-fat-add text-blue",
      component: CheckPendingBills,
      layout: "/client"
  }
];
export default clientRoutes;