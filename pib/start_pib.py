#!/usr/bin/env python2
# -*- coding: utf-8 -*-
import SimpleHTTPServer
import SocketServer
import os
import posixpath
import urllib
import socket

PORT = 8088
WEB_DIR = os.path.dirname(os.path.abspath(__file__))

# Print WEB_DIR to verify the directory
print "📂 WEB_DIR: %s" % WEB_DIR

# Use 'pib' as the project path for URLs
project_path = 'pib'
print "📂 Project path for URL: %s" % project_path

class CORSHTTPRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
        SimpleHTTPServer.SimpleHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def translate_path(self, path):
        print "🔍 Incoming URL path: %s" % path
        path = urllib.unquote(path).lstrip('/')
        print "🔍 Decoded path: %s" % path
        path = posixpath.normpath(path)
        print "🔍 Normalized path: %s" % path
        project_prefix = project_path + '/'
        if path.startswith(project_prefix):
            relative_path = path[len(project_prefix):]
            absolute_path = os.path.abspath(os.path.join(WEB_DIR, relative_path))
        else:
            absolute_path = os.path.abspath(os.path.join('/', path))
        print "🔍 Final filesystem path: %s" % absolute_path
        allowed_dirs = [os.path.dirname(WEB_DIR), '/home/nemrut/']
        if not any(absolute_path.startswith(d) for d in allowed_dirs):
            print "🚫 Access denied: Path outside allowed directories"
            self.send_error(403, "Access denied: Path outside allowed directories")
            return None
        if not os.path.exists(absolute_path):
            print "❌ File does not exist: %s" % absolute_path
            return absolute_path
        print "✅ Serving file: %s" % absolute_path
        return absolute_path

# Change to the web directory
os.chdir(WEB_DIR)

# Set up the server with reuse address to avoid port conflicts
Handler = CORSHTTPRequestHandler
try:
    httpd = SocketServer.TCPServer(("127.0.0.1", PORT), Handler)
    httpd.allow_reuse_address = True
except socket.error as e:
    print "❌ Port %s is in use: %s" % (PORT, e)
    exit(1)

print "✅ Serving PIB at http://localhost:%s/" % PORT
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print "\n🛑 Server stopped."
    httpd.shutdown()