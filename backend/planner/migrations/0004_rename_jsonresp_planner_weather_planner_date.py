# Generated by Django 4.2.10 on 2024-02-20 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0003_alter_planner_jsonresp'),
    ]

    operations = [
        migrations.RenameField(
            model_name='planner',
            old_name='jsonresp',
            new_name='weather',
        ),
        migrations.AddField(
            model_name='planner',
            name='date',
            field=models.TextField(default='', max_length=100),
        ),
    ]
