const fs = require("fs");
const path = require("path");
const readline = require("readline");

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error("Usage: node extract_logs.js YYYY-MM-DD");
    process.exit(1);
  }

  const targetDate = args[0];
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(targetDate)) {
    console.error("Invalid date format. Expected YYYY-MM-DD.");
    process.exit(1);
  }

  const targetPrefix = `${targetDate}T`;

  const outputDir = "output";
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `output_${targetDate}.txt`);
  const outputStream = fs.createWriteStream(outputPath);
  outputStream.on("error", (err) => {
    console.error(`Error writing to output file: ${err.message}`);
    process.exit(1);
  });

  const inputStream = fs.createReadStream("test_logs.log");
  inputStream.on("error", (err) => {
    console.error(`Error opening log file: ${err.message}`);
    process.exit(1);
  });

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    if (line.startsWith(targetPrefix)) {
      outputStream.write(line + "\n");
    }
  });

  rl.on("close", () => {
    outputStream.end();
    console.log(`Logs extracted to ${outputPath}`);
  });

  rl.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  });
}

main();
