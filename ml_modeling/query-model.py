import pickle as pkl


PICKLE_MODEL_DUMP = 'model_dump.pkl'

with open(PICKLE_MODEL_DUMP, 'rb') as f:
    model = pkl.load(f)

