from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from .views import registro_view, logout_view, LoginAuthToken, DirectionGenericView, AccountGenericView, ImageGenericView, FollowGenericView, SellsGenericView, ComplaintsGenericView, CurrencyGenericView, CategoryGenericView, ProductGenericView, Image_productGenericView, StatusGenericView, ShipingGenericView, Payment_MethodGenericView, Payment_dataGenericView, OrderGenericView, Product_orderGenericView, LogGenericView, ActionGenericView, AllProductGenericView, AllImage_productGenericView

router = DefaultRouter()
router.register('direction', DirectionGenericView, basename='direction')
router.register('account', AccountGenericView, basename='account')
router.register('image', ImageGenericView, basename='image')
router.register('followers', FollowGenericView, basename='follower')
router.register('sells', SellsGenericView, basename='sells')
router.register('complaints', ComplaintsGenericView, basename='complaints')
router.register('currency', CurrencyGenericView, basename='currency')
router.register('category', CategoryGenericView, basename='category')
router.register('all_products', AllProductGenericView, basename='all_products')
router.register('product', ProductGenericView, basename='product')
router.register('product_image', Image_productGenericView, basename='product_images')
router.register('all_product_images', AllImage_productGenericView, basename='product_image')
router.register('status', StatusGenericView, basename='status')
router.register('shiping', ShipingGenericView, basename='shiping')
router.register('order', OrderGenericView, basename='order')
router.register('product_order', Product_orderGenericView, basename='product_order')
router.register('action', ActionGenericView, basename='action')
router.register('log', LogGenericView, basename='log')

#Autenticacion de usuario
urlpatterns = [
    path('auth/register', registro_view, name='register'),
    path('auth/login', LoginAuthToken.as_view(), name='login'),
    path('auth/logout', logout_view, name='logout'),
]

urlpatterns += [
    path('viewset/', include(router.urls)),
]




