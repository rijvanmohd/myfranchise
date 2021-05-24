''' Abstratc Model for Creation and Updation Time '''
from django.db import models
import time
from django.utils import timezone

class TimeStampedModel(models.Model):
    created_on = models.DateTimeField(blank=True, editable=False)
    updated_on = models.DateTimeField(blank=True, editable=False)

    def save(self, touch=True, update_fields=None, *args, **kwargs):
        now = timezone.now()

        if self.created_on is None:
            self.created_on = now

        if touch:
            self.updated_on = now

            if update_fields:
                if "updated_on" not in update_fields:
                    update_fields.append("updated_on")

        return super(TimeStampedModel, self).save(
            update_fields=update_fields, *args, **kwargs)

    @property
    def timestamp(self):
        '''
        Returns the timestamp at microseconds resolution
        '''
        return '%d' % int(time.mktime(self.created_on.timetuple()))

    class Meta:
        abstract = True
        ordering = ("-created_on",)
