import pandas as pd

# rawData = pd.read_csv("crimeData.csv")
# df = pd.DataFrame(rawData)
# # print (incidentType)
# # print (df.parent_incident_type.nunique())
# type_remove = ["Alarm", "Community Policing", "Death", "Disorder", "Family Offense", "Fire", "Liquor", "Missing Person", "Other", "Pedestrian Stop", "Vehicle Recovery"]
# for rows in type_remove:
#     df = df[df.parent_incident_type!= rows]

# incidentType = df.parent_incident_type.unique()

# col_remove = ["case_number","incident_description","incident_type_primary", "clearance_type","address_1","address_2","city","state","zip","country","created_at","updated_at","location","hour_of_day","day_of_week"]

# for col in col_remove:
#     df = df.drop(col, 1)

# for inType in incidentType:
#     typeData = df.loc[df['parent_incident_type'] == inType]
#     # print (typeData)
#     print(inType)
#     # print (typeData.incident_type_primary.unique())
#     typeData = typeData.drop("parent_incident_type", 1)
#     typeData.to_csv (inType + '.csv', index = None, header=True)

trafficDF = pd.DataFrame(pd.read_csv("Traffic.csv"))
cutTrafficDf = trafficDF[~trafficDF.incident_type_primary.str.contains("PARKING VIOLATION")]
cutTrafficDF = trafficDF.drop("incident_type_primary")
cutTrafficDf.to_csv ('cutTraffic.csv', index = None, header=True)

parkingDF = trafficDF.loc[trafficDF['incident_type_primary'] == 'PARKING VIOLATION']
parkingDF = trafficDF.drop("incident_type_primary")
parkingDF.to_csv("Parking Violations.csv", index = None, header = True)
print (trafficDF.incident_type_primary.unique())
print (trafficDF.incident_type_primary.nunique())





