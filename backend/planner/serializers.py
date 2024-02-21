from rest_framework import serializers
from .models import Planner

class PlannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planner
        fields = ('id','title', 'description','completed','loc','weather','date')