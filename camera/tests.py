from django.test import TestCase, Client
from django.urls import resolve
from django.http import HttpRequest
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.chrome.options import Options
import camera.cube2arr as cube2arr
import os

# Create your tests here.
# class verifyTest(StaticLiveServerTestCase):
#     @classmethod
#     def setUpClass(cls):
#         super().setUpClass()
#         chrome_options = Options()
#         chrome_options.add_argument('--no-sandbox')
#         chrome_options.add_argument('--disable-dev-shm-usage')
#         chrome_options.add_argument('--headless')
#         cls.selenium = WebDriver(chrome_options=chrome_options)
#         cls.selenium.implicitly_wait(10)

#     @classmethod
#     def tearDownClass(cls):
#         cls.selenium.quit()
#         super().tearDownClass()

#     def test_verify(self):
#         self.selenium.get('http://39.97.212.230:8080/testset')
#         input = self.selenium.find_element_by_id("verify_str")
#         input.clear()
#         input.send_keys("[8,7,6,5,4,3,2,1,0,11,14,17,10,13,16,9,12,15,38,41,44,19,22,25,18,21,24,47,50,53,28,31,34,27,30,33,42,39,36,43,40,37,35,32,29,20,23,26,46,49,52,45,48,51]");
#         self.selenium.find_element_by_id("submit").click()
#         self.assertIn('<div id="ans">passed</div>', self.selenium.page_source)

class Cube2arrTest(TestCase):
    def test_solve(self):
        path = 'camera/testset/' #测试集文件夹
        files= os.listdir(path)
        for file in files: #遍历文件夹
            if not os.path.isdir(file): #判断是否是文件夹，不是文件夹才打开
                date = cube2arr.readTestSet(path+file)
                self.assertTrue((date['ans'] == cube2arr.solve(date)))
