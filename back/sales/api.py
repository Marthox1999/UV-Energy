from sales.models import Bill, Bank, DebitPayment
from assets.models import Meter, ElectricTransformer
from users.models import User
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .serializers import BillSerializers
from django.db.models import Q, Count, Min, Max, Avg, Sum
from django.db.models.functions import TruncMonth, TruncYear
from django.http import HttpResponse
from django.template.loader import get_template
from django.core import serializers
from django.core.exceptions import ValidationError
import pdfkit
import json


# funcion auxiliar para generar histogramas 


def histogramGenerate(meter_id, expedition_date):
        from matplotlib import pyplot as plt
        import numpy as np
        # queries con informacion del histograma maximo 6 meses
        hdatequery = Bill.objects.filter(fk_meter_id=meter_id, expedition_date__lte=expedition_date).order_by('-end_date').values('start_date')[:6]
        hreadquery = Bill.objects.filter(fk_meter_id=meter_id, expedition_date__lte=expedition_date).order_by('-end_date').values('read')[:6]
        hread = []
        hdate = []
        # creando lista a entregar a plt
        for r, d in zip(hreadquery, hdatequery):
            hread.append(r['read'])
            hdate.append(d['start_date'].strftime('%B')[:3])
        # barra promedio
        hread.append(np.average(hread))
        hdate.append("PROM")
        # creacion de el diagrama de barras
        fig, ax = plt.subplots()
        ax.barh(np.arange(len(hread)) ,hread ,align="center")
        # etiquetas
        ax.set_yticks(np.arange(len(hdate)))
        ax.set_yticklabels(hdate, fontsize=30)
        plt.xticks(fontsize= 20)
        ax.invert_yaxis()
        # guardando la imagen
        plt.savefig("static/hist.png",  bbox_inches = "tight")
        return hreadquery

class GenerateReportViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        time_size = request.data['time_size']
        if (time_size=='monthly'):
            init_month = request.data['init_month']
            finish_month = request.data['finish_month']
            init_year = request.data['init_year']
            finish_year = request.data['finish_year']

            init_date = init_year+'-'+init_month+"-01"
            end_date = finish_year+'-'+finish_month+"-01"

            report_type = request.data['report_type']

            time=[]
            values=[]
            bills="empty"

            if(report_type == "bill"):
                #Obtener las facturas pagadas y calcular la cantidad por mes
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date, is_paid=True).annotate(month=TruncMonth('expedition_date')).values('month').annotate(c = Count('month')).values('month', 'c').order_by('month')
            elif (report_type == "no_payed_bill"):
                #Obtener las facturas no pagadas y calcular la cantidad por mes
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date, is_paid=False).annotate(month=TruncMonth('expedition_date')).values('month').annotate(c = Count('month')).values('month', 'c').order_by('month')
            elif (report_type == "income"):
                #Obtener las facturas
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date, is_paid=True).annotate(month=TruncMonth('expedition_date')).values('month').annotate(c = Sum('value')).values('month', 'c').order_by('month')
            elif (report_type == "operator_payments"):
                #Obtener las facturas y calcular los pagos
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date, is_paid=True).annotate(month=TruncMonth('expedition_date')).values('month').annotate(c = Count('fk_employee_id')).values('month', 'c').order_by('month')
            elif (report_type == "debit_payments"):
                #Obtener las facturas y calcular los pagos
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date, is_paid=True).annotate(month=TruncMonth('expedition_date')).values('month').annotate(c = Count('fk_debit_payment_id')).values('month', 'c').order_by('month')
            elif (report_type == "consumption"):
                #Obtener las facturas y calcular el consumo
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date).annotate(month=TruncMonth('expedition_date')).values('month').annotate(c = Sum('read')).values('month', 'c').order_by('month')
            else:
                "por favor seleccione un tipo de grafica"
            if bills != "empty":
                for bill in bills:
                    time.append(bill['month'])
                    values.append(bill['c'])
            
            sendpackage={"data":values, "labels":time}
            return Response(sendpackage)

        elif (time_size=='yearly'):
            init_year = request.data['init_year']
            finish_year = request.data['finish_year']

            init_date = init_year+"-01-01"
            end_date = finish_year+'-12-01'

            report_type = request.data['report_type']

            time=[]
            values=[]
            bills="empty"

            if(report_type == "bill"):
                #Obtener las facturas pagadas y calcular la cantidad por mes
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date, is_paid=True).annotate(year=TruncYear('expedition_date')).values('year').annotate(c = Count('year')).values('year', 'c').order_by('year')
            elif (report_type == "no_payed_bill"):
                #Obtener las facturas no pagadas y calcular la cantidad por mes
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date, is_paid=False).annotate(year=TruncYear('expedition_date')).values('year').annotate(c = Count('year')).values('year', 'c').order_by('year')
            elif (report_type == "income"):
                #Obtener las facturas
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date, is_paid=True).annotate(year=TruncYear('expedition_date')).values('year').annotate(c = Sum('value')).values('year', 'c').order_by('year')
            elif (report_type == "operator_payments"):
                #Obtener las facturas y calcular los pagos
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date, is_paid=True).annotate(year=TruncYear('expedition_date')).values('year').annotate(c = Count('fk_employee_id')).values('year', 'c').order_by('year')
            elif (report_type == "debit_payments"):
                #Obtener las facturas y calcular los pagos
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date, is_paid=True).annotate(year=TruncYear('expedition_date')).values('year').annotate(c = Count('fk_debit_payment_id')).values('year', 'c').order_by('year')
            elif (report_type == "consumption"):
                #Obtener las facturas y calcular el consumo
                bills = Bill.objects.filter(expedition_date__gte=init_date, expedition_date__lte=end_date).annotate(year=TruncYear('expedition_date')).values('year').annotate(c = Sum('read')).values('year', 'c').order_by('year')
            else:
                "por favor seleccione un tipo de grafica"
            if bills != "empty":
                for bill in bills:
                    time.append(bill['year'])
                    values.append(bill['c'])
            
            sendpackage={"data":values, "labels":time}
            return Response(sendpackage)



class GeneratePDFViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        import time
        start_time = time.time()
        # recibe el parametro de la factura a generar
        pk = request.query_params.get('pk_bill')
        # buscar el registros asociados de dicha factura
        bill = Bill.objects.get(pk_bill=pk)
        meter = Meter.objects.get(pk_meter=bill.fk_meter_id)
        client = User.objects.get(id=meter.fk_client_id)
        transformer = ElectricTransformer.objects.get(pk_transformers=meter.fk_electric_transformers_id)
        lastpayment = Bill.objects.filter(fk_meter_id=bill.fk_meter_id, expedition_date__lte=bill.expedition_date).order_by('-end_date').values('value','unit_value','is_paid','read','mora')[:2]
        # generar histograma
        hreadquery = histogramGenerate(bill.fk_meter_id, bill.expedition_date)
        # verificando si tienen historial o no
        lastpay = islastpay = before = last = ""
        unit = mora = value = 0
        if lastpayment.count() <= 1 or hreadquery.count() <= 1:
            lastpay = islastpay = before = last = "No hay historial"
        else:
            lastpay = lastpayment[1]['value']
            islastpay = "Si" if lastpayment[1]['is_paid'] else "No pagado"
            before = hreadquery[1]['read']
            last = hreadquery[1]['read'] + hreadquery[0]['read']
        # convertir el queryset en json para pasarlo al context
        billJson = json.loads(serializers.serialize('json',[bill,]))
        meterJson = json.loads(serializers.serialize('json',[meter,]))
        clientJson = json.loads(serializers.serialize('json',[client,]))
        transformerJson = json.loads(serializers.serialize('json',[transformer,]))
        # si no esta pagado el ultimo agregar mora
        if islastpay == "No pagado":
            unit = billJson[0]['fields']['unit_value']
            value = int(billJson[0]['fields']['read'] * billJson[0]['fields']['unit_value'])
            mora = int(billJson[0]['fields']['value'] - lastpay - value)
            
        else:
            unit = billJson[0]['fields']['unit_value']
            value = billJson[0]['fields']['value']
        # barcode
        # from barcode import EAN13
        # from barcode.writer import ImageWriter
        # with open("bar.png","wb") as f:
        #     EAN13(pk, writer=ImageWriter()).write(f)
        # guardarlo en un context
        context = { "bill"   : billJson[0],
                    "meter"  : meterJson[0],
                    "client" : clientJson[0],
                    "transformer" : transformerJson[0],
                    "substation" : transformer.fk_substation.name,
                    "lastpayment" : lastpay,
                    "islastpayment" :  islastpay,
                    "unit"   : unit,
                    "mora"   : mora,
                    "before" : before,
                    "last"   : last,
                    "value"  : value,
                  }
        # busca el template a utilizar
        template = get_template("bill.html")
        # llena el template con la informacion que se recupero de la factura
        html = template.render(context)
        # convierte el template generado en pdf
        pdfkit.from_string(html,'output.pdf')
        # lee el pdf
        with open('output.pdf','rb') as f:
            pdf = f.read()
        # prepara la cabecera de la peticion
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment;  filename=output.pdf'
        #f.close()
        # envia la respuesta
        print(" TIME: ", time.time() - start_time)
        return response


class GenerateBillsViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    # el nombre de la funcion es default y recibe post no necesito verificar metodo
    def create(self, request):
        from datetime import datetime, timedelta
        from random import randint
        # obtengo la informacion entrante    
        residencial = request.data["residencial"]
        industrial = request.data["industrial"]
        mora = float(request.data["mora"])
        # cantidad de meters activos
        meters = Meter.objects.filter( isActive = True)
        aux = Bill.objects.filter(fk_meter_id=meters[0].pk_meter).order_by('-end_date').first()
        # info necesaria para las nuevas facturas
        new_start_date = aux.end_date + timedelta(days=1)
        new_end_date = new_start_date + timedelta(days=30)
        new_expedition_date = datetime.now().date()
        new_expiration_date = new_expedition_date + timedelta(days=15)
        # print("new_start_date ", new_start_date)
        # print("new_end_date ", new_end_date)
        # print("new_expedition_date ", new_expedition_date)
        # print("new_expiration_date ", new_expiration_date)
        # tomo la ultima factura de cada meter (suponiendo uno cada uno)
        for meter in meters:
            # tomo la ultima factura del contador 
            bill = Bill.objects.filter(fk_meter_id=meter.pk_meter).order_by('-end_date').first()
            # encuentro el factor para multiplicar la lectura
            if meter.use == "RES":
                valorUnitario = float(residencial[int(meter.stratum)-1])
            else:
                valorUnitario = float(industrial[int(meter.stratum)-1])
            # lectura de consumo
            read = randint(400,1000)
            # si no hay bill es nuevo genero normal
            print("meter: ", meter.pk_meter)
            if bill is None:      
                # meters que no tiene factura solo genero
                print("# meters que no tiene factura solo genero")
                aux = Bill(
                    fk_meter = meter,
                    fk_debit_payment = None,
                    fk_employee = None,
                    start_date = new_start_date,
                    end_date = new_end_date,
                    expedition_date = new_expedition_date,
                    expiration_date = new_expiration_date,
                    is_paid = False,
                    value = int(valorUnitario * read),
                    read = read,
                    unit_value = valorUnitario,
                    mora = mora,
                )
            else:
                # si la factura no esta pagada 
                print("# si la factura no esta pagada : not ", bill.is_paid)
                if not bill.is_paid:
                    # busco la anterior a ella
                    secondbill = Bill.objects.filter(fk_meter_id=meter.pk_meter).order_by('-end_date')
                    print("# busco la anterior a ella : not ", secondbill.count() == 1)
                    if secondbill.count() == 1:
                        print("# solo existe un recibo y no se a pagado genero mora")
                        # solo existe un recibo y se no se apago genero mora
                        print("tiempo mora--solo uno --", datetime.now().date() - bill.expiration_date)
                        now =  datetime.now().date().year*1000 + datetime.now().date().month*100 + datetime.now().date().day
                        past = bill.expiration_date.year*1000 + bill.expiration_date.month*100 + bill.expiration_date.day
                        print("interes", bill.value * abs(now - past)* (mora/100.0))
                        print("valor anterior", bill.value)
                        print("mora total", bill.value * abs(now - past)* (mora/100.0) + bill.value)
                        if (abs(now - past) >= 30):
                            interest = bill.value * 0.3 + bill.value
                        else:
                            interest = bill.value * abs(now - past)* (mora/100.0) + bill.value
                        aux = Bill(
                            fk_meter = meter,
                            fk_debit_payment = None,
                            fk_employee = None,
                            start_date = new_start_date,
                            end_date = new_end_date,
                            expedition_date = new_expedition_date,
                            expiration_date = new_expiration_date,
                            is_paid = False,
                            value = int(valorUnitario * read) + interest, ####################
                            read = read,
                            unit_value = valorUnitario,
                            mora = mora,
                        )
                    else:
                        print("hace dos meses no se pago: not ", secondbill[1].is_paid)
                        if not secondbill[1].is_paid:
                            print("# si la anterior a ella no esta apagada genero corte")
                            # si la anterior a ella no esta apagada genero corte
                            # no se genera factura para esta
                        else:
                            print("# si el hace 2 meses esta pagada genero mora")
                            # si esta pagada genero mora
                            now =  datetime.now().date().year*1000 + datetime.now().date().month*100 +datetime.now().date().day
                            past = bill.expiration_date.year*1000 + bill.expiration_date.month*100 + bill.expiration_date.day
                            print("tiempo mora--anterior pagada", now - past)
                            print("interes", bill.value * abs(now - past)* (mora/100.0))
                            print("valor anterior", bill.value)
                            print("mora total", bill.value * abs(now - past)* (mora/100.0) + bill.value)
                            if (abs(now - past) >= 30):
                                interest = bill.value * 0.3 + bill.value
                            else:
                                interest = bill.value * abs(now - past)* (mora/100.0) + bill.value
                            aux = Bill(
                                fk_meter = meter,
                                fk_debit_payment = None,
                                fk_employee = None,
                                start_date = new_start_date,
                                end_date = new_end_date,
                                expedition_date = new_expedition_date,
                                expiration_date = new_expiration_date,
                                is_paid = False,
                                value = int(valorUnitario * read) + interest, ####################
                                read = read,
                                unit_value = valorUnitario,
                                mora = mora,
                            )
                else:
                    print("# si la encontrada esta pagada")
                    # si la encontrada esta pagada
                    # genero una normal
                    aux = Bill(
                        fk_meter = meter,
                        fk_debit_payment = None,
                        fk_employee = None,
                        start_date = new_start_date,
                        end_date = new_end_date,
                        expedition_date = new_expedition_date,
                        expiration_date = new_expiration_date,
                        is_paid = False,
                        value = int(valorUnitario * read),
                        read = read,
                        unit_value = valorUnitario,
                        mora = mora,
                    )
            try:
                aux.full_clean()
            except ValidationError as e:
                print("error de validacion de datos de generacion automatica !", e)
            aux.save()
        return Response("Las facturas se han generado correctamente")

class downloadFileViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        from os.path import exists, join
        from os import makedirs, getcwd, walk
        bank = request.data["selectedBank"]
        if not exists('BanksData'):
            return Response("no hay pagos registrados en ese banco.")
        else:
            if not exists(join('BanksData',bank+'.txt')):
               return Response("no hay pagos registrados en ese banco.") 
        
        with open(join('BanksData',bank+'.txt'),'rb') as f:
            bankdata = f.read()
        # prepara la cabecera de la peticion
        response = HttpResponse(bankdata, content_type='text/plain')
        response['Content-Disposition'] = 'attachment;  filename={0}'.format(bankdata)
        # envia la respuesta
        return response





class BillListViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def list(self, request):
        pk=request.query_params.get('pk_cliente')
        meters = Meter.objects.filter(fk_client=pk)
        meter_ids=[]
        for meter in meters:
            meter_ids.append(meter.pk_meter)
        queryset = Bill.objects.filter(fk_meter__in=meter_ids).order_by('-end_date')
        serializer = BillSerializers(queryset, many=True)
        return Response(serializer.data)

class PaidBillListViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def list(self, request):
        pk=request.query_params.get('pk_cliente')
        meters = Meter.objects.filter(fk_client=pk)
        meter_ids=[]
        for meter in meters:
            meter_ids.append(meter.pk_meter)
        queryset = Bill.objects.filter(Q(is_paid=True), Q(fk_meter__in=meter_ids)).order_by('-end_date')
        serializer = BillSerializers(queryset, many=True)
        return Response(serializer.data)

class PendingBillListViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def list(self, request):
        pk=request.query_params.get('pk_cliente')
        meters = Meter.objects.filter(fk_client=pk)
        meter_ids=[]
        for meter in meters:
            meter_ids.append(meter.pk_meter)
        queryset = Bill.objects.filter(Q(is_paid=False), Q(fk_meter__in=meter_ids)).order_by('-end_date')
        serializer = BillSerializers(queryset, many=True)
        return Response(serializer.data)


class SearchInvoiceViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        from datetime import datetime, timedelta
        pk = request.data["referenceBill"]
        bill = Bill.objects.filter(pk_bill = pk).first()
        response = {}
        # no existe la factura con esa referencia
        if bill is None:
            response = {    
                        "valor": "-2", 
                        "mora" : "0",
                        "interes" : "0",
                        "total": "0", 
                        "reconexion": "0",
                        }
        else:
            # ya esta pagada
            if bill.is_paid:
                response = {    
                        "valor": "0", 
                        "mora" : "0",
                        "interes" : "0",
                        "total": "0", 
                        "reconexion": "0",
                        }
            else:
                # ya se vencio
                if datetime.now().date() >  bill.expiration_date or datetime.now().date() < bill.expedition_date:
                    response = {    
                            "valor": "-1", 
                            "mora" : "0",
                            "interes" : "0",
                            "total": "0", 
                            "reconexion": "0",
                            }
                else:
                    lastbill = Bill.objects.filter(fk_meter_id=bill.fk_meter_id, expedition_date__lte=bill.expedition_date).order_by('-end_date').values('is_paid','value','expiration_date')[:2]
                    # si no existen dos facturas para ese contador
                    if lastbill.count() <= 1:
                        # paga esta factura
                        response = {    
                            "valor": str(bill.value), 
                            "mora" : "0",
                            "interes" : "0",
                            "total": str(bill.value), 
                            "reconexion": "0",
                        }
                    # si existen dos facturas para este contador
                    else:
                        # la factura anterior no esta pagada     
                        if not lastbill[1]['is_paid']:
                            print(lastbill[1])
                            # y la actual esta vencida
                            if bill.expiration_date < datetime.now().date():
                                response = {    
                                    "valor": str(int(bill.read * bill.unit_value)), 
                                    "mora" : str(lastbill[1]['value']),
                                    "interes" : str(int(bill.value - lastbill[1]['value'] - bill.read * bill.unit_value)),
                                    "total": str(bill.value + 34000), 
                                    "reconexion": "34000",
                                }
                            # no esta vencida
                            else:
                                response = {    
                                    "valor": str(int(bill.read * bill.unit_value)), 
                                    "mora" : str(lastbill[1]['value']),
                                    "interes" : str(int(bill.value - lastbill[1]['value'] - bill.read * bill.unit_value)),
                                    "total": str(bill.value), 
                                    "reconexion": "0",
                                }
                        else:
                            print("pago normal")
                            # pago normal
                            response = {    
                                "valor": str(bill.value), 
                                "mora" : "0",
                                "interes" : "0",
                                "total": str(bill.value), 
                                "reconexion": "0",
                            }
        return Response(response)


class payInvoiceViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        from django.db import transaction
        pk = request.data["referenceBill"]
        pk_operator = request.data["operator"]
        with transaction.atomic():
            Bill.objects.select_for_update().filter(pk_bill = pk).update(is_paid = True, fk_employee_id= pk_operator)
        return Response ("pagado")

class  payReconnectionViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        from django.db import transaction
        pk = request.data["referenceBill"]
        pk_operator = request.data["operator"]
        with transaction.atomic():
            bill = Bill.objects.get(pk_bill=pk)
            bills = Bill.objects.filter(fk_meter_id=bill.fk_meter_id, is_paid= False, expedition_date__lte=bill.expedition_date).order_by('-end_date')
            bills.select_for_update().update(is_paid = True, fk_employee_id= pk_operator)
        return Response ("pagado")


class payInvoiceClientViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        from os.path import exists, join
        from os import makedirs, getcwd, walk
        pk = request.data["referenceBill"]
        bank = request.data['bank']
        if not exists('BanksData'):
            makedirs('BanksData')
        
        with open(join('BanksData', bank+'.txt'), 'a') as f:
            f.write(str(pk) + '\n')

        return Response("guardado satisfactoriamente")

class payUploadFileViewSet (viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        from django.db import IntegrityError, transaction
        pksInvoices = request.data["invoices"]
        pkBank = str(request.data['bank']).split(".")[0]
        bank = Bank.objects.get(name=pkBank)
        try:
            with transaction.atomic():
                for invoice in pksInvoices:
                    #creo el pago debito correspondiented
                    debitpay = DebitPayment.objects.create(fk_bank=bank)
                    #modifico las facturas con los pagos
                    bill = Bill.objects.get(pk_bill=invoice)
                    beforebill = Bill.objects.filter(fk_meter_id=bill.fk_meter_id, is_paid=False, expedition_date__lte=bill.expedition_date).order_by('-end_date').first()
                    # si no existe factura anterior 
                    if beforebill is None:
                        # solo paga la actual
                        Bill.objects.select_for_update().filter(pk_bill=invoice).update(fk_debit_payment=debitpay, is_paid=True)
                    else:
                        # si no se pago la factura anterior
                        if not beforebill.is_paid:
                            # paga todas
                            Bill.objects.select_for_update().filter(is_paid=False).update(fk_debit_payment=debitpay, is_paid=True)
                        else:
                            # solo paga la actual
                            bill.select_for_update().update(fk_debit_payment=debitpay, is_paid=True)
        except IntegrityError:
            print('Fallo en la venta!')
            return Response('Fallo en la venta!')
        return Response("Se registraron los pagos correctamente")
