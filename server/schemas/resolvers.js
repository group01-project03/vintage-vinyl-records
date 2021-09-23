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
        checkout: async (parent, args, context) => {
            const order=new Order({records:args.records});
            console.log(order);
            const { records } = await order.populate('records').execPopulate();
            // const url = new URL(context.headers.referer).origin;
            
            const line_items = [];

            for (let i = 0; i < records.length; i++) {
              // generate record id
              const record = await stripe.records.create({
                name: records[i].name,
                description: records[i].description,
                // images: [`${url}/images/${records[i].image}`]
              });
            
              // generate price id using the product id
              const price = await stripe.prices.create({
                record: record.id,
                unit_amount: records[i].price * 100,
                currency: 'cad',
              });
            
              // add price id to the line items array
              line_items.push({
                price: price.id,
                quantity: 1
              });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
              });
              
              return { session: session.id };
          }
    },
    Mutation: {
        addUser: async(parent, args)=>{
            const user = await User.create(args);
            const token = signToken(user);

            return{token, user};
        },
        addOrder: async (parent, { records }, context) => {
            if (context.user) {
              const order = new Order({ records });
      
              await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      
              return order;
            }
      
            throw new AuthenticationError('Not logged in');
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
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('Not logged in');
          },
        updateRecord: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
      
            return await Record.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
          }
    }
};

module.exports=resolvers;