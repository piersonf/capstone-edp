import pickle as pkl
import sys



PICKLE_MODEL_DUMP = 'model_dump.pkl'

work_location, role = sys.argv[1:2+1]

# with open(PICKLE_MODEL_DUMP, 'rb') as f:
#     model = pkl.load(f)

raise Exception('Testing PythonShell failure')
print(f'Work Location: {work_location}, Role: {role}')