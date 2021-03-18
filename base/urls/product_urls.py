from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('',views.getProducts,name="products"),
    path('<str:id>/',views.getProduct,name="product"),
    path('<str:id>/review/',views.createProductReview,name="product_review"),
    path('delete/<str:id>/',views.deleteProduct,name="product_delete"),
    path('add',views.addProduct,name="product_add"),
    path('<str:id>/update/',views.updateProductDetailById,name="product_update_by_id"),    
]