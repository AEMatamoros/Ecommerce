from django.shortcuts import render
from django.contrib.auth import authenticate, logout
# Create your views here.
from .models import Account, Direction,Image,Followers, Sells, Complaints, Currency, Category,Product,Image_Product, Status, Shipping_method, Payment_method ,Payment_data,Order,Product_order,Log, Action

from rest_framework import serializers
from rest_framework import viewsets
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin 
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView

from .serializer import RegistrationSerializer, DirectionSerializer, AccountSerializer, ImageSerializer, FollowersSerializar, SellsSerializer, ComplaintsSerializaer, CurrencySerializaer, CategorySerializer, ProductSerializer, Image_ProductSerializer, StatusSerializer, ShipingSerializer, Payment_methodSerializer, Payment_dataSerializer, OrderSerializer, ProductOrderSerializer, LogSerializer, ActionSerializer


class DirectionGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = DirectionSerializer
    queryset = Direction.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request, id= None):
        return self.create(request)
    
    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id= None):
        return self.destroy(request, id)


class AccountGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    pagination_class = PageNumberPagination
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

#Registro de usuarios
@api_view(['POST',])
def registro_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = 'Nuevo Usuario registrado satisfactoriamente'
            data['email'] = account.email
            data['first_name']  = account.first_name
            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)

@api_view(['POST',])
def logout_view(request):
    data = {}
    logout(request)
    
    data['response'] = 'Cierre de sesion satisfactoria'

    return Response(data)


class LoginAuthToken(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        data = {}

        email = request.data['username']
        password = request.data['password']
    
        account = authenticate(email=email, password=password)
        
        
        if account:
            try:
                account_user = Account.objects.get(email=email)
                token = Token.objects.get(user=account)
            except Token.DoesNotExist:
                token = Token.objects.create(user=account)
			
            data['response'] = 'Logeado con exito.'
            data['pk'] = account.pk
            data['email'] = email
            data['user_normal'] = account_user.is_superuser
            data['user_admin'] = account_user.is_admin
            data['user_active'] = account_user.is_active
            data['token'] = token.key
        else:
            data['response'] = 'Error'
            data['error_message'] = 'Credenciales no validas'
        
        return Response(data)
    
class ImageGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class FollowGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = FollowersSerializar
    queryset = Followers.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class SellsGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = SellsSerializer
    queryset = Sells.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class ComplaintsGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = ComplaintsSerializaer
    queryset = Complaints.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)


class CurrencyGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = CurrencySerializaer
    queryset = Currency.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)


class CategoryGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class ProductGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class Image_productGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = Image_ProductSerializer
    queryset = Image_Product.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)


class StatusGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = StatusSerializer
    queryset = Status.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)


class ShipingGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = ShipingSerializer
    queryset = Shipping_method.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class Payment_MethodGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class =  Payment_methodSerializer
    queryset = Payment_method.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)



class Payment_dataGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = Payment_dataSerializer
    queryset = Payment_data.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class OrderGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class Product_orderGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = ProductOrderSerializer
    queryset = Product_order.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class LogGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = LogSerializer
    queryset = Log.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class ActionGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    serializer_class = ActionSerializer
    queryset = Action.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)


class AllProductGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    pagination_class = None
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)

class AllImage_productGenericView(viewsets.GenericViewSet, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin):
    pagination_class = None
    serializer_class = Image_ProductSerializer
    queryset = Image_Product.objects.all()
    lookup_field = "id"

    def get(self, request, id=None):

        if not (id):
            return self.list(request)
        else:
            return self.retrieve(request)

    def post(self, request,id=None):
        return self.create(request)

    def put(self, request, id= None):
        return self.update(request, id)

    def delete(self, request, id = None):
        return self.destroy(request, id)