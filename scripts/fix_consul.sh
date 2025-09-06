#!/bin/bash

echo "=== Fixing Consul Service ==="

# Check Consul status
echo "Checking Consul service status..."
systemctl status consul --no-pager || true

# Check what's using port 8500
echo ""
echo "Checking port 8500..."
lsof -i :8500 || netstat -tulpn | grep 8500 || true

# Fix Consul configuration
echo ""
echo "Fixing Consul configuration..."
cat > /etc/consul.d/consul.hcl << EOF
datacenter = "dc1"
data_dir = "/opt/consul"
log_level = "INFO"
node_name = "nomad-server"
server = true
bootstrap_expect = 1
ui = true

bind_addr = "0.0.0.0"
client_addr = "0.0.0.0"

ports {
  grpc = 8502
  dns = 8600
  http = 8500
  serf_lan = 8301
  serf_wan = 8302
  server = 8300
}

connect {
  enabled = true
}

performance {
  raft_multiplier = 1
}
EOF

# Create data directory if not exists
mkdir -p /opt/consul
chown -R consul:consul /opt/consul

# Try to start Consul in dev mode first
echo ""
echo "Trying to start Consul in dev mode..."
systemctl stop consul 2>/dev/null || true
sleep 2

# Start Consul in dev mode for testing
consul agent -dev -ui -client=0.0.0.0 &
CONSUL_PID=$!
sleep 5

# Check if Consul is running
if ps -p $CONSUL_PID > /dev/null; then
    echo "✓ Consul is running in dev mode"
    kill $CONSUL_PID
    
    # Now try to start as service
    echo "Starting Consul as service..."
    systemctl daemon-reload
    systemctl enable consul
    systemctl start consul
    sleep 3
    
    if systemctl is-active --quiet consul; then
        echo "✓ Consul service started successfully"
    else
        echo "✗ Consul service failed, checking logs..."
        journalctl -u consul --no-pager -n 50
    fi
else
    echo "✗ Consul failed to start in dev mode"
fi

# Check Nomad status
echo ""
echo "=== Checking Nomad Service ==="
systemctl status nomad --no-pager || true

# If Nomad is not running, start it
if ! systemctl is-active --quiet nomad; then
    echo "Starting Nomad service..."
    systemctl daemon-reload
    systemctl enable nomad
    systemctl start nomad
    sleep 3
fi

# Final status check
echo ""
echo "=== Final Status ==="
echo "Consul status:"
systemctl is-active consul && echo "✓ Consul is running" || echo "✗ Consul is not running"

echo ""
echo "Nomad status:"
systemctl is-active nomad && echo "✓ Nomad is running" || echo "✗ Nomad is not running"

echo ""
echo "Accessible URLs:"
echo "- Consul UI: http://$(hostname -I | awk '{print $1}'):8500"
echo "- Nomad UI: http://$(hostname -I | awk '{print $1}'):4646"