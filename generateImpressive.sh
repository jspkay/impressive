impress=$(cat js/impress.js | sed s/\`/\\\\\`/g | sed s/\\\//\\\\\\\//g )
echo "export const impress=\`$impress\`" > js/impress.text.js
