set filename=ICS_%DATE:~-4%_%DATE:~4,2%_%DATE:~7,2%_%TIME:~0,2%_%TIME:~3,2%.dat
set filename=%filename: =0%

node plc_logger.js DAQ.json > DAQ_%filename%.dat