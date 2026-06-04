const crypto = require("crypto");
const fs = require("fs");

const decryptFile = (inputFile, outputFile, password) => {
    try {
        const key = crypto.createHash("sha256").update(password).digest();

        if (!fs.existsSync(inputFile)) {
            console.error(`Error: Input file ${inputFile} not found.`);
            return;
        }

        const input = fs.readFileSync(inputFile);
        const iv = input.slice(0, 16);
        const encryptedData = input.slice(16);

        const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

        const decrypted = Buffer.concat([
            decipher.update(encryptedData),
            decipher.final(),
        ]);

        fs.writeFileSync(outputFile, decrypted);
        console.log(`Successfully decrypted ${inputFile} to ${outputFile}`);
    } catch (error) {
        console.error("Decryption failed. Please check if the password is correct.");
        console.error("Error details:", error.message);
    }
};

// The existing character.enc was encrypted with "MyCharacter12"
decryptFile("character.enc", "character.glb", "MyCharacter12");