from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('add',views.addOrder,name="order_add"),
    path('<str:id>/',views.getOrderById,name="order_get_by_id"),
    path('<str:id>/pay/',views.updateOrderToPaid,name="update_order_to_paid"),
    path('list',views.getOrdersByUser,name="order_get_by_user"),
    path('admin/list',views.getOrders,name="order_get_by_admin"),
    path('<str:id>/deliver/',views.updateOrderToDelivered,name="update_order_to_delivered"),
]