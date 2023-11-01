from flask_restful import Resource
from config import app,api
from models import db,BlogPost,Author,User
from flask import make_response,jsonify
class Home(Resource):
   def get(self):
        response = make_response(jsonify({"message":"Welcome to BlogBloom API"}),200)
        return response
api.add_resource(Home,"/")
class BlogPostResource(Resource):
    def get(self):
        blogs = BlogPost.query.all()
        blog_dictionary = [{
            "id":blog.id,
            "title":blog.title,
            "content":blog.content,
            "image_url":blog.image_url,
            "category":blog.category
        }for blog in blogs]
        response =  make_response(jsonify(blog_dictionary),200)
        return response
api.add_resource(BlogPostResource,"/blogs")
class AuthorsResource(Resource):
    def get(self):
        authors = Author.query.all()
        authors_dict = [{
            "id":author.id,
            "username":author.username,
            "email":author.email,
            "role":author.role
        }for author in authors]
        response = make_response(jsonify(authors_dict),200)
        return response
api.add_resource(AuthorsResource,"/authors")
class UsersResource(Resource):
    def get(self):
        users= User.query.all()
        user_dict =[{
            "id":user.id,
            "username":user.username,
            "email":user.email,
            "password":user.password
        }for user in users]
        response = make_response(jsonify(user_dict),200)
        return response
api.add_resource(UsersResource,"/users")
        
if __name__ == "__main__":
    app.run(debug=True,port=5555)