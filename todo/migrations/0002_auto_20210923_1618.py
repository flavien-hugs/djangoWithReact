# Generated by Django 3.2.7 on 2021-09-23 16:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='todo',
            name='title_task_name_idx',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='date_end',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='date_start',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='task',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='time_end',
        ),
        migrations.RemoveField(
            model_name='todo',
            name='time_start',
        ),
    ]
