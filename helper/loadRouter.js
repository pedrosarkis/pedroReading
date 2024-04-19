const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    const routesDirectory = path.join(__dirname, '../routes');
    
    fs.readdirSync(routesDirectory).forEach(file => {
        const route = require(path.join(routesDirectory, file))
        const routePath = '/' + (file === 'index.js' ? '' : file.replace('.js', ''))
        if(file === 'admin.js') {
            app.use(routePath, require('../middleware/authAdmin'), route);
        } else {
            app.use(routePath, route);
        }
    })
}