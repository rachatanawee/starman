#!/bin/bash
echo "Starting Next.js development server..."
bun run next dev -p 3000 &
sleep 2
echo ""
echo "✓ App is ready!"
echo "  - Local:    http://localhost:3000/crmpredict"
echo "  - Network:  http://$(ipconfig getifaddr en0 || hostname -I | awk '{print $1}'):3000/crmpredict"
echo ""
wait
