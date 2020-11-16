from django.shortcuts import render
from django.template import loader

# Create your views here.
from django.http import HttpResponse
from .forms import NameForm

def index(request):
    # 如果form通过POST方法发送数据
    if request.method == 'POST':
        # 接受request.POST参数构造form类的实例
        form = NameForm(request.POST)
        # 验证数据是否合法
        if form.is_valid():
            # 处理form.cleaned_data中的数据
            # ...
            # 重定向到一个新的URL
            return HttpResponseRedirect('/thanks/')

    # 如果是通过GET方法请求数据，返回一个空的表单
    else:
        form = NameForm()
    template = loader.get_template('camera/index.html')
    return HttpResponse(template.render( {'form': form},request))