const resolvers = {
    Query:{
        me:{
            helloWorld:()=> {
                return 'Hello world!';
            }
        }
    }
};

module.exports=resolvers;