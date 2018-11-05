all:
	yarn install --dev --no-color
	rm -rf ./public
	mkdir -p log public
	yarn run build
PHONY: all