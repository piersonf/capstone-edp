import random
from datetime import datetime, timedelta
import json
from faker import Faker

NUM_ROWS = 2000
faker = Faker(locale='en_US')
random.seed(42)  # For reproducibility
faker.seed_instance(42)  # For reproducibility

# role name : median salary
ROLES = {
    "Software Engineer":90000,
    "Data Scientist":95000,
    "Product Manager":75000,
    "Sales Executive":100000,
    "HR Manager":70000,
    "Marketing Specialist":65000,
    "Customer Support":50000
}

LOCATIONS = [
    "New York",
    "Hartford",
    "Chicago",
    "St. Paul"
]

def generate_employee_data():
    data_rows = []
    for i in range(NUM_ROWS):
        # Generate random values for each column
        employee_id = i+1
        name = faker.name()
        phone = faker.phone_number()
        role = random.choice(list(ROLES.keys()))
        work_location = random.choice(LOCATIONS)
        # start_date = datetime.now() - timedelta(days=random.randint(0, 365))
        salary = ROLES[role] + (random.randint(-3, 6) * 5000)
        manager_id = random.randint(1, NUM_ROWS)
        while manager_id == employee_id:
            manager_id = random.randint(1, NUM_ROWS)
        # starts as [employee_id] to trigger while loop
        manages = [employee_id]
        # use random.sample() to ensure sampling without replacement
        while (employee_id in manages) or (manager_id in manages):
            manages = random.sample(range(1, NUM_ROWS + 1), random.randint(0, 3))

        # Create the data row
        data_row = {
            "id": employee_id,
            "name": name,
            "phone": phone,
            "role": role,
            "work_location": work_location,
            # "start_date": start_date.strftime("%Y-%m-%d"),
            "salary": salary,
            "manager_id": manager_id,
            "manages": manages
        }
        data_rows.append(data_row)

    with open("employees.json", "w") as f:
        json.dump(data_rows, f, indent=4) # writes to file

    return data_rows

generate_employee_data()
print("Employee data generation complete. Saved to employees.json")