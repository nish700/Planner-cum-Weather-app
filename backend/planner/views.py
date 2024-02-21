from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PlannerSerializer
from .models import Planner

# Create your views here.

class PlannerView(viewsets.ModelViewSet):
    serializer_class = PlannerSerializer
    queryset = Planner.objects.all()
