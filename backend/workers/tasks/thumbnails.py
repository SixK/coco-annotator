from database import ImageModel
from celery import shared_task

@shared_task(
    name="expensive_api_call",
    bind=True,
    acks_late=True,)
# acks_late seem's necessary to avoid task timeout
def thumbnail_generate_single_image(self, image_id):
    image = ImageModel.objects(id=image_id).first()
    image.thumbnail()
    image.flag_thumbnail(flag=False)


__all__ = ["thumbnail_generate_single_image"]
