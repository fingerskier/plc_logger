For /f "tokens=1-2 delims=/: " %%a in ("%TIME%") do (if %%a LSS 10 (set mytime=0%%a%%b) else (set mytime=%%a%%b))

node plc_logger.js lab > log_%mydate%_%mytime%.dat
