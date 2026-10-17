# GitHub Pages

In repository Settings → Pages, choose **GitHub Actions** as the build and deployment source. Then run **Deploy GitHub Pages** from the Actions tab (or rerun the latest failed deployment).

URL after successful deployment: https://suubro.github.io/OPXYAtlas/

Every push to main runs the Node tests, builds the static app, and deploys dist. The build needs Node 22 and zip; both are available on the Ubuntu Actions runner. No dependency installation is required for the build or Node tests. Browser tests remain a separate, unexecuted gate.

All app assets, manifest URLs, and service-worker registration use relative paths so the /OPXYAtlas/ project prefix is preserved. The existing Sites publication remains available independently.
