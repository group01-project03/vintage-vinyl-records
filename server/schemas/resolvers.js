const { AuthenticationError } = require("apollo-server-errors");
const {User, Record, Genre, Order} = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query:{
        genres: async()=>{
            return await Genre.find();
        },
        records: async(parent, {genre, title})=>{
            const params={};

            if(genre){
                params.genre=genre;
            }

            if(title){
                params.title = {
                    $regex: title
                };
            }

            return await Record.find(params).populate('genre');
        },
        record: async(parent,{_id})=>{
            return await Record.findById(_id).populate('genre');
        },
        me:async(parent,args,context)=>{
            if(context.user){
                const userData = await User.findOne({id:context.user._id})
                .populate({
                    path:'orders.records',
                    populate:'genre'
                });

            return userData;
            }
            throw new AuthenticationError('Not logged in')
        },
        order: async (parent, {_id}, context)=>{
            if(context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.records',
                    populate:'genre'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged in');
        },
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

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return {token, user};
        }
    }
};

module.exports=resolvers;