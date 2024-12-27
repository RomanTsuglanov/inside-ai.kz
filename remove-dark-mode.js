const fs = require('fs');

// Remove darkMode from tailwind.config.ts
const tailwindConfigPath = './tailwind.config.ts';
if (fs.existsSync(tailwindConfigPath)) {
    let tailwindConfigContent = fs.readFileSync(tailwindConfigPath, 'utf-8');
    if (tailwindConfigContent.includes('darkMode')) {
        tailwindConfigContent = tailwindConfigContent.replace(/darkMode: ['\"]class['\"],?/g, '');
        fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);
        console.log('Removed darkMode from tailwind.config.ts');
    } else {
        console.log('darkMode not found in tailwind.config.ts');
    }
}

// Remove dark styles from app/globals.css
const globalsCSSPath = './app/globals.css';
if (fs.existsSync(globalsCSSPath)) {
    let globalsCSSContent = fs.readFileSync(globalsCSSPath, 'utf-8');
    const darkStylesRegex = /\\.[^}]*dark:[^}]*}/g;
    const updatedCSSContent = globalsCSSContent.replace(darkStylesRegex, '');
    fs.writeFileSync(globalsCSSPath, updatedCSSContent);
    console.log('Removed dark styles from app/globals.css');
} else {
    console.log('app/globals.css not found');
}

// Update components.json to disable CSS variables
const componentsConfigPath = './components.json';
if (fs.existsSync(componentsConfigPath)) {
    const componentsConfig = JSON.parse(fs.readFileSync(componentsConfigPath, 'utf-8'));
    if (componentsConfig.tailwind && componentsConfig.tailwind.cssVariables) {
        componentsConfig.tailwind.cssVariables = false;
        fs.writeFileSync(componentsConfigPath, JSON.stringify(componentsConfig, null, 2));
        console.log('Updated components.json: disabled CSS variables');
    } else {
        console.log('CSS variables already disabled or not present in components.json');
    }
} else {
    console.log('components.json not found');
}
