all:
	@find keymaps -type f \( -name '*.toml' -o -name '*.yaml' \) | while read -r file; do \
		kalamine build "$$file" --out "$$(echo $$file | sed 's/....$$/json/')"; \
	done

watch:
	@inotifywait -m -r keymaps -e close_write | while read -r path _action file; do \
		case $$file in \
			*.yaml | *.toml) echo kalamine build "$$path$$file" --out "$$path$$(basename "$${file%.*}").json";; \
		esac \
	done

dev:
	pipx install kalamine

clean:
	rm -rf dist/*

# the install/uninstall targets below require Kalamine v0.4.2+

install:
	@echo "Installer script for XKB (GNU/Linux)."
	@echo
	xkalamine install keymaps/ergol.toml

uninstall:
	@echo "Unistaller script for XKB (GNU/Linux)."
	@echo
	xkalamine remove fr/ergol
	@echo
