**Project installation**
npm i --save express express-graphql graphql lodash ramda
npm i -- save lodash

**Static Database**
    **installation**
    npm install --save json.server
    **Package.json > script**
    json-server --watch db.json
    Then add db.json outside src

**Typescript**
npm install  -D typescript ts-node-dev @types/express
npm i --save-dev @types/ramda
<!-- cors: @types/cors -->

**Generate tsconfig file**
npx tsc --init
`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "baseUrl": "./",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true, 
    "paths": {
      "@schema/*": [
        "src/schema/*"
      ]
    },
  },
  "include": [
    "src/**/*.ts",
    "spec/**/*.ts"
  ],
  "exclude": [
    "src/public/"
  ]
}`

**Nodemon doesn't recognize typescript paths @schema**
1. install npm install --save-dev nodemon ts-node
2. npm install --save-dev tsconfig-paths module-alias ( library to handle module paths )
3. Add module alias in the package file 
   - `"_moduleAliases": {
         "@schema": "dist/schema"
      }`
1. add a nodemon file 
    `{
        "watch": [
            "src/**/*.ts",
            "**/*.ts"
        ],
        "ext": "ts,json",
        "ignore": [
            "src/**/*.spec.ts",
            "src/public"
        ],
        "exec": "ts-node -r tsconfig-paths/register ./src",
        "env": {
            "NODE_ENV": "development"
        }
    }`
1. add this script to your package.json file 
   - development env is set by default in the nodemon.json file 
       `"scripts": {
            "clean": "rm -fr dist",
            "build": "tsc --build tsconfig.prod.json",
            "json:server": "json-server --watch db.json",
            "server:production": "npm run build && npm start",
            "server:development": "nodemon --config nodemon.json",
            "start": "node -r module-alias/register ./dist --env=production"
        },`