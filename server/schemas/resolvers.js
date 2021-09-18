const { AuthenticationError } = require("apollo-server-errors");
const User = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query:{
        me:async(parent,args,context)=>{
            if(context.user){
                const userData = await User.findOne({id:context.user._id})
                .populate('records');

            return userData;
            }
            throw new AuthenticationError('Not logged in')
        }
    },
    Mutation: {
        addUser: async(parent, args)=>{
            const user = await User.create(args);
            const token = signToken(user);

            return{token, user};
        },
        login: async (parent, {email,password})=>{
            const user=await User.findOne({email});

            if(!user){
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw=await user.isCorrectPassword(password);
            console.log(correctPw);

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return {token, user};
        }
    }
};

module.exports=resolvers;