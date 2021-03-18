from django.shortcuts import render
from django.http import JsonResponse
#use for rendering native Python datatypes into JSON content type.  
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.hashers import make_password
from rest_framework import status

from base.models import Order,OrderItem,ShippingAddress, Product
from base.serializers import OrderSerializer   
from datetime import datetime 


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    #return a customized error message
    if orderItems and len(orderItems) == 0:
        message = {'detail': 'No items in the order'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST) 

    else: 
        if data['ispaid'] == 'now':
            paidTime = datetime.now()
            paid = True
        else:
            paid = False
            paidTime = None

        #create order
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            itemsPrice = data['itemsPrice'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],       
            totalPrice = data['totalPrice'],
            isPaid = paid,
            paidAt = paidTime
        ) 
        #create shipping address
        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shipping']['address'],
            city = data['shipping']['city'],
            postalCode = data['shipping']['postcode'],
            province = data['shipping']['province']
        )
        #create order items
        for i in orderItems:
            product = Product.objects.get(_id = i['_id'])

            item = OrderItem.objects.create(
                order = order,
                product = product,
                name = product.name,
                qty = i['qty'],
                price = product.price,
                image = i['image']
            )

            #update product stock. Product is a ForeignKey field 
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,id):
    user = request.user

    try:
        #if the query fails, run except    
        order = Order.objects.get(_id = id)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order,many=False)
            
            return Response(serializer.data)
        else:
            message = {'detail': 'You have no anthorization for this order'}
            return Response(message, status = status.HTTP_400_BAD_REQUEST)  
    except:
        return Response({'detail': 'Order not exists'}, status = status.HTTP_400_BAD_REQUEST) 

        
@api_view(['PUT'])
@permission_classes([IsAuthenticated])        
def updateOrderToPaid(request,id):
    #no need to verify if the user is the one who created the order. We have already verified in getOrderBtId
    data = request.data
    order = Order.objects.get(_id = id)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('payment success')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrdersByUser(request):
    requestUser = request.user
    
    try:
        #if the query fails, run except    
        orders = Order.objects.filter(user = requestUser)
        serializer = OrderSerializer(orders,many=True)
        return Response(serializer.data)

    except:
        return Response({'detail': 'You have not made any order'}, status = status.HTTP_400_BAD_REQUEST) 


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])        
def updateOrderToDelivered(request,id):
    order = Order.objects.get(_id = id)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response('delivered mark success')