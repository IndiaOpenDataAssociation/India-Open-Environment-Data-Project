# Import modules
from bs4 import BeautifulSoup
import urllib2
import json
import requests

# Initial Data
FINAL = {}
temp = []

# Scrapper code
URL = 'http://www.cpcb.gov.in/CAAQM/frmCurrentDataNew.aspx?StationName=KTHM%20College&StateId=16&CityId=307'
req = requests.get(URL).text
soup = BeautifulSoup(req, "html.parser")

table = soup.find('table', {'id': 'tblMain'})

selected_table = table.find_all('table')[3].find_all('tr')[5]
all_rows = selected_table.find_all('tr')[1::]

for each in all_rows:
	each_record = each.find_all('td')
	comp_name = each_record[0].text

	try:
		comp_value = each_record[3].text
	except IndexError:
		pass

	if '*' not in comp_name:
		FINAL[comp_name] = comp_value

# Print final json data
print json.dumps(FINAL)
