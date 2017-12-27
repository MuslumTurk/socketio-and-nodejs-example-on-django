import json

from django.shortcuts import render
from .models import Message
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

def chat_index(request):
    name = "Undifined"
    if request.method == "POST":
        name = request.POST['nickname']
    if request.method == "GET":
        return HttpResponseRedirect('/')
    context = {
        'messages': Message.objects.all(),
        'name': name
    }
    return render(request, 'chat_index.html', context)

def chat_login(request):
    return render(request, 'chat_login.html')

@csrf_exempt
def save_message(request):
    if request.method == 'POST':
        msg_obj = json.loads(request.body.decode('utf-8'))

        try:
            msg = Message.objects.create(user_name=msg_obj['user_name'], message=msg_obj['message'])
            msg.save()
        except:
            print("error saving message")
            return HttpResponse("error")

        return HttpResponse("success")

    else:
        return HttpResponseRedirect('/')
