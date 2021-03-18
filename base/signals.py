from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender,instance,**kwargs):
    user = instance  #The actual instance being saved.
    if user.email != '':
        user.username = user.email
        print('signal fired')

pre_save.connect(updateUser,sender=User)  #sender: The model class.

