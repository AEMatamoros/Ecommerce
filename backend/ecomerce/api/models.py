from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


import uuid

# Create your models here.

def images_directory_path(instance, filename):
    return '/'.join(['profile_img', str(uuid.uuid4().hex + "." + filename.split(".")[-1])])

class Image(models.Model):
    img_route= models.ImageField(upload_to=images_directory_path, verbose_name="Ruta de la Imagen")
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.img_route)

class Direction(models.Model):
    direction = models.CharField(max_length=60, null=True, blank=True)
    relative = models.ForeignKey('self', on_delete=models.CASCADE, related_name="relative_direction", null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.direction)

class AccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, phone_number, birth_date, password=None):
        if not email:
            raise ValueError("Debes ingresar tu correo para registrarte")
        if not first_name:
            raise ValueError("Debes ingresar tu nombre para registrarte")
        if not last_name:
            raise ValueError("Debes ingresar tu apellido para registrarte")
        if not phone_number:
            raise ValueError("Debes ingresar número de teléfono para registrarte")
        if not birth_date:
            raise ValueError("Debes ingresar tu fecha de nacimiento para registrarte")
        user = self.model(
            email = self.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
            phone_number = phone_number,
            birth_date = birth_date,
            user_img = Image.objects.get(pk = 1),
            cover_img = Image.objects.get(pk = 1)
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, phone_number, birth_date, password=None):
        user = self.create_user(
            email = self.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
            phone_number = phone_number,
            birth_date = birth_date,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Correo electrónico',
        max_length=100,
        unique=True
    )
    first_name = models.CharField(
        verbose_name='Nombre',
        max_length=50,
    )
    last_name = models.CharField(
        verbose_name='Apellido',
        max_length=50,
    )
    phone_number = models.CharField(
        verbose_name='Número de teléfono',
        max_length=20,
    )
    
    birth_date = models.DateField(
        verbose_name='Fecha de nacimiento'
    )
    date_joined = models.DateTimeField(
        verbose_name='Fecha de registro',
        auto_now_add=True
    )
    last_login = models.DateTimeField(
        verbose_name='Último acceso',
        auto_now=True
    )
    is_admin = models.BooleanField(
        default=False
    )
    is_staff = models.BooleanField(
        default=False
    )
    is_active = models.BooleanField(
        default=False
    )
    is_superuser = models.BooleanField(
        default=True
    )
    user_img= models.ForeignKey(
        Image,
        null=True,
        on_delete=models.CASCADE,
        related_name="profile_img",
        default="1"
    )
    cover_img= models.ForeignKey(
        Image, 
        null=True,
        on_delete=models.CASCADE,
        related_name="cover_img",
        default="1"
    )
    direction = models.ForeignKey(
        Direction, 
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    class Meta():
        verbose_name= "Cuenta"
        verbose_name_plural= "Cuentas"

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name','phone_number','birth_date']

    objects = AccountManager()

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)        


class Followers(models.Model):
    follower_id = models.ForeignKey(Account, related_name='followers', on_delete=models.CASCADE)
    followed_id = models.ForeignKey(Account, related_name='followed', on_delete=models.CASCADE)
    follow_date = models.DateTimeField(auto_now_add=True)

    class Meta():
        unique_together =['follower_id','followed_id']


        
    
class Complaints(models.Model):
    accuser_user_id = models.ForeignKey(Account, related_name="accuser_user_id", on_delete=models.CASCADE, verbose_name='Denunciante')
    denounced_user_id = models.ForeignKey(Account, related_name="denounced_user_id", null=True, on_delete=models.CASCADE, verbose_name='Denunciado')
    problem = models.CharField(max_length=50,null=True, blank=False, verbose_name='Problema')
    comment = models.TextField(null=True, verbose_name='Comentario')
    published = models.DateTimeField(verbose_name="Fecha de publicacion", auto_now_add=True)

    class Meta():
        verbose_name = "Complaint"
        verbose_name_plural = "Complaints"


    def __str__(self): 
        return self.accuser_user_id.get_full_name()


class Currency(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    sign= models.CharField(max_length=2, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Currency: {self.name}"

class Category(models.Model):
    category_name = models.CharField(max_length=60,blank=False,null=True)
    category_description = models.TextField(null=True, blank=False)
    category_icon_class = models.CharField(max_length=100,null=True, blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category_name
    
    class Meta():
        verbose_name= "Category"
        verbose_name_plural= "Categoríes"


class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    price = models.FloatField(null=True, blank=True, default=0)
    category_id = models.ForeignKey(Category, related_name='category_product', on_delete=models.CASCADE)
    user_id = models.ForeignKey(Account, related_name='user_owner', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Product: {self.name}"

class Image_Product(models.Model):
    images_id = models.ForeignKey(Image, related_name='image_route', on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, related_name='products_images', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.images_id)+ "    " + str(self.product_id)

class Status(models.Model):
    description = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Status of Order: {self.description}"

class Shipping_method(models.Model):
    method_description = models.CharField(max_length=200)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Shipping method: {self.method_description}"

class Payment_method(models.Model):
    description = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


class Order(models.Model):
    status_id = models.ForeignKey(Status, related_name='status_order', on_delete=models.CASCADE)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    isv = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    direction_id = models.ForeignKey(Direction, related_name='direction_order', on_delete= models.CASCADE)


class Product_order(models.Model):
    product_id = models.ForeignKey(Product, related_name='products', on_delete=models.CASCADE)
    order_id = models.ForeignKey(Order, related_name='orders', on_delete=models.CASCADE)

class Payment_data(models.Model):
    username = models.CharField(max_length=200)
    credit_card_number = models.BigIntegerField()
    expiration_date = models.DateTimeField(auto_now=True)
    cvv = models.IntegerField()
    payment_method_id = models.ForeignKey(Payment_method, related_name='Payment_method', on_delete=models.CASCADE)
    user_id = models.ForeignKey(Account, related_name='user_payment_data', on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

class Action(models.Model):
    crud_type = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

class Log(models.Model):
    description = models.CharField(max_length=250)
    user_id = models.ForeignKey(Account, related_name='user_log', on_delete=models.CASCADE)
    action_id = models.ForeignKey(Action, related_name='action_log', on_delete=models.CASCADE)


class Sells(models.Model):
    seller_user_id = models.ForeignKey(Account, related_name="evaluated_user_id", null=True, on_delete=models.CASCADE, verbose_name='Vendedor')
    costumer_user_id = models.ForeignKey(Account, related_name="evaluator_user_id", on_delete=models.CASCADE, verbose_name='Comprador')
    product_id = models.ForeignKey(Product,related_name="product", on_delete= models.CASCADE,verbose_name="Producto")
    date = models.DateTimeField(auto_now_add=True)

    class Meta():
        verbose_name= "sells"
        verbose_name_plural= "sells"

#muestra los usuarios que fueron evaluados 
    def __str__(self):

        if self.evaluated_user_id is None:
            return self.seller_user_id.get_full_name()
        else:
            return self.seller_user_id.get_full_name()+' sell ' +' to '+ self.costumer_user_id.get_full_name()

