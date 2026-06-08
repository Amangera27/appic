const crypto = require("crypto");
const fs = require("fs");

const { pipeline } = require("stream/promises");

const encryptFile = async (inputFile, outputFile, password) => {
  try {
    if (!fs.existsSync(inputFile)) {
      console.error(`Error: Input file ${inputFile} not found.`);
      return;
    }

    const key = crypto.createHash("sha256").update(password).digest();
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);

    output.write(iv);
    
    await pipeline(input, cipher, output);
    console.log(`Successfully encrypted ${inputFile} to ${outputFile}`);
  } catch (error) {
    console.error("Encryption failed:", error.message);
  }
};

// Use the password used in the application: "MyCharacter12"
encryptFile("character.glb", "character.enc", "MyCharacter12");

