import os

def generatorToArray(generator):
	temp = []
	for i in generator:
		temp.append(i)
	return temp

original = "breed"
desired = "state"

listFiles = generatorToArray(os.walk("."))

#print("DEBUG Lista total" + str(listFiles))

#Priner Nivel
for i in listFiles[0][2]:
	if i != "changeFilenames.py":
		print(i)
		os.rename(i,i.replace(original,desired))
		"""
		
		os.rename(i,i.replace(original.title(),desired.title()))
"""


"""
for i in listFiles[0][1]:
	files = generatorToArray(os.walk("./" + i))
	for j in files:
		os.rename("./" + i + "/" + j[2][0], "./" + i + "/" + j[2][0].replace(original,desired))
		os.rename("./" + i + "/" + j[2][0], "./" + i + "/" + j[2][0].replace(original.title(),desired.title()))
"""