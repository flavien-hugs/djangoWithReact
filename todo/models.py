# todo.models.py

import uuid
from django.db import models


class Todo(models.Model):

    uuid = models.UUIDField(
        db_index=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name='id'
    )
    title = models.CharField(
        verbose_name="tâche", max_length=100,
        help_text="Que faut-il faire ?"
    )
    description = models.TextField(
        verbose_name="décrire votre tâche",
        max_length=180,
        help_text="ajouter une description à la tâche",
    )
    completed = models.BooleanField(
        verbose_name="tâche terminée",
        default=False
    )
    created_at = models.DateTimeField(
        verbose_name='created at',
        auto_now_add=True, auto_now=False
    )
        
    class Meta:
        db_table = 'db_todo'
        ordering = ['-created_at']
        get_latest_by = ['-created_at']
        verbose_name_plural = 'todo'
        indexes = [
            models.Index(
                fields=['id', 'uuid'],
                name='id_index_todo'
            ),
        ]

    def __str_(self):
        return self.title
