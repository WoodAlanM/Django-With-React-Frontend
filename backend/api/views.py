from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UserSerializer, RecipeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Recipe

class RecipeListCreate(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    # Override to authenticated user recipes
    def get_queryset(self):
        user = self.request.user
        return Recipe.objects.filter(author=user)
    
    # Override for manually adding author
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class RecipeDelete(generics.DestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    # Override to authenticated user recipes
    def get_queryset(self):
        user = self.request.user
        return Recipe.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class GetUserView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"username": self.request.user.username})