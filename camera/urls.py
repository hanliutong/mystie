from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cube', views.cube, name='cube'),
    path('initState', views.initState, name='initState'),
    path('testset', views.testset, name='testset'),
    path('verify', views.verify, name='verify'),
    path('color', views.color, name='color'),
    path('cube2arr', views.cube2arr, name='cube2arr'),
]