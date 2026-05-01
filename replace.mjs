import fs from 'fs';
import path from 'path';

const files = [
    'src/components/AdminContentManagement.tsx',
    'src/components/AdminUserManagement.tsx',
    'src/components/AdminLogin.tsx',
    'src/components/Events.tsx',
    'src/components/Clubs.tsx',
];

for (const file of files) {
    const filepath = path.resolve(file);
    let content = fs.readFileSync(filepath, 'utf-8');
    if (content.includes('http://localhost:3000')) {
        // Replace URL inside quotes
        content = content.replace(/['"]http:\/\/localhost:3000([^'"]*)['"]/g, "\`${API_URL}$1\`");
        // Replace URL outside quotes (inside template literals)
        content = content.replace(/http:\/\/localhost:3000/g, '${API_URL}');

        if (!content.includes("from '../config'") && !content.includes('import { API_URL }')) {
            content = "import { API_URL } from '../config';\n" + content;
        }

        fs.writeFileSync(filepath, content, 'utf-8');
        console.log('Replaced in', file);
    }
}
