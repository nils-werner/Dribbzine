#
# Makefile for Palm WebOS Enyo
#
#

PACKAGE = de.obsessivemedia.webos.dribbzine
DEVICE = tcp

.PHONY: web

web:
	chromium-browser --disable-web-security --allow-file-access-from-files index.html &> /dev/null &
	
help:
	chromium-browser --disable-web-security --allow-file-access-from-files /opt/PalmSDK/Current/share/refcode/framework/enyo/1.0/support/docs/api/index.html &> /dev/null &
	
examples:
	nautilus /opt/PalmSDK/Current/share/refcode/framework/enyo/1.0/support/
	
%.ipk:
	rm -rf *.ipk
	palm-package .

package: %.ipk

clean:
	rm -rf *.ipk
	- palm-install -d $(DEVICE) -r $(PACKAGE)

install: package
	palm-install -d $(DEVICE) *.ipk
	
launch:
	palm-launch -d $(DEVICE) $(PACKAGE)
	
log: launch
	palm-log -d $(DEVICE) -f $(PACKAGE)
