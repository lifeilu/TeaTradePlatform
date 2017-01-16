import re
import requests
from bs4 import BeautifulSoup
import sys


def get_url_of_page(current_url):
    r = requests.get(current_url)
    data = r.text
    if not data:
        return
    # link_list = re.findall(r"(?<=href=\").+?(?=\")|(?<=href=\').+?(?=\')", data)
    link_list = re.findall(r"<a.*?href=.*?< \ /a>",data, re.I|re.S|re.M)
    return link_list


def get_price_table(current_url, file_name):
    r = requests.get(current_url)
    data = r.text
    soup = BeautifulSoup(data)
    price = soup.find(class_="price_box")
    # print price
    msg = price.get_text()
    print msg
    f2 = open(file_name, 'w+')
    f2.write(msg)
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

spider("http://www.tea26.com/quote/price-htm-itemid-1.html", "data/12.26/tea_12.26_tgy.txt", 100000)
spider("http://www.tea26.com/quote/price-htm-itemid-145.html", "data/12.26/tea_12.26_puer.txt", 100000)
spider("http://www.tea26.com/quote/price-htm-itemid-76.html", "data/12.26/tea_12.26_blc.txt", 100000)
spider("http://www.tea26.com/quote/price-htm-itemid-108.html", "data/12.26/tea_12.26_xhlj.txt", 100000)

# spider("http://www.tea26.com/quote/price-htm-itemid-1.html", 100000)


