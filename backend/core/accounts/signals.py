from django.db.models.signals import post_save
from django.dispatch import receiver
from members.models import Member
from .models import CustomUser


@receiver(post_save, sender=CustomUser)
def create_member_profile(sender, instance, created, **kwargs):
    if created:
        Member.objects.create(user=instance)


@receiver(post_save, sender=CustomUser)
def save_member_profile(sender, instance, **kwargs):
    instance.member.save()
