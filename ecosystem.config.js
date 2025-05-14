module.exports = {
    apps: [{
        name: 'tinylnk-backend',
        script: 'dist/main.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '512M',
        env: {
            NODE_ENV: 'production',
            PORT: 8080
        }
    }]
}