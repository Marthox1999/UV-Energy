from rest_framework import routers

from .api import BillListViewSet, PaidBillListViewSet, PendingBillListViewSet, GeneratePDFViewSet, GenerateBillsViewSet, SearchInvoiceViewSet, payInvoiceViewSet, payReconnectionViewSet, GenerateReportViewSet, payInvoiceClientViewSet, payUploadFileViewSet, downloadFileViewSet


router = routers.DefaultRouter()
router.register(r'billList', BillListViewSet, 'billList')
router.register(r'paidbillList', PaidBillListViewSet, 'paidbillList')
router.register(r'pendingbillList', PendingBillListViewSet, 'pendingbillList')
router.register(r'generatepdf', GeneratePDFViewSet, 'api-generatepdf')
router.register(r'generateInvoices', GenerateBillsViewSet, 'createInvoices')
router.register(r'searchInvoice', SearchInvoiceViewSet, 'searchInvoice')
router.register(r'payAnInvoice', payInvoiceViewSet, 'payInvoice')
router.register(r'payReconnection', payReconnectionViewSet, 'payReconnection')
router.register(r'generateReport', GenerateReportViewSet, 'generateReport')
router.register(r'payInvoiceClient', payInvoiceClientViewSet, 'payInvoiceClient')
router.register(r'payUploadFile', payUploadFileViewSet, 'payUploadFile')
router.register(r'downloadFile',downloadFileViewSet, 'downloadFile')

urlpatterns = router.urls