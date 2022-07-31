import datetime
pob_prac = '30/07 14:00'
pob_hr_prac = pob_prac[:0] + pob_prac[6:]
hr_prac = pob_hr_prac[:2] + pob_hr_prac[5:]
min_prac = pob_hr_prac[:0] + pob_hr_prac[3:]
print(hr_prac)
print(min_prac)
hr_int_prac = int(hr_prac)
min_int_prac = int(min_prac)
date_and_time = datetime.datetime(2022, 1, 1, hr_int_prac, min_int_prac)
time_change = datetime.timedelta(minutes=40)
new_time = date_and_time + time_change
new_time_str = new_time.strftime('%H:%M')
# new_time_int = int(new_time)
# temp_previsto = new_time_int[:0] + new_time_int[6:]
print(new_time_str)