all:
	python build_all.py

watch:
	python watch.py

dev:
	pip3 install kalamine watchdog

clean:
	rm -rf dist/*

# the install/uninstall targets below require Kalamine v0.4.2+

install:
	@echo "Installer script for XKB (GNU/Linux)."
	@echo
	xkalamine install layouts/ergol.toml

uninstall:
	@echo "Unistaller script for XKB (GNU/Linux)."
	@echo
	xkalamine remove fr/ergol
	@echo
