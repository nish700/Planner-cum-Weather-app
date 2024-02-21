from django.db import models

# Create your models here.
class Planner(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    loc = models.CharField(max_length=120)
    weather = models.TextField(max_length=200, default="")
    date = models.TextField(max_length=100, default="")

    def _str_(self):
        return self.title



