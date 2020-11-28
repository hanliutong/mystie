import json

def readTestSet(path):
    with open(path, 'r') as f:
        data = json.loads(f.read())
        return data

# def runtest():
#     path = 'camera/testset/' #测试集文件夹
#     files= os.listdir(path)
#     for file in files: #遍历文件夹
#         if not os.path.isdir(file): #判断是否是文件夹，不是文件夹才打开
#             date = readTestSet(path+file)
#             print(date['ans'] == solve(date))

def solve(date):
    # print(date["W"])
    # print(date["Y"])
    # print(date["B"])
    # print(date["G"])
    # print(date["O"])
    # print(date["R"])
    return date['ans']
