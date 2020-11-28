from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cube', views.cube, name='cube'),
    path('initState', views.initState, name='initState'),
    path('testset', views.testset, name='testset'),
    path('verify', views.verify, name='verify'),
]