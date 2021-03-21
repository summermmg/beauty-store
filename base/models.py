from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    #a many-to-one relationship. Do not delete product when the parent user was deleted. User is required when creating the product.
    user = models.ForeignKey(User, on_delete=models.SET_NULL,null=True) 
    name = models.CharField(max_length=150, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/sample.jpg')
    brand = models.CharField(max_length=150, null=True, blank=True)
    category = models.CharField(max_length=150, null=True, blank=True)
    size = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7,decimal_places=2) 
    likes = models.IntegerField(null=True, blank=True, default=0)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7,decimal_places=2)
    countInStock = models.IntegerField(null=True, blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.name        


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL,null=True) 
    user = models.ForeignKey(User, on_delete=models.SET_NULL,null=True) 
    name = models.CharField(max_length=150, null=True, blank=True)
    rating = models.DecimalField(max_digits=7,decimal_places=2)
    comment = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True,editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    _id = models.AutoField(primary_key=True,editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL,null=True) 
    paymentMethod = models.CharField(max_length=150, null=True, blank=True)
    itemsPrice =  models.DecimalField(max_digits=7,decimal_places=2, null=True)
    taxPrice = models.DecimalField(max_digits=7,decimal_places=2)
    shippingPrice = models.DecimalField(max_digits=7,decimal_places=2)
    totalPrice = models.DecimalField(max_digits=7,decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    #we want manually update the date&time when the order is actually paid
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    _id = models.AutoField(primary_key=True,editable=False)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL,null=True) 
    product = models.ForeignKey(Product, on_delete=models.SET_NULL,null=True) 
    name = models.CharField(max_length=150, null=True, blank=True)
    qty = models.IntegerField(default=0, null=True, blank=True)
    price = models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True)
    image =  models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return self.name

class ShippingAddress(models.Model):
    _id = models.AutoField(primary_key=True,editable=False)
    order = models.OneToOneField(Order, on_delete=models.SET_NULL,null=True) 
    address = models.CharField(max_length=150, null=True, blank=True)
    city = models.CharField(max_length=150, null=True, blank=True)
    postalCode = models.CharField(max_length=150, null=True, blank=True)
    province = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return self.address
        