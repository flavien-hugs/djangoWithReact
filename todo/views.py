# todo.views.py

from django.shortcuts import render

from rest_framework import viewsets

from todo import models, serializers

class TodoView(viewsets.ModelViewSet):
    serializer_class = serializers.TodoSerializer
    queryset = models.Todo.objects.order_by('-created_at')
