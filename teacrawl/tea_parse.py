from bs4 import BeautifulSoup
import sys

reload(sys)
sys.setdefaultencoding('utf-8')
soup = BeautifulSoup(open("data/12.14/tea_12.14_blc.txt"))
print(soup.get_text())
f2 = open("test.txt", 'w+')
f2.write(soup.get_text())
f2.close()
