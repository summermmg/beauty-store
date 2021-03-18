from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from base.models import Product, Review
from base.serializers import ProductSerializer

@api_view(['GET'])
def getProducts(request):
    #returns the vlaue of 'keyword'
    query = request.query_params.get('keyword')
    
    #if user didn't search, just get all products
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)
    #many - If applied to a to-many relationship, you should set this argument to True.
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

        
@api_view(['GET'])
def getProduct(request,id):
    product = Product.objects.get(_id = id)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,id):
    user = request.user
    product = Product.objects.get(_id = id)
    data = request.data

    if (data['rating']==0):
        message = {'detail': 'Please rate the product'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST) 
        
    else:
        review = Review.objects.create(
            user = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment']
        )

        #access the Manager(a collection of objects) of Review model(one to many relation) 
        #Gather all reviews for the selected product object 
        reviews = product.review_set.all()    
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total/len(reviews)
        product.save()    

        return Response('rating added')


#Admin
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,id):
    producttoDelete = Product.objects.get(_id = id)
    producttoDelete.delete()
    return Response('Product deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addProduct(request):
    user = request.user
    data = request.data
    imageUploaded = request.FILES.get('image')
    #create product
    product = Product.objects.create(
        user = user,
        name = data['name'],
        brand = data['brand'],
        category = data['category'],
        description = data['description'],
        price = data['price'],
        countInStock = data['countInStock'],
        rating = data['rating'],
        image = imageUploaded
    ) 

    return Response('product created')    


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProductDetailById(request,id):
    product = Product.objects.get(_id = id)
    data = request.data
    imageUploaded = request.FILES.get('image')

    product.name = data['name']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.price = data['price']
    product.countInStock = data['countInStock']
    if (imageUploaded != None):
        product.image = imageUploaded
        print(imageUploaded)

    product.save()    

    return Response('product updated')


