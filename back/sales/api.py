from sales.models import Bill
from assets.models import Meter, ElectricTransformer
from users.models import User
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .serializers import BillSerializers
from django.db.models import Q
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


class GeneratePDFViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
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
            # print(meter._meta.fields)
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
                            interest = bill.value * 0.3
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
                            # no se genera factur para este
                            print("anterior de anterior no pagada corte--------no genera")
                            
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
                                interest = bill.value * 0.3
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
        print("biennnnnnnnnnnnnnnnnnnnnnnnn")
        return Response("Las facturas se han generado correctamente")



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
