# todo.admin.py

from django.contrib import admin

from todo.models import Todo


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'description',
        'completed'
    ]

    fields = [
        'title', 'description',
        'completed'
    ]
