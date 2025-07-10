import pickle as pkl
import sys
import pandas as pd


PICKLE_MODEL_DUMP = '../ml_modeling/model_dump.pkl'
PICKLE_ENCODER_DUMP = '../ml_modeling/encoder_dump.pkl'

_, work_location, role = sys.argv

# work_location = '...'
# role = 'Product '...'
# used for testing when running the file directly!

with open(PICKLE_MODEL_DUMP, 'rb') as f:
    model = pkl.load(f)

with open(PICKLE_ENCODER_DUMP, 'rb') as f:
    encoder = pkl.load(f)


features_df = pd.DataFrame({'role' : [role], 'work_location' : [work_location] })
X_encoded = encoder.transform(features_df)
X_encoded = pd.DataFrame(X_encoded)
predicted_salary = model.predict(X_encoded)[0]


print(f"{predicted_salary:.2f}")
