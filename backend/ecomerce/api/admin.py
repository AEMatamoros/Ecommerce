from django.contrib import admin
from .models import Account, Direction,Image,Followers, Puntuation, Complaints, Currency, Category,Product,Image_Product, Status, Shipping_method,Payment_data,Order,Product_order,Log
# Register your models here.
admin.site.register(Account)
admin.site.register(Direction)
admin.site.register(Image)
admin.site.register(Followers)
admin.site.register(Puntuation)
admin.site.register(Complaints)
admin.site.register(Currency)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Image_Product)
admin.site.register(Status)
admin.site.register(Shipping_method)
admin.site.register(Payment_data)
admin.site.register(Order)
admin.site.register(Product_order)
admin.site.register(Log)


