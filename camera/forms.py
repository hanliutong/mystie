from django import forms

class NameForm(forms.Form):
    front = forms.ImageField(label="前面")
    right = forms.ImageField(label="右面")
    back = forms.ImageField(label="后面")
    left = forms.ImageField(label="左面")
    top = forms.ImageField(label="顶面")
    bottom = forms.ImageField(label="底面")
    
    front.widget.attrs['capture'] = "user"
    right.widget.attrs['capture'] = "user"
    back.widget.attrs['capture'] = "user"
    left.widget.attrs['capture'] = "user"
    top.widget.attrs['capture'] = "user"
    bottom.widget.attrs['capture'] = "user"

