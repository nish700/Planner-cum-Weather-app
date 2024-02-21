from django.contrib import admin
from .models import Planner

# Register your models here.
class PlannerAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed","loc","weather","date")

admin.site.register(Planner, PlannerAdmin)