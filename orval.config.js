module.exports = {
    'api': {
        input: './Api/obj/Api.json',
        output: {
            target: './web/lib/gen/api.ts',
            client: 'fetch',
        },
        hooks: {
            afterAllFilesWrite: 'prettier --write',
        },
    },
};
