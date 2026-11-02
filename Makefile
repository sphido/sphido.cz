.PHONY: $(MAKECMDGOALS)

all:
	pnpm install --frozen-lockfile
	pnpm run build

release:
	git commit --allow-empty -m "Publish at `date +%F-%T`"
	git push
	vercel --prod