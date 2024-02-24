all:
	@for file in layouts/*.toml; do \
		kalamine build $$file --out "layouts/$$(basename $${file%.*}).json"; \
	done
	@for file in layouts/*.yaml; do \
		kalamine build $$file --out "layouts/$$(basename $${file%.*}).json"; \
	done

watch:
	@inotifywait -m layouts -e close_write | while read -r _path _action file; do \
		case $$file in \
			*yaml) kalamine build "layouts/$$file" --out "layouts/$$(basename "$${file%.*}").json";; \
			*toml) kalamine build "layouts/$$file" --out "layouts/$$(basename "$${file%.*}").json";; \
		esac \
	done

dev:
	pip3 install kalamine

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
