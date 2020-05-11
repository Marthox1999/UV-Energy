import ReadSubstation from "views/Operador-Subestacion/ReadSubstation.js";
import ReadElectricTransformer from "views/Operador-Transformador/ReadElectricTransformer.js";
import addClient from "views/Operator-Client/AddClient.js"
import PayWithInvoice from "views/Operator-Client/PayWithInvoice.js"


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
    name: "Client.AddClient.1",
    icon: "ni ni-fat-add text-blue",
    component: addClient,
    layout: "/operator"
  },
  {
    path: "/PayWithInvoices",
    name: "Operator.PayWithInvoices.1",
    icon: "ni ni-fat-add text-blue",
    component: PayWithInvoice,
    layout: "/operator"
  },
];

export {
  clientRoutes,
  electricTransformerRoutes,
  substationRoutes
}