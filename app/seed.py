from models import db,BlogPost,User,Author
from random import randint,choice
from config import app


from faker import Faker
fake =Faker()
with app.app_context():
    # BlogPost.query.delete()
    Author.query.delete()
    User.query.delete()
    print("Seeding blogs")
    category =[
        "Food blogs",
        "Travel blogs",
        "Health and fitness blogs",
        "Lifestyle blogs",
        "Fashion and beauty blogs",
        "DIY craft blogs",
        "Parenting blogs",
        "Business blogs",
        "Personal finance blogs",
        "Sports blogs"
    ]
    image_urls = [
        "https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/3194523/pexels-photo-3194523.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4240511/pexels-photo-4240511.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/5076528/pexels-photo-5076528.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/4911253/pexels-photo-4911253.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://www.shutterstock.com/image-vector/blogging-icon-vector-260nw-754633009.jpg",
        "https://img.freepik.com/free-vector/organic-flat-blog-post-illustration-with-people_23-2148955260.jpg?size=626&ext=jpg",
        "https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg?size=626&ext=jpg",
        "https://img.freepik.com/premium-vector/social-media-concept-with-chat-bubbles-emotions-email-notification-vector-illustration_627993-409.jpg?size=626&ext=jpg",
        "https://img.freepik.com/free-photo/close-up-photo-shocked-retro-girl-with-afro-hairstyle-holding-retro-phone_171337-8693.jpg?size=626&ext=jpg",
        "https://img.freepik.com/free-photo/smiling-man-surfing-net-laptop-while-drinking-coffee-bar_637285-2056.jpg?size=626&ext=jpg",
        "https://img.freepik.com/free-photo/toy-bricks-table_144627-48267.jpg?size=626&ext=jpg"

    ]
    for _ in range(12):
        blog = BlogPost(title =fake.sentence(),content=fake.text(),author_id=randint(1,40),category=choice(category),image_url = choice(image_urls))
        db.session.add(blog)
    db.session.commit()
    print("Done Seeding Blogs")
    # roles = [
    #     "Writter",
    #     "Editor",
    #     "Publisher"
    #     "Contributor",
    #     "Administrator"
    # ]
    # print("Seeding Authors")
    # for _ in range(40):
    #     author = Author(username= fake.name(),email=fake.email(),role =fake.job())
    #     db.session.add(author)
    # db.session.commit()
    # print("Done Seeding Authors")

    # print("Seeding users")
    # for _ in range(40):
    #     user = User(username =fake.name(),email=fake.email(),password =fake.password())
    #     db.session.add(user)
    # db.session.commit()
    # print("Done Seeding Users")