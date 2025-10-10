const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

/**
 * Convert MDX content to HTML by simple text processing
 * This approach converts common markdown syntax to HTML
 */
function mdxToHtml(mdxContent) {
    // Remove React imports and JSX components that can't be processed
    let content = mdxContent
        // Remove import statements
        .replace(/^import.*?;$/gm, '')
        // Remove JSX comments
        .replace(/\{\/\*.*?\*\/\}/gs, '')
        // Convert JSX components to meaningful HTML content
        .replace(/<([A-Z][a-zA-Z0-9]*)[^>]*\/>/g, convertReactComponent)
        .replace(/<([A-Z][a-zA-Z0-9]*)[^>]*>.*?<\/\1>/gs, convertReactComponentWithChildren)
        // Clean up any remaining JSX expressions
        .replace(/\{[^}]*\}/g, '');

    // Convert markdown syntax to HTML
    content = content
        // Headers
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        
        // Blockquotes
        .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
        
        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        
        // Line breaks and paragraphs
        .split('\n\n').map(paragraph => {
            paragraph = paragraph.trim();
            if (!paragraph) return '';
            
            // Handle lists
            if (paragraph.includes('\n- ')) {
                const items = paragraph.split('\n- ').map((item, index) => {
                    if (index === 0 && !item.startsWith('- ')) {
                        return item;
                    }
                    const cleanItem = item.replace(/^- /, '');
                    return `<li>${cleanItem}</li>`;
                }).filter(item => item.trim());
                
                if (items[0] && !items[0].startsWith('<li>')) {
                    return items[0] + '\n<ul>' + items.slice(1).join('') + '</ul>';
                } else {
                    return '<ul>' + items.join('') + '</ul>';
                }
            }
            
            // Skip if already HTML tag
            if (paragraph.startsWith('<')) {
                return paragraph;
            }
            
            return `<p>${paragraph}</p>`;
        }).join('\n');

    return content;
}

/**
 * Convert self-closing React components to meaningful HTML
 */
function convertReactComponent(match, componentName) {
    // Special handling for known components
    switch (componentName) {
        case 'Divider':
            return '<hr>';
        case 'ImageGrid':
            return '<div class="component-placeholder image-grid">[Design System Image]</div>';
        case 'BLUIProjectCatalog':
            return generateBLUIProjectsContent();
        case 'ComponentCatalogGrids':
            return '<div class="component-placeholder component-catalog">[Component Catalog - Interactive component library browser]</div>';
        case 'ThemeExplorer':
            return '<div class="component-placeholder theme-explorer">[Theme Explorer - Interactive theme customization tool]</div>';
        case 'UniversalIconBrowser':
            return '<div class="component-placeholder icon-browser">[Icon Browser - Interactive icon library browser]</div>';
        case 'GettingStartedTabs':
            return '<div class="component-placeholder getting-started">[Getting Started Tabs - Interactive framework selection]</div>';
        default:
            // Generic placeholder for unknown components
            return `<div class="component-placeholder generic-component">[${componentName} Component - Interactive React component]</div>`;
    }
}

/**
 * Convert React components with children to meaningful HTML
 */
function convertReactComponentWithChildren(match, componentName) {
    // Extract content between opening and closing tags
    const contentMatch = match.match(new RegExp(`<${componentName}[^>]*>(.*?)<\/${componentName}>`, 's'));
    const innerContent = contentMatch ? contentMatch[1].trim() : '';
    
    // Special handling for known components
    switch (componentName) {
        case 'Section':
        case 'PageContent':
        case 'RegularWidth':
            // These are layout components, just return the inner content
            return innerContent;
        default:
            // For unknown components with children, create a placeholder that includes the inner content
            return `<div class="component-placeholder generic-component-with-children">
                <p><em>[${componentName} Component]</em></p>
                ${innerContent}
            </div>`;
    }
}

/**
 * Generate HTML content for BLUI Projects that would normally be rendered by BLUIProjectCatalog component
 */
function generateBLUIProjectsContent() {
    // Sample projects data - this represents what the component would show
    const projects = [
        {
            name: 'Pump Control and Monitoring',
            description: 'The Control Xpert mobile app allows remote access for monitoring and controlling irrigation systems. Users can start, stop, change speed, and reset faults on drives directly from their mobile devices.',
            market: 'Agriculture',
            devices: 'Drives',
            stack: 'React Native',
            tags: ['Device Control (Remote)', 'Device Commissioning', 'Real-time Monitoring', 'Maps']
        },
        {
            name: 'Intelligent Power Manager',
            description: 'Disaster Avoidance Software, also known as Intelligent Power Manager (IPM), will help keep power equipment running during power and environmental events with advanced alerts and automated resolution.',
            market: 'Data centers',
            devices: 'Power equipment (ex. UPS, PDU)',
            stack: 'Angular',
            tags: ['Real-time Monitoring', 'Schedules & Automation', 'Device Control (Remote)', 'Alarms']
        },
        {
            name: 'CYME LVDAT',
            description: 'CYME Load Verification & Data Analysis Tool (LVDAT) helps engineers and operators monitor the power system performance by displaying real-time data from the field in tables and intuitive graphics.',
            market: 'Utilities',
            devices: 'Power meters',
            stack: 'Angular',
            tags: ['Real-time Monitoring', 'One-line Diagrams']
        },
        {
            name: 'PX Dashboard',
            description: 'The PX Dashboard provides real-time monitoring and control capabilities for Eaton\'s PX series power distribution units in data centers.',
            market: 'Data centers',
            devices: 'Power distribution units',
            stack: 'React',
            tags: ['Real-time Monitoring', 'Device Control (Remote)']
        },
        {
            name: 'Brightlayer Insights',
            description: 'Brightlayer Insights provides analytics and reporting capabilities for various Eaton devices and systems.',
            market: 'Multiple industries',
            devices: 'Various Eaton devices',
            stack: 'Angular',
            tags: ['Real-time Monitoring', 'Predictions', 'Alarms']
        },
        {
            name: 'PredictPulse',
            description: 'PredictPulse offers predictive analytics and monitoring for UPS systems in data centers.',
            market: 'Data centers',
            devices: 'UPS',
            stack: 'Angular',
            tags: ['Real-time Monitoring', 'Alarms', 'Predictions']
        },
        {
            name: 'Brightlayer Home',
            description: 'The Brightlayer Home app provides an interface to Eaton\'s WiFi-enabled smart breakers which offer circuit protection, cloud connectivity, remote control and precise metering.',
            market: 'Residential & commercial',
            devices: 'Smart breakers',
            stack: 'React Native',
            tags: ['Real-time Monitoring', 'Device Control (Remote)', 'Schedules & Automation']
        },
        {
            name: 'EV Charger Manager',
            description: 'Mobile app for managing and monitoring EV charging stations, providing real-time status, scheduling, and control capabilities.',
            market: 'Residential & commercial',
            devices: 'EV chargers & smart breakers',
            stack: 'React Native',
            tags: ['Real-time Monitoring', 'Device Commissioning', 'Device Control (Remote)', 'Schedules & Automation']
        }
    ];

    let html = '<div class="blui-projects-catalog">\n';
    html += '<p><em>Below are selected examples of apps built using Brightlayer UI:</em></p>\n\n';
    
    projects.forEach((project, index) => {
        html += `<div class="project-item">\n`;
        html += `  <h3 class="project-title">${project.name}</h3>\n`;
        html += `  <p class="project-description">${project.description}</p>\n`;
        html += `  <div class="project-details">\n`;
        html += `    <p><strong>Market:</strong> ${project.market}</p>\n`;
        html += `    <p><strong>Devices:</strong> ${project.devices}</p>\n`;
        html += `    <p><strong>Technology Stack:</strong> ${project.stack}</p>\n`;
        html += `    <p><strong>Features:</strong> ${project.tags.join(', ')}</p>\n`;
        html += `  </div>\n`;
        html += `</div>\n`;
        if (index < projects.length - 1) {
            html += `<hr class="project-divider">\n`;
        }
    });
    
    html += '</div>\n';
    return html;
}

/**
 * Generate a complete HTML document with styling
 */
function generateFullHtml(content, title = 'Brightlayer UI Documentation') {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #fff;
        }
        
        h1 {
            color: #1976d2;
            font-size: 2.5em;
            margin-bottom: 0.5em;
            border-bottom: 3px solid #1976d2;
            padding-bottom: 0.2em;
        }
        
        h2 {
            color: #1976d2;
            font-size: 1.8em;
            margin-top: 2em;
            margin-bottom: 0.5em;
        }
        
        h3 {
            color: #424242;
            font-size: 1.4em;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        
        p {
            margin-bottom: 1em;
            text-align: justify;
        }
        
        ul, ol {
            margin-left: 2em;
            margin-bottom: 1em;
        }
        
        li {
            margin-bottom: 0.5em;
        }
        
        blockquote {
            background-color: #f5f5f5;
            border-left: 4px solid #1976d2;
            padding: 1em;
            margin: 1em 0;
            font-style: italic;
        }
        
        hr {
            border: none;
            height: 2px;
            background-color: #e0e0e0;
            margin: 2em 0;
        }
        
        .image-grid {
            background-color: #f0f0f0;
            padding: 20px;
            text-align: center;
            border: 1px dashed #ccc;
            margin: 1em 0;
            color: #666;
        }
        
        .component-placeholder {
            background-color: #f8f9fa;
            padding: 15px 20px;
            margin: 1em 0;
            border-radius: 4px;
            border: 1px dashed #dee2e6;
            color: #6c757d;
            font-style: italic;
            text-align: center;
        }
        
        .component-placeholder.theme-explorer,
        .component-placeholder.icon-browser,
        .component-placeholder.getting-started {
            background-color: #e3f2fd;
            border-color: #1976d2;
            color: #1565c0;
        }
        
        .generic-component-with-children {
            text-align: left;
        }
        
        .generic-component-with-children p {
            text-align: center;
            margin-bottom: 1em;
            color: #6c757d;
        }
        
        .blui-projects-catalog {
            margin: 2em 0;
        }
        
        .project-item {
            margin: 2em 0;
            padding: 1.5em;
            background-color: #fafafa;
            border-left: 4px solid #1976d2;
            border-radius: 4px;
        }
        
        .project-title {
            color: #1976d2;
            margin-top: 0;
            margin-bottom: 1em;
        }
        
        .project-description {
            font-style: italic;
            margin-bottom: 1em;
            line-height: 1.6;
        }
        
        .project-details {
            font-size: 0.9em;
        }
        
        .project-details p {
            margin: 0.5em 0;
        }
        
        .project-divider {
            margin: 1.5em 0;
            border: none;
            height: 1px;
            background-color: #e0e0e0;
        }
        
        .component-catalog {
            background-color: #f0f0f0;
            padding: 20px;
            text-align: center;
            border: 1px dashed #ccc;
            margin: 1em 0;
            color: #666;
        }
        
        a {
            color: #1976d2;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        @media print {
            body {
                max-width: none;
                margin: 0;
                padding: 20px;
            }
            
            h1 {
                page-break-before: auto;
                page-break-after: avoid;
            }
            
            h2, h3 {
                page-break-before: auto;
                page-break-after: avoid;
            }
            
            ul, ol {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
}

/**
 * Recursively find all MDX and MD files in a directory
 */
function findMdxFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            findMdxFiles(filePath, fileList);
        } else if (path.extname(file) === '.mdx' || path.extname(file) === '.md') {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

/**
 * Convert MDX or MD file to PDF
 */
async function convertMdxToPdf(inputPath, outputPath, browser = null) {
    try {
        console.log(`Reading ${path.extname(inputPath).toUpperCase()} file: ${path.basename(inputPath)}...`);
        const mdxContent = fs.readFileSync(inputPath, 'utf8');
        
        const htmlContent = mdxToHtml(mdxContent);
        const title = path.basename(inputPath, path.extname(inputPath));
        const fullHtml = generateFullHtml(htmlContent, `${title} - Brightlayer UI Documentation`);
        
        let shouldCloseBrowser = false;
        if (!browser) {
            console.log('Launching browser...');
            browser = await puppeteer.launch({
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            shouldCloseBrowser = true;
        }
        
        const page = await browser.newPage();
        
        await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
        
        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '15mm',
                bottom: '20mm',
                left: '15mm'
            }
        });
        
        await page.close();
        
        if (shouldCloseBrowser) {
            await browser.close();
        }
        
        console.log(`✓ PDF generated: ${outputPath}`);
        
    } catch (error) {
        console.error(`Error converting ${inputPath} to PDF:`, error);
        throw error;
    }
}

/**
 * Convert all MDX and MD files in a directory to PDF
 */
async function convertAllMdxToPdf(inputDir, outputDir) {
    try {
        console.log(`Finding MDX and MD files in: ${inputDir}`);
        const mdxFiles = findMdxFiles(inputDir);
        
        if (mdxFiles.length === 0) {
            console.log('No MDX or MD files found.');
            return;
        }
        
        console.log(`Found ${mdxFiles.length} MDX/MD files to convert`);
        
        // Launch browser once for all conversions
        console.log('Launching browser...');
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        for (const mdxFile of mdxFiles) {
            // Calculate relative path from input directory
            const relativePath = path.relative(inputDir, mdxFile);
            const fileExtension = path.extname(relativePath);
            const pdfFileName = path.basename(relativePath, fileExtension) + '.pdf';
            const pdfDir = path.join(outputDir, path.dirname(relativePath));
            const outputPath = path.join(pdfDir, pdfFileName);
            
            await convertMdxToPdf(mdxFile, outputPath, browser);
        }
        
        await browser.close();
        console.log(`\n🎉 Successfully converted ${mdxFiles.length} MDX/MD files to PDF!`);
        
    } catch (error) {
        console.error('Error in batch conversion:', error);
        throw error;
    }
}

// Main execution
async function main() {
    const inputPath = process.argv[2];
    const outputPath = process.argv[3];
    
    if (!inputPath) {
        console.log('Usage:');
        console.log('  Single file: node mdx-to-pdf.js <input.mdx|input.md> [output.pdf]');
        console.log('  All files:   node mdx-to-pdf.js <input-directory> <output-directory>');
        console.log('  Batch mode:  node mdx-to-pdf.js --batch');
        console.log('');
        console.log('Examples:');
        console.log('  node mdx-to-pdf.js src/docs/overview.mdx overview.pdf');
        console.log('  node mdx-to-pdf.js src/docs/README.md readme.pdf');
        console.log('  node mdx-to-pdf.js src/docs src/docs/pdfs');
        console.log('  node mdx-to-pdf.js --batch  # converts src/docs to src/docs/pdfs');
        process.exit(1);
    }
    
    // Handle batch mode (default behavior for this project)
    if (inputPath === '--batch' || inputPath === '--all') {
        const sourceDir = path.resolve('src/docs');
        const outputDir = path.resolve('src/docs/pdfs');
        console.log(`Batch converting all MDX and MD files from ${sourceDir} to ${outputDir}`);
        await convertAllMdxToPdf(sourceDir, outputDir);
        return;
    }
    
    const resolvedInputPath = path.resolve(inputPath);
    
    // Check if input is a directory
    if (fs.existsSync(resolvedInputPath) && fs.statSync(resolvedInputPath).isDirectory()) {
        if (!outputPath) {
            console.error('Output directory is required when input is a directory');
            process.exit(1);
        }
        const resolvedOutputPath = path.resolve(outputPath);
        await convertAllMdxToPdf(resolvedInputPath, resolvedOutputPath);
        return;
    }
    
    // Single file conversion
    if (!fs.existsSync(resolvedInputPath)) {
        console.error(`Input file not found: ${resolvedInputPath}`);
        process.exit(1);
    }
    
    const resolvedOutputPath = outputPath 
        ? path.resolve(outputPath)
        : path.resolve(path.dirname(resolvedInputPath), path.basename(resolvedInputPath, path.extname(resolvedInputPath)) + '.pdf');
    
    await convertMdxToPdf(resolvedInputPath, resolvedOutputPath);
}

// Run the script
if (require.main === module) {
    main().catch(error => {
        console.error('Script failed:', error);
        process.exit(1);
    });
}

module.exports = { convertMdxToPdf, convertAllMdxToPdf, findMdxFiles };