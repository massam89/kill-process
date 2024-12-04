const { execSync } = require("node:child_process");
const readline = require("node:readline");

try {
  const portInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  portInput.question("Enter the port number: ", (port) => {
    let output = execSync("netstat -ano ")?.toString();

    const portPattern = new RegExp(`:${port}\\s+.*?\\s+\\d+$`, "gm");
    const match = output?.match(portPattern);
    const preparedMatch = match?.[0]?.split(" ")?.filter((item) => item)?.[3];

    if (preparedMatch)
      output = execSync(`taskkill /PID ${preparedMatch} /F`)?.toString();

    console.log("*******************port is free now**********************");

    portInput.close();
  });
} catch (error) {
  console.error("Error executing command:", error.message);
}
