import math
import os
import sys
import numpy
import scipy
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib as mpl
import matplotlib.cm as cm
import csv
from mpl_toolkits.mplot3d import Axes3D
from numpy import log10

prefix = 'data/'
suffix = ''
outputPrefix = 'figures/'

data = numpy.loadtxt(open(prefix + 'results_230_10' + suffix + '.csv','rb'),delimiter=',',skiprows=0)

colors      = cm.jet(numpy.linspace(1, 0, 20))

makeImageFiles = True

plt.figure(figsize=(80, 60))
ax = plt.subplot(111)
plt.xscale('linear')
legendNames = []
plt.scatter(data[:,0], data[:,6], color=colors[4], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,3], color=colors[1], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,5], color=colors[2], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,2], color=colors[0], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,4], color=colors[3], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,7], color=colors[5], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,8], color=colors[6], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,9], color=colors[7], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,10], color=colors[8], hold='on', linewidth=.51)

plt.scatter(data[:,0], data[:,11], color=colors[19], hold='on', linewidth=.51)
plt.scatter(data[:,0], data[:,16], color=colors[14], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,13], color=colors[11], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,15], color=colors[12], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,12], color=colors[10], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,14], color=colors[13], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,17], color=colors[15], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,18], color=colors[16], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,19], color=colors[17], hold='on', linewidth=.1)
plt.scatter(data[:,0], data[:,20], color=colors[18], hold='on', linewidth=.51)
plt.title('plot of vehicle positions over time', fontsize=16)
plt.xlabel('time', fontsize=16)
plt.ylabel('position', fontsize=16)
#plt.ylim([0, 10])
plt.xlim([min(data[:, 0]), max(data[:, 0])])
plt.legend(legendNames, loc='upper left')
box = ax.get_position()
ax.set_position([box.x0, box.y0, box.width * 0.70, box.height])
ax.legend(legendNames, loc='center right', bbox_to_anchor=(1.60, 0.5))
if (makeImageFiles == True):
  filename = outputPrefix + 'results_230_10' + suffix + '.pdf'
  plt.savefig(filename)
  print 'saved file to %s' % filename
else:
  plt.show()

