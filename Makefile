all:
	yarn install --dev --no-color
	rm -rf ./public
	mkdir -p log public
	yarn run build

deploy:
	git commit --allow-empty -m "autoupdate `date +%F-%T`"
	git push
	
PHONY: all deploy
