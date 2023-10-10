**Project installation**
npm i --save express express-graphql graphql lodash ramda
npm i -- save lodash

**Typescript**
npm install  -D typescript ts-node-dev @types/express
npm i --save-dev @types/ramda
<!-- cors: @types/cors -->

**Generate tsconfig file**
npx tsc --init

**Nodemon doesn't recognize typescript paths @schema**
1. install npm install --save-dev nodemon ts-node
2. npm install --save-dev tsconfig-paths ( library to handle module paths )
3. add a nodemon file 
    `
    {
        "watch": [
            "**/*.ts"
        ],
        "ext": "ts,json",
        "ignore": ["src/**/*.spec.ts"],
        "exec": "ts-node -r tsconfig-paths/register src/server.ts",
        "env": {
            "NODE_ENV": "development"
        }
    }`
4. add this script to your package.json file 
   1. development env is set by default in the nodemon.json file 
       `"scripts": {
           "start": "NODE_ENV=production ts-node -r tsconfig-paths/register src/server.ts",
           "dev": "nodemon server"
       },`
   2. Setting production env on prod 
       `"scripts": {
           "start": "NODE_ENV=production ts-node -r tsconfig-paths/register src/server.ts"
       }`
5. tsConfig file ( at least must have configuration )
   `{
      "compilerOptions": {
        "rootDir": "./src",
        "baseUrl": "./src",
        "strict": true
      }
    }`
