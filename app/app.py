from flask_restful import Resource
from config import app,api,bcrypt
from models import db,BlogPost,User
from flask import make_response,jsonify,request
from random import randint
class Home(Resource):
   def get(self):
        response = make_response(jsonify({"message":"Welcome to BlogBloom API"}),200)
        return response
api.add_resource(Home,"/")
class BlogPostResource(Resource):
    def get(self):
        page = request.args.get('page', type=int, default=1)
        per_page = request.args.get('per_page', type=int, default=10)
         # Calculate the offset based on the page and per_page values
        offset = (page - 1) * per_page
        blog_posts = BlogPost.query.order_by(BlogPost.created_at.desc()).offset(offset).limit(per_page).all()
        if blog_posts:
            posts_data = [
                {
                    'id': post.id,
                    'title': post.title,
                    'created_at': post.created_at,
<<<<<<< HEAD
                    "category": post.category,
=======
                    "category ": post.category,
>>>>>>> 0cfc99f9f8c967423bf8c15394939a1d342c1dfd
                    'content': post.content,
                    "image_url":post.image_url
                }
                for post in blog_posts
            ]
            return jsonify(posts_data)
        else:
            return jsonify({"message": "No blog posts found"})

    def post(self):
        data = request.get_json()
        title = data["title"]
        content = data["content"]
        category = data["category"]
        image_url=data['imageUrl']

        if not title or not content or not category:
            return {'error': 'Title, content, and category are required fields'}, 400
        blog = BlogPost(title=title,content=content,category=category,image_url=image_url,user_id=randint(1,10))
        if blog:
            db.session.add(blog)
            db.session.commit()
            return make_response(jsonify({'message': 'Blog post saved successfully'}), 201)
        else:
            return make_response(jsonify({'error':'Failed to save the blog post to the database'}, 500))          
api.add_resource(BlogPostResource,"/blogs")
@app.route('/total_posts', methods=['GET'])
def get_total_posts():
    total = BlogPost.query.count()
    return jsonify({"total": total})

class BlogPostResourceById(Resource):
    def get(self, id):
        post = BlogPost.query.filter_by(id=id).first()
        posts_data = {
            'id': post.id,
            'title': post.title,
            'created_at': post.created_at,
            "category": post.category,
            'content': post.content,
            "image_url":post.image_url
        }
        return jsonify(posts_data)
    def put(self, id):
        post = BlogPost.query.filter_by(id=id).first()
        
        if not post:
            return jsonify({"message": "Blog post not found"}), 404

        data = request.get_json()
        
        if 'title' in data:
            post.title = data['title']
        if 'category' in data:
            post.category = data['category']
        if 'content' in data:
            post.content = data['content']
        if 'image_url' in data:
            post.image_url = data['image_url']

        db.session.commit()

        return jsonify({"message": "Blog post updated successfully"})
    def delete(self,id):
        post = BlogPost.query.filter_by(id=id).first()
        if post is not None:
            db.session.delete(post)
            db.session.commit()
            return make_response(jsonify({'message': 'Blog post deleted successfully'}),204)
        return make_response(jsonify({"error": "Blog post not found"}, 404))
api.add_resource(BlogPostResourceById,"/blogs/<int:id>")
class RegistrationResource(Resource):
    def post(self):
        data = request.get_json()
        username = data["username"]
        email=data["email"]
        password = data["password"]
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        if not username or not email or not password:
            return jsonify({"message": "All fields must be filled"}), 400
        user_exists = User.query.filter(User.username == username).first() is not None
        if user_exists:
            return jsonify({"error":"User already exists"})
        user = User(username=username,email=email,_password_hash=hashed_password)
        db.session.add(user)
        db.session.commit()
        response = make_response(jsonify({"message":"Registration successful"}),201)
        return response
api.add_resource(RegistrationResource,"/registration")
class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data["email"]
        password = data["password"]
        user = User.query.filter(User.email == email).first()
        if user and user.authenticate(password):
            return make_response(jsonify({"message": "Login successful"}),201)
        return make_response(jsonify({"error":"Incorrect password"}),401)
api.add_resource(LoginResource,"/login")
if __name__ == "__main__":
    app.run(debug=True,port=5555)