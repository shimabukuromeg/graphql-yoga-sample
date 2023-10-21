import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: "../backend/src/schema.gen.graphql",
    documents: ['src/**/*.tsx', 'app/**/*.tsx'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/gql/': {
            preset: 'client'
        }
    }
}

export default config
