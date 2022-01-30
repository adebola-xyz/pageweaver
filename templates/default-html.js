module.exports = `\`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\${
      args.no_css || args.framework
        ? ""
        : \`
    <link rel="stylesheet" href="./\${mainParam}.styles/\${
      args.scss ? \`\` : \`--\`
    }\${mainParam}.css"/>\${
            args.bootstrap && !args.bootstrap_local
              ? \`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></link>\`
              : \`\`
          }\`
    }
  \${
    args.react_cli
      ? \`
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the 'public' folder during the build.
      Only files inside the 'public' folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running 'npm run build'.
    -->\`
      : \`\`
  }
    <title>\${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)}</title>
  </head>
  <body>
    \${
      args.framework
        ? \`
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="\${args.react_cli ? "root" : args.vue_cli ? "app" : ""}"></div>\${
            args.react_cli || args.vue_cli
              ? \`
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run 'npm start' or 'yarn start'.
      To create a production bundle, use 'npm run build' or 'yarn build'.
    -->\`
              : \`\`
          }\`
        : \`<div>
      <p> New Pageweaver Page.</p>
    </div>\`
    }
    \${
      args.no_javascript || args.framework
        ? ""
        : \`\${
            args.bootstrap && !args.bootstrap_local
              ? \`<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>\`
              : ""
          }\${
            args.react
              ? \`
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>\`
              : ""
          }
    <script src="./\${mainParam}.js/\${mainParam}.main.js"></script>\`
    }
  </body>
</html>\``;
