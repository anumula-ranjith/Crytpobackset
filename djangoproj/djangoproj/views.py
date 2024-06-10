import os
from django.http import JsonResponse
from django.views import View

class FileNameView(View):
    def get(self, request):
        # directory = r"C:\Users\ranjith.a\Downloads\Output_graphs\Output_graphs"
        directory = r"I:\Crypto_Backtest\Output_Graphs"
        filenames = [f for f in os.listdir(directory) if f.endswith('.html')]
        dropdown_options = [{'name': f.split('-')[0], 'path': os.path.join(directory, f)} for f in filenames]
        return JsonResponse({'dropdown_options': dropdown_options})
