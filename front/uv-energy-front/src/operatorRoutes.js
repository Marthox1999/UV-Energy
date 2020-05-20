import ReadSubstation from "views/Operador-Subestacion/ReadSubstation.js";
import ReadElectricTransformer from "views/Operador-Transformador/ReadElectricTransformer.js";
import addClient from "views/Operator-Client/AddClient.js"
import RegisteredClients from "views/Operator-Client/RegisteredClients.js"
import PayWithInvoice from "views/Operator-Client/PayWithInvoice.js"
//import PayWithClient from "views/Operator-Client/PayWithClient.js"


var electricTransformerRoutes = [
  {
    path: "/ReadElectricTransformer",
    name: "ETransformer.Registered.1",
    icon: "ni ni-istanbul text-blue",
    component: ReadElectricTransformer,
    layout: "/operator"
  },
];

var substationRoutes = [
  {
    path: "/ReadSubstation",
    name: "Substation.RegisteredSubstation.1",
    icon: "ni ni-istanbul text-blue",
    component: ReadSubstation,
    layout: "/operator"
  },
];

var clientRoutes = [
  {
    path: "/AddClient",
    name: "Client.AddClient.1",
    icon: "ni ni-fat-add text-blue",
    component: addClient,
    layout: "/operator"
  },
  {
    path: "/RegisteredClients",
    name: "Client.RegisteredClient.1",
    icon: "ni ni-single-02 text-blue",
    component: RegisteredClients,
    layout: "/operator"
  },
  {
    path: "/PayWithInvoices",
    name: "Operator.PayWithInvoices.1",
    icon: "ni ni-credit-card text-blue",
    component: PayWithInvoice,
    layout: "/operator"
  },
  /**
   * 
   * 
   
  {
    path: "/PayWithClient",
    name: "Operator.PayWithClient.1",
    icon: "ni ni-fat-add text-blue",
    component: PayWithClient,
    layout: "/operator"
  },
  */
];

export {
  clientRoutes,
  electricTransformerRoutes,
  substationRoutes
}