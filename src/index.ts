import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

async function init(){
    const app = express()

const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

const gqlServer = new ApolloServer({
  typeDefs: ` type Query { hello: String! } `,
  resolvers:{
    Query :{
        hello: () => 'Hello, world!'
    }
  },
});

await gqlServer.start();

app.use('/graphql', expressMiddleware(gqlServer));

app.get('/', (req, res) => {
    res.json({ message: 'Server is started' });
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
}
init();