import pandas as pd
import numpy as np

inputFile = 'OldFlights.csv'
outputFile = 'Flights.csv'
df = pd.read_csv(inputFile)
df['ScheduledDate'] = pd.to_datetime(df['ScheduledDate'], format='%m/%d/%Y').dt.strftime('%Y-%m-%d')
df['Domestic'] = df['Domestic'].apply(lambda x: 1 if x == 'Domestic' else 0)
df['Arrival'] = df['Arrival'].apply(lambda x: 1 if x == 'Arrival' else 0)
df['TerminalNum'] = df['TerminalNum'].replace('Miscellaneous Terminal', np.nan)
df.to_csv(outputFile, index=False)