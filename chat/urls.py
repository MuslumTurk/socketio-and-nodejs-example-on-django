from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^chat/$', views.chat_index, name='chat_index'),
    url(r'^$', views.chat_login, name='chat_login'),
    url(r'^save_message/$', views.save_message, name='chat_save_message'),
]