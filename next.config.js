module.exports = {
    redirects: async () => [
        {
            source: '/:path*',
            has: [{ type: 'host', value: 'www.animeal.in' }],
            destination: 'https://animeal.in/:path*',
            permanent: true
        }
    ]
}