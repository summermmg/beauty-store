from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress, Review
from rest_framework_simplejwt.tokens import RefreshToken

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


#access the Manager(a collection of objects) of Review model 
class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

    #We want combine reviews in our getProducts/getProduct request 
    # such that we can access reviews in frontend by fetch products data    
    def get_reviews(self,obj):
        reviews = obj.review_set.all() 
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data



#When user login from client (visit api-token-auth and get the 
# token), return just token, without user id, So I have to get 
# user info again. In this case, add few other attrs that can be
# used in frontend without having to decoding.
class UserSerializer(serializers.ModelSerializer):
    _id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','_id','username','email','is_staff','first_name']

    def get__id(self,obj):
        _id = obj.id
        return _id

 

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id','username','email','is_staff','first_name','token']

    #Returns an authorization token for the given user that will be provided after authenticating the user's credentials.
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'



class OrderSerializer(serializers.ModelSerializer):
    orderitems = serializers.SerializerMethodField(read_only=True)
    shipping = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    date = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderitems(self,obj):
        #access the Manager(a collection of objects) of OrderItem model 
        items = obj.orderitem_set.all() 
        serializer = OrderItemSerializer(items,many=True)
        return serializer.data

    def get_shipping(self,obj):
        #access the Manager(a single object) of ShippingAddress model 
        shipping = obj.shippingaddress
        serializer = ShippingAddressSerializer(shipping,many=False)
        return serializer.data    

    def get_user(self,obj):
        user = obj.user
        serializer = UserSerializer(user,many=False)
        return serializer.data  

    def get_date(self,obj):
        date = obj.createdAt.date()
        return date