module.exports = {
    'api': {
        input: './Api/obj/Api.json',
        output: {
            target: './web/lib/gen/api.ts',
            client: 'fetch',
            baseUrl: `${process.env.APP_URL}/api`,
        },
        hooks: {
            afterAllFilesWrite: 'prettier --write',
        },
    },
};
