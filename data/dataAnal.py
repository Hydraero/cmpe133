import pandas as pd

rawData = pd.read_csv("crimeData.csv")
df = pd.DataFrame(rawData)
incidentType = df.parent_incident_type.unique()
print (incidentType)
print (df.parent_incident_type.nunique())

# sexualAssault = df.loc[df['parent_incident_type'] == 'Sexual Assault']

for inType in incidentType:
    typeData = df.loc[df['parent_incident_type'] == inType]
    print (typeData)
    typeData.to_csv (inType + '.csv', index = None, header=True)



