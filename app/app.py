from flask_restful import Resource
from config import app,api
from models import db,BlogPost,Author,User
from flask import make_response,jsonify,request
from random import randint
class Home(Resource):
   def get(self):
        response = make_response(jsonify({"message":"Welcome to BlogBloom API"}),200)
        return response
api.add_resource(Home,"/")
class BlogPostResource(Resource):
    def get(self):
        blog_posts = BlogPost.query.all()
        posts_data = [
            {
                'id': post.id,
                'title': post.title,
                'created_at': post.created_at,
                'content': post.content,
                "image_url":post.image_url
            }
            for post in blog_posts
        ]
        return jsonify(posts_data)
    def post(self):
        data = request.get_json()
        title = data["title"]
        content = data["content"]
        category = data["category"]
        image_url=data['imageUrl']

        if not title or not content or not category:
            return {'error': 'Title, content, and category are required fields'}, 400
        blog = BlogPost(title=title,content=content,category=category,image_url=image_url,author_id=randint(1,10))
        if blog:
            db.session.add(blog)
            db.session.commit()
            return make_response(jsonify({'message': 'Blog post saved successfully'}), 201)
        else:
            return make_response(jsonify({'error':'Failed to save the blog post to the database'}, 500))          
api.add_resource(BlogPostResource,"/blogs")

class BlogPostResourceById(Resource):
    def get(self, id):
        post = BlogPost.query.filter_by(id=id).first()
        posts_data = {
            'id': post.id,
            'title': post.title,
            'created_at': post.created_at,
            'content': post.content,
            "image_url":post.image_url
        }
        return jsonify(posts_data)
    def delete(self,id):
        post = BlogPost.query.filter_by(id=id).first()
        if post is not None:
            db.session.delete(post)
            db.session.commit()
            return make_response(jsonify({'message': 'Blog post deleted successfully'}),204)
        return make_response(jsonify({"error": "Blog post not found"}, 404))
api.add_resource(BlogPostResourceById,"/blogs/<int:id>")

# class AuthorsResource(Resource):
#     def get(self):
#         authors = Author.query.all()
#         authors_dict = [{
#             "id":author.id,
#             "username":author.username,
#             "email":author.email,
#             "role":author.role
#         }for author in authors]
#         response = make_response(jsonify(authors_dict),200)
#         return response
# api.add_resource(AuthorsResource,"/authors")
# class UsersResource(Resource):
#     def get(self):
#         users= User.query.all()
#         user_dict =[{
#             "id":user.id,
#             "username":user.username,
#             "email":user.email,
#             "password":user.password
#         }for user in users]
#         response = make_response(jsonify(user_dict),200)
#         return response
# api.add_resource(UsersResource,"/users")

        
if __name__ == "__main__":
    app.run(debug=True,port=5555)