# todo.urls.py

from django.urls import path

from todo import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')
