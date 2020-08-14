from rest_framework import serializers
from .models import Account, Direction,Image,Followers, Sells, Complaints, Currency, Category,Product,Image_Product, Status, Shipping_method, Payment_method ,Payment_data,Order,Product_order,Log, Action

class DirectionSerializer(serializers.ModelSerializer):
    def to_representation(self,instance):
        self.fields["relative"]= DirectionSerializer(read_only=True)
        return super(DirectionSerializer,self).to_representation(instance)

    class Meta:
        model= Direction
        fields= '__all__'

class AccountSerializer(serializers.ModelSerializer):
    def to_representation(self,instance):
        self.fields["direction"]= DirectionSerializer(read_only=True)
        self.fields["user_img"]= ImageSerializer(read_only=True)
        self.fields["cover_img"] = ImageSerializer(read_only=True)
        return super(AccountSerializer,self).to_representation(instance)
    class Meta:
        model = Account
        fields= '__all__'
        read_only_fields = ('date_joined','last_login')

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'birth_date', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only':True}
        }

    def save(self):
        account = Account(
            email = self.validated_data['email'],
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name'],
            phone_number = self.validated_data['phone_number'],
            birth_date = self.validated_data['birth_date'], 
            is_active = True
        )

        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']

        if password != confirm_password:
            raise serializers.ValidationError({'password':'Las contraseñas no coinciden'})
        account.set_password(password)
        account.save()

        return account


    
class ImageSerializer(serializers.ModelSerializer):
    class Meta():
        model = Image
        fields= '__all__'

class FollowersSerializar(serializers.ModelSerializer):
    def to_representation(self,instance):
        self.fields["follower_id"]= AccountSerializer(read_only=True)
        self.fields["followed_id"]= AccountSerializer(read_only=True)
        return super(FollowersSerializar,self).to_representation(instance)
    
    class Meta():
        model = Followers
        fields='__all__'

class SellsSerializer(serializers.ModelSerializer):
    def to_representation(self,instance):
        self.fields["seller_user_id"]= AccountSerializer(read_only=True)
        self.fields["costumer_user_id"]= AccountSerializer(read_only=True)
        return super(SellsSerializer ,self).to_representation(instance)
    class Meta():
        model= Sells
        fields= '__all__'

class ComplaintsSerializaer(serializers.ModelSerializer):
    def to_representation(self,instance):
        self.fields["accuser_user_id"]= AccountSerializer(read_only=True)
        self.fields["denounced_user_id"]= AccountSerializer(read_only=True)
        return super(ComplaintsSerializaer ,self).to_representation(instance)
    class Meta():
        model = Complaints
        fields='__all__'

class CurrencySerializaer(serializers.ModelSerializer):
    class Meta():
        model = Currency
        fields='__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta():
        model= Category
        fields='__all__'

class ProductSerializer(serializers.ModelSerializer):
    def to_representation(self,instance):
        self.fields["category_id"]= CategorySerializer(read_only=True)
        self.fields["user_id"]= AccountSerializer(read_only=True)
        return super(ProductSerializer ,self).to_representation(instance)
    
    class Meta():
        model =Product
        fields='__all__'

class Image_ProductSerializer(serializers.ModelSerializer):
    def to_representation(self,instance):
        self.fields["images_id"]= ImageSerializer(read_only=True)
        self.fields["product_id"]= ProductSerializer(read_only=True)
        return super(Image_ProductSerializer ,self).to_representation(instance)
    class Meta():
        model = Image_Product
        fields='__all__'

class StatusSerializer(serializers.ModelSerializer):
    class Meta():
        model = Status
        fields='__all__'

class ShipingSerializer(serializers.ModelSerializer):
    class Meta():
        model = Shipping_method
        fields='__all__'

class Payment_methodSerializer(serializers.ModelSerializer):
    class Meta():
        model = Payment_method
        fields='__all__'

class Payment_dataSerializer(serializers.ModelSerializer):
    class Meta():
        model = Payment_data
        fields='__all__'

#Order,Product_order,Log
class OrderSerializer(serializers.ModelSerializer):
    def to_representation(self,instance):
        self.fields["status_id"]= StatusSerializer(read_only=True)
        self.fields["direction_id"]= DirectionSerializer(read_only=True)
        return super(OrderSerializer ,self).to_representation(instance)
    class Meta():
        model = Order
        fields='__all__'

class ProductOrderSerializer(serializers.ModelSerializer):
    def to_representation(self,instance):
        self.fields["product_id"]= ProductSerializer(read_only=True)
        self.fields["order_id"]= OrderSerializer(read_only=True)
        return super(ProductOrderSerializer ,self).to_representation(instance)
    class Meta():
        model = Product_order
        fields='__all__'

class ActionSerializer(serializers.ModelSerializer):
    class Meta():
        model = Action
        fields='__all__'

class LogSerializer(serializers.ModelSerializer):
    def to_representation(self,instance):
        self.fields["user_id"]= AccountSerializer(read_only=True)
        self.fields["action_id"]= ActionSerializer(read_only=True)
        return super(LogSerializer ,self).to_representation(instance)
    class Meta():
        model = Log
        fields='__all__'


