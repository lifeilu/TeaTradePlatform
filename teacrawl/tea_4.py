import re
import requests
from bs4 import BeautifulSoup
import sys


def get_url_of_page(current_url):
    r = requests.get(current_url)
    data = r.content
    if not data:
        return
    # link_list = re.findall(r"(?<=href=\").+?(?=\")|(?<=href=\').+?(?=\')", data)
    link_list = re.findall(r"<a.*?href=.*?< \ /a>",data, re.I|re.S|re.M)
    return link_list


def get_price_table(current_url, file_name):
    r = requests.get(current_url)
    # data = r.text
    data = r.content
    # soup = BeautifulSoup(data)
    soup = BeautifulSoup(data, 'html.parser')
    price = soup.findAll('div', {'class': 'expand'})
    # price = soup.find(class_="expand")
    # print (price.get_text())
    # msg = price.get_text()
    # print msg
    f2 = open(file_name, 'w+')
    for msg in price:
        print msg.get_text()
        f2.write(msg.get_text())
    f2.close()


def spider(start_url, file_name, times):
    reload(sys)
    sys.setdefaultencoding('utf-8')
    urls = []
    urls.append(start_url)
    i = 0
    while 1:
        if i > times:
            break
        if len(urls) > 0:
            url = urls.pop(0)
            url_match = re.match(r'^http', url, re.M | re.I)
            if not url_match:
                pass
            else:
                print url, len(urls)
                get_price_table(url, file_name)
                i = i + 1
                if len(urls) < times:
                    url_list = get_url_of_page(url)
                    for url in url_list:
                        if urls.count(url) == 0:
                            urls.append(url)
        else:
            break
    return 1

spider("http://product.edaocha.com/", "data/12.26/tea2_12.26.txt", 10000)


