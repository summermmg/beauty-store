from django.urls import path
from base.views import user_views as views

urlpatterns = [    
    path('register',views.registerUser,name="user_register"),
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile',views.getUserProfile,name="users_profile"),
    path('profile/update',views.updateUserProfile,name="users_profile_update"),
    #Admin
    path('',views.getUsers,name="users"),
    path('delete/<str:id>/',views.deleteUser,name="user_delete"),
    path('<str:id>/',views.getUserById,name="user_get_by_id"),
    path('<str:id>/update/',views.updateUserDetailById,name="user_update_by_id"),
]