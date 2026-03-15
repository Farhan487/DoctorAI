from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib

app = FastAPI()

# Allow react frontend to tlak to this backend 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Load the model and data

model = joblib.load('models//disease_model.pkl')
all_symptoms = joblib.load('models/symptoms_list.pkl')

desc_df = pd.read_csv('data/symptom_Description.csv')
prec_df = pd.read_csv('data/symptom_precaution.csv')


desc_df.columns = desc_df.columns.str.strip()
prec_df.columns = prec_df.columns.str.strip()
desc_df['Disease'] = desc_df['Disease'].str.strip()
prec_df['Disease'] = prec_df['Disease'].str.strip()


# ------------Helper-----------------------

def get_disease_info(disease_name):
    disease_name = disease_name.strip()

    desc_row = desc_df[desc_df['Disease'] == disease_name]
    description = desc_row['Description'].values[0] if len(desc_row) > 0 else "No Description  Available"

    prec_row = prec_df[prec_df['Disease'] == disease_name]
    if len(prec_row) > 0:
        precautions = [
        prec_row['Precaution_1'].values[0],
        prec_row['Precaution_2'].values[0],
        prec_row['Precaution_3'].values[0],
        prec_row['Precaution_4'].values[0],

    ]
        precautions = [p for p in precautions if pd.notna(p)]
    else:
        precautions = ["Consult a doctor immediately."]

    return description, precautions


# ── Routes ───────────────────────────────────────────────────────
class SymptomsInput(BaseModel): 
    symptoms: list[str]


@app.get("/")                         
def root():                           
    return {"status": "AI Doctor API is running!"}


@app.get("/symptoms")
def get_symptoms():
    return {"symptoms": all_symptoms}


@app.post("/predict")
def predict_disease(data: SymptomsInput): 
    test_input = dict.fromkeys(all_symptoms, 0)
    for s in data.symptoms:
        if s in test_input:
            test_input[s] = 1

    input_df = pd.DataFrame([test_input])
    probabilities = model.predict_proba(input_df)[0]
    top3_idx = np.argsort(probabilities)[-3:][::-1]

    results = []
    for i in top3_idx:
        disease = model.classes_[i]   # fixed: modle → model
        confidence = round(float(probabilities[i]) * 100, 2)
        description, precautions = get_disease_info(disease)
        results.append({
            "disease": disease,
            "confidence": confidence,
            "description": description,
            "precautions": precautions
        })

    return {"results": results}