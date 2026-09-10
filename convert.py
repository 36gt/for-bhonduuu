import re

with open(r'templates\index.html', encoding='utf-8') as f:
    html = f.read()

# Replace Jinja url_for calls (with or without ?v=NN cache busters) with relative paths
html = re.sub(r"\{\{ url_for\('static', filename='([^']+)'\) \}\}\?v=\d+", r"\1", html)
html = re.sub(r"\{\{ url_for\('static', filename='([^']+)'\) \}\}", r"\1", html)

# Remove the music source since no file exists (keeps the player but silent-safe)
html = html.replace('static/music/sad-romance.mp3', 'music/sad-romance.mp3')

with open(r'docs\index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Generated docs/index.html')