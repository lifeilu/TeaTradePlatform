# import urllib2
from bs4 import BeautifulSoup
import requests

# response = urllib2.urlopen("http://product.edaocha.com/")
r = requests.get("http://product.edaocha.com/")
# print r.content
# m = response.read()
m = r.content
soup = BeautifulSoup(m)
price = soup.find(class_="expand")
# print (price.get_text())

# f = open('tea_1_all.txt', 'w+')
# f.write(str(soup))
# f.close()
#
# f = open('tea_price_table1.txt', 'w+')
# f.write(str(price))
# f.close()
# print(soup.prettify())

# print soup.prettify()
# print soup.title
# print soup.table
# print soup.div['class']
# print soup.body
# for child in soup.body.children:
#     print child
#
# f = open('tea_1_body.txt', 'w+')
#
# for child in soup.body:
#     f.writelines(child)
#     f.write('\n')
#     print child
# f.close()

# content_tag = soup.body

# soup.find_all('a')