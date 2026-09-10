import re
import time

with open(r'templates\index.html', encoding='utf-8') as f:
    html = f.read()

# Unique version per build so browsers always fetch fresh files
v = int(time.time())

# Replace Jinja url_for calls with relative paths + cache bust
html = re.sub(
    r"\{\{ url_for\('static', filename='([^']+)'\) \}\}\?v=\d+",
    rf"\1?v={v}",
    html
)
html = re.sub(
    r"\{\{ url_for\('static', filename='([^']+)'\) \}\}",
    r"\1",
    html
)

# Fix music path
html = html.replace('static/music/sad-romance.mp3', 'music/sad-romance.mp4')

with open(r'docs\index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f'Generated docs/index.html (v={v})')
