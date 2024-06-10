# djangoproj/urls.py

from django.contrib import admin
from django.urls import path
from djangoproj.views import FileNameView  # Adjust import as per your app structure

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', index, name='index'),  # Serve the React app's index.html
    path('api/filenames/', FileNameView.as_view(), name='get_filenames'),  # API endpoint for filenames
]
