# Log Extraction Script

This script extracts logs for a specific date from large log files using Node.js and `readline`. It processes each line individually, keeping memory usage low and making it efficient for handling massive files.

`readline` reads files without loading everything into memory and automatically handles chunking, so there’s no need for manual buffer management. This keeps things simple and reliable, avoiding unnecessary complexity.

JavaScript makes the process smooth with async handling, built-in streaming, and cross-platform support. No extra dependencies—just a straightforward and effective way to filter logs.

## How to Run
```sh
git clone https://github.com/Lareb333/tech-campus-recruitment-2025
cd https://github.com/Lareb333/tech-campus-recruitment-2025
curl -o test_logs.log <log-file-url>
node src/extract_logs.js YYYY-MM-DD
```

