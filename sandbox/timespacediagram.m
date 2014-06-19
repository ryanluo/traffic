M = csvread('C:\Users\ericjang\Downloads\output2.csv');
time = M(:,1);
data = M(:,2:end); 
plot(time,data,'.');