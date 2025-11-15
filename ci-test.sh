cat << 'EOF' > ci-test.sh
#!/usr/bin/env bash
set -e

PORT=3000

# Start server in background
npm start &
PID=$!

# Wait for server (max 10 seconds)
for i in {1..10}; do
  if curl -sSf http://127.0.0.1:$PORT/health >/dev/null; then
    break
  fi
  sleep 1
done

# Run tests
node test.js

# Stop server
kill $PID || true
EOF
chmod +x ci-test.sh
