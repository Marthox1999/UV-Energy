import CheckAllBills from "views/Clientes/CheckAllBills.js";
import CheckPaidBills from "views/Clientes/CheckPaidBills.js";
import CheckPendingBills from "views/Clientes/CheckPendingBills.js";


var clientRoutes = [
  {
      path: "/checkAllBills",
      name: "Bill.AllBills.1",
      icon: "ni ni-books text-blue",
      component: CheckAllBills,
      layout: "/client"
  },
  {
      path: "/checkPaidBills",
      name: "Bill.PaidBills.1",
      icon: "ni ni-folder-17 text-blue",
      component: CheckPaidBills,
      layout: "/client"
  },
  {
      path: "/checkPendingBills",
      name: "Bill.PendingBills.1",
      icon: "ni ni-single-copy-04 text-blue",
      component: CheckPendingBills,
      layout: "/client"
  }
];
export default clientRoutes;