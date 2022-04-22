#%%
import asyncio
import aiohttp
import time
from datetime import date, timedelta
import requests
import pandas as pd
import os
API_KEY = os.getenv('MS_API_KEY')
#%%
def getDays():
    one_day = timedelta(days=1)
    current_day = date.today() - one_day
    days = []
    for i in range(0, 7):
        days.append((current_day - one_day * i).strftime("%Y-%m-%d"))
    return days

def getDeviceList():
    response = requests.get(f"https://eclipsepublicapi.azurewebsites.net/EclipseData/GetDeviceList?DeploymentName=Chicago&API_KEY={API_KEY}")
    responseJson = response.json()
    return [r['MSRDeviceNbr'] for r in responseJson]

def generateUrls():
    days = getDays()
    devices = getDeviceList()
    urls = []
    for day in days:
        for device in devices:
            urls.append(f"https://eclipsepublicapi.azurewebsites.net/EclipseData/GetReadings?API_KEY={API_KEY}&DeviceSubset={device}&DeploymentName=Chicago&BeginDateTime={day} 00:00:00&EndDateTime={day} 23:59:59")
    return urls


async def get(url, session):
    try:
        async with session.get(url=url) as response:
            return await response.json()
    except Exception as e:
        print(f"Unable to get url {url} due to {repr(e)}.")

async def gather_with_concurrency(n, *tasks):
    semaphore = asyncio.Semaphore(n)
    async def sem_task(task):
        async with semaphore:
            return await task
    return await asyncio.gather(*(sem_task(task) for task in tasks))

async def main():
    urls = generateUrls()
    print("Generated {} urls.".format(len(urls)))
    async with aiohttp.ClientSession() as session:
        ret = await gather_with_concurrency(10, *[get(url, session) for url in urls])
    return ret
# %%
if __name__ == "__main__":
    data = await doFetch()
    flat_data = [item for sublist in data for item in sublist]
    filtered_data = [row for row in flat_data if type(row) == dict]
    df = pd.DataFrame(filtered_data)
    df.to_csv("ms_aq_data.csv", index=False)