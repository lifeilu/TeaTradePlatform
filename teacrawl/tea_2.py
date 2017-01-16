import re
import requests
from bs4 import BeautifulSoup

r = requests.get('http://www.tea26.com/quote/price-htm-itemid-1.html')
data = r.text
link_list =re.findall(r"(?<=href=\").+?(?=\")|(?<=href=\').+?(?=\')", data)
# link_list = re.findall(r"<a.*?href=.*?<\/a>", data, re.I|re.S|re.M)
# link_list = re.findall(r"[a-zA-z]+://[^\s]*", data)
f1 = open('tea_url2.txt', 'w+')
for url in link_list:
    matchObj = re.match(r'^http.*$', url, re.M | re.I)
    if not matchObj:
        pass
    else:
        print url
        f1.writelines(str(url))
        f1.write('\n')
f1.close()
#
#
# soup = BeautifulSoup(data)
# price = soup.find(class_="price_box")
# print price
#
# f2 = open('tea_price1.txt', 'w+')
# f2.write(str(price))
# f2.close()