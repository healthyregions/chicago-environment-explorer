# %%
import pandas as pd
import numpy as np
from datetime import datetime
from functools import reduce

# %%
def percentile(n):
    def percentile_(x):
        return np.percentile(x, n)
    percentile_.__name__ = 'percentile_%s' % n
    return percentile_


def getData():
    data = pd.read_csv("./sample_data.csv")[["MSRDeviceNbr", "ReadingDateTimeLocal", "CalibratedPM25"]]
    data['DATEOBJ'] = data['ReadingDateTimeLocal'].apply(lambda x: datetime.strptime(x, '%Y-%m-%d %H:%M:%S'))
    data['IS_WEEKEND'] = data['DATEOBJ'].apply(lambda x: x.dayofweek >= 5)
    return data.set_index('DATEOBJ')


def summarizeData(data, groupbyCol, analysisCol, prefix):
    summary = data.groupby(groupbyCol)[analysisCol].agg(["median", percentile(25), percentile(75), "std"]).reset_index()
    summary.columns = ['MSRDeviceNbr', f'{prefix}_median', f'{prefix}_q25', f'{prefix}_q75', f'{prefix}_stddev']
    return summary

def main():
    data = getData()

    rushHour = pd.concat([data.between_time("8:00", "10:00"), data.between_time("16:00", "18:00")])
    weekend = data[data.IS_WEEKEND == True]# %%
    weekday = data[data.IS_WEEKEND == False]

    summary = summarizeData(data,'MSRDeviceNbr','CalibratedPM25','topline')
    rushHour_summary = summarizeData(rushHour,'MSRDeviceNbr','CalibratedPM25','rushhour')
    weekend_summary = summarizeData(weekend,'MSRDeviceNbr','CalibratedPM25','weekend')
    weekday_summary = summarizeData(weekday,'MSRDeviceNbr','CalibratedPM25','weekday')

    geo = pd.read_csv("./sample_data.csv")[["MSRDeviceNbr", "Latitude", "Longitude"]].drop_duplicates()
    dataframes = [geo, summary, rushHour_summary, weekend_summary, weekday_summary]
    return {
        df: reduce(lambda  left,right: pd.merge(left,right,on=['MSRDeviceNbr'],
                                            how='inner'), dataframes),
        timestamp: data.ReadingDateTimeLocal.max()
    }
                        
# %%
if __name__ == "__main__":
    data = main()
    df = data.df
    timestamp = data.timestamp
    df.to_csv(f"data_summary_{timestamp}.csv", index=False)
# %%
