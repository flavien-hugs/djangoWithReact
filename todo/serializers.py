# todo.searializers.py

from django.conf import settings
from rest_framework import serializers

from todo.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    """
    A serializer is a component that converts
    Django models into JSON objects and vice versa.
    """
    
    class Meta:
        model = Todo
        exclude = ['created_at']
