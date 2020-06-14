
const { combineResolvers } = require('graphql-resolvers');
const { ApolloError, AuthenticationError } = require('apollo-server-express');
const DataLoader = require('dataloader');

const ComponentCategory = require('./../database/schema/category');
const Component = require('./../database/schema/component');
const { isAuthenticated, isAdmin } = require('./middlewares')

const { uploadToS3 } = require('../helper/uploader');

module.exports = {
  Query: {
    components: async ()=>{
        return await Component.find({}).sort({'category': -1});
    },
    componentsForSidebar: async ()=>{
      let categories = await ComponentCategory.find();
      let menuCategories = await Promise.all(categories.map(async (category) => {
        let components = await Component.find({ category: category.id });
        return {...category._doc, components};
      }));
      return menuCategories;
    }
  },
  Mutation:{
    createCategory: combineResolvers(isAuthenticated,isAdmin, async (_, { input })=>{
      try{
        const category = await ComponentCategory.findOne({ name : input.name });
        if(category){
          throw new ApolloError('Category Name Already In Use','DUPLICATE');
        }
        const newCategory = new ComponentCategory({...input});
        return await newCategory.save();
      } catch(error){
        throw error;
      }
    }),
    createComponent: combineResolvers(isAuthenticated,isAdmin, async (_, { input })=>{
      const category = await ComponentCategory.findOne({ _id : input.category });
      if(!category){
        throw new ApolloError('Category not found','NOT_FOUND');
      }
      const picture = await uploadToS3(input.thumbnail);
      const component = new Component({...input, thumbnail: picture.url});
      return await component.save();
    })
  },
  //Field Type Resolver
  Component: {
    category: async (parent) =>{
      return await ComponentCategory.findOne({ _id: parent.category });
    }
  }
}