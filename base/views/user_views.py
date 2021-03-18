from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import UserSerializerWithToken,UserSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

#user login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        #returns "No active account found with the given credentials" as default validation error message
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            username = data['username'],
            email = data['email'],
            first_name = data['first_name'],
            password = make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user,many=False)
        return Response(serializer.data)

    except:
        message = {'detail':'User with this email already exists'}
        return Response(message, status= status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    #many - If applied to a to-many relationship, you should set this argument to True.
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


#we want to get a new token to put into local storage  
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    #many - If applied to a to-many relationship, you should set this argument to True.
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.email = data['email']
    user.username = data['username']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()    

    return Response(serializer.data)


#Admin manages users
#only allow admin user to get all authenticated users data 
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,id):
    usertoDelete = User.objects.get(id = id)
    usertoDelete.delete()
    return Response('user deleted')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request,id):
    try:
        user = User.objects.get(id = id)
        serializer = UserSerializer(user, many=False)            
        return Response(serializer.data)

    except:
        return Response({'detail': 'User does not exist'}, status = status.HTTP_400_BAD_REQUEST) 


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUserDetailById(request,id):
    user = User.objects.get(id = id)
    data = request.data

    user.first_name = data['name']
    user.email = data['email']
    user.username = data['username']
    user.is_staff = data['is_staff']
    user.save()    

    return Response('user updated')