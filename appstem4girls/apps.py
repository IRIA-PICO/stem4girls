from django.apps import AppConfig


class Appstem4GirlsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'appstem4girls'

    def ready(self):
        from load_initial_data import load_data_if_empty
        load_data_if_empty()
