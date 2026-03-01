import fs from 'fs';
import path from 'path';

const inputPath = String.raw`C:\Users\Jai Rodrigo\.gemini\antigravity\brain\7164cd2a-f82e-4256-9d23-7aa02c54a83f\.system_generated\steps\591\output.txt`;
const outputPath = String.raw`C:\Users\Jai Rodrigo\Desktop\Projeto web\projeto-botneural-site\src\types\supabase.ts`;

try {
    const content = fs.readFileSync(inputPath, 'utf8');
    const json = JSON.parse(content);
    if (json.types) {
        fs.writeFileSync(outputPath, json.types);
        console.log('Types written successfully to', outputPath);
    } else {
        console.log('No types property found in input file');
    }
} catch (error) {
    console.error('Error processing types:', error);
    process.exit(1);
}
