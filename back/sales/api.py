from sales.models import Bill
from assets.models import Meter
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

class GenerateReportViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def create(self, request):
        print("holaaaaaaaaaaaaaaaaaaa")
        time_size = request.data['time_size']
        print("time Size:")
        print(request.data['time_size'])
        print(request.data)
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
                print(init_date)
                print(end_date)
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
            print(sendpackage)
            print(sendpackage["data"])
            print(sendpackage["labels"])
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
                    time.append(bill['month'])
                    values.append(bill['c'])
            
            sendpackage={"data":values, "labels":time}
            return Response(sendpackage)


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
        # convertir el queryset en json para pasarlo al context
        billJson = json.loads(serializers.serialize('json',[bill,]))
        meterJson = json.loads(serializers.serialize('json',[meter,]))
        clientJson = json.loads(serializers.serialize('json',[client,]))
        # guardarlo en un contexto
        context = { "bill" : billJson[0], "meter" : meterJson[0], "client" : clientJson[0]}
        # busca el template a utilizar
        template = get_template("bill.html")
        # llena el template con la informacion que se recupero de la factura
        html = template.render(context)
        # convierte el template generado en pdf
        pdfkit.from_string(html,'out.pdf')
        # lee el pdf
        with open('out.pdf','rb') as f:
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
        mora = request.data["mora"]
        reconexion = request.data["reconexion"]
        # print(residencial)
        # cantidad de meters activos
        meters = Meter.objects.filter( isActive = True)
        aux = Bill.objects.filter(fk_meter_id=meters[0].pk_meter).order_by('-end_date').first()
        # info necesaria para las nuevas facturas
        new_start_date = aux.end_date + timedelta(days=1)
        new_end_date = new_start_date + timedelta(days=30)
        new_expedition_date = datetime.now().date()
        new_expiration_date = new_expedition_date + timedelta(days=15)
        print("new_start_date ", new_start_date)
        print("new_end_date ", new_end_date)
        print("new_expedition_date ", new_expedition_date)
        print("new_expiration_date ", new_expiration_date)
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
            if bill is None:      
                # meters que no tiene factura solo genero
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
                )
            else:
                # si la factura no esta pagada 
                if not bill.is_paid:
                    # busco la anterior a ella
                    secondbill = Bill.objects.filter(fk_meter_id=meter.pk_meter).order_by('-end_date')
                    if secondbill.count() == 1:
                        # solo existe un recibo y se no se apago genero mora
                        aux = Bill(
                            fk_meter = meter,
                            fk_debit_payment = None,
                            fk_employee = None,
                            start_date = new_start_date,
                            end_date = new_end_date,
                            expedition_date = new_expedition_date,
                            expiration_date = new_expiration_date,
                            is_paid = False,
                            value = int(valorUnitario * read), ####################
                            read = read,
                        )
                    else:
                        if not secondbill[1].is_paid:
                            # si la anterior a ella no esta apagada genero corte
                            aux = Bill(
                                fk_meter = meter,
                                fk_debit_payment = None,
                                fk_employee = None,
                                start_date = new_start_date,
                                end_date = new_end_date,
                                expedition_date = new_expedition_date,
                                expiration_date = new_expiration_date,
                                is_paid = False,
                                value = int(valorUnitario * read),####################
                                read = read,
                            )
                        else:
                            # si esta pagada genero mora
                            aux = Bill(
                                fk_meter = meter,
                                fk_debit_payment = None,
                                fk_employee = None,
                                start_date = new_start_date,
                                end_date = new_end_date,
                                expedition_date = new_expedition_date,
                                expiration_date = new_expiration_date,
                                is_paid = False,
                                value = int(valorUnitario * read), ####################
                                read = read,
                            )
                else:
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
                    )
            try:
                aux.full_clean()
            except ValidationError as e:
                print("error de validacion de datos de generacion automatica !!!!!!!!!!!!!!", e)
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
            print(meter.pk_meter)
        print(meter)
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
            print(meter.pk_meter)
        print(meter)
        queryset = Bill.objects.filter(Q(is_paid=False), Q(fk_meter__in=meter_ids)).order_by('-end_date')
        serializer = BillSerializers(queryset, many=True)
        return Response(serializer.data)
