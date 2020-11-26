function show(x)
{
    var y=document.querySelector("#"+x)
    var showPicture = document.querySelector("#show_"+x);
    var files = y.files,
                file;
    if (files && files.length > 0) {
        file = files[0];
        try {
                var URL = window.URL || window.webkitURL;
                var imgURL = URL.createObjectURL(file);

                showPicture.src = imgURL;
                showPicture.onload = function() {
                showPicture.height = 0.9 * showPicture.height*(window.innerWidth/showPicture.width);
                showPicture.width = 0.9 * window.innerWidth ;
                URL.revokeObjectURL(imgURL);
            };
        }
        catch (e) {
            try {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    showPicture.src = event.target.result;
                };
                fileReader.readAsDataURL(file);
            }
            catch (e) {
                var error = document.querySelector("#error");
                if (error) {
                    error.innerHTML = "Neither createObjectURL or FileReader are supported";
                }
            }
        }
    }
}