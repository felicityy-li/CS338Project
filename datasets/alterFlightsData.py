import pandas as pd
import numpy as np

cargo_df = pd.read_csv('./Cargo.csv')
plane_df = pd.read_csv('./Plane.csv')

# Check for PlaneIds in Cargo that do not exist in Plane
invalid_plane_ids = cargo_df[~cargo_df['PlaneId'].isin(plane_df['PlaneId'])]

# Display the invalid PlaneIds
print(invalid_plane_ids)