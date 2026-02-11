import fs from 'fs';
import path from 'path';

export const loadFakeData = (filename) => {
  const filePath = path.resolve(__dirname, 'fake-data', filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseAttributes(content);
};

const parseAttributes = (content) => {
  const attributes = {};
  // Split using lookahead for key=
  const lines = content.split(/\n\s*(?=[a-zA-Z0-9-]+=)/);
  
  lines.forEach(chunk => {
    const equalSignIndex = chunk.indexOf('=');
    if (equalSignIndex === -1) return;
    
    // Extract key directly
    const key = chunk.substring(0, equalSignIndex).trim();
    
    // Previous logic for value
    let valuePart = chunk.substring(equalSignIndex + 1).trim();
    
    if (valuePart.startsWith('"') || valuePart.startsWith("'")) {
        const quoteChar = valuePart[0];
        const lastQuoteIndex = valuePart.lastIndexOf(quoteChar);
        if (lastQuoteIndex > 0) {
            let value = valuePart.substring(1, lastQuoteIndex);
            
            if ((value.startsWith('[') && value.endsWith(']')) || (value.startsWith('{') && value.endsWith('}'))) {
                try {
                    // Replace escaped quotes if necessary (basic support)
                    const jsonValue = value.replace(/\\"/g, '"').replace(/\\'/g, "'");
                    value = JSON.parse(jsonValue);
                } catch (e) {
                }
            } else {
                 if (value === "true") value = true;
                 if (value === "false") value = false;
            }
            attributes[toCamelCase(key)] = value;
        } else if (lastQuoteIndex === 0) {
             let value = valuePart.substring(1).trim();
             attributes[toCamelCase(key)] = value;
        }
    }
  });
  return attributes;
};

const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};
