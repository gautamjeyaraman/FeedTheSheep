from cyclone.web import URLSpec
from cyclone_server import views
from cyclone_server import api


def munge_route_list(rl):
    new_l = []
    for item in rl:
        if isinstance(item, list):
            new_l.extend(munge_route_list(item))
        else:
            new_l.append(item)
    return new_l


routes = munge_route_list([
    URLSpec(r'/', views.IndexHandler, name='home'),
    URLSpec(r'/stats_home', views.StatsHomeHandler, name='stats_home'),
    URLSpec(r'/stats/(.*)', views.StatsHandler, name="stats"),
    
    URLSpec(r'/api/latest/path/(.*)', api.PathHandler),
    URLSpec(r'/api/latest/getlayout/(.*)', api.LayoutHandler),
    URLSpec(r'/api/latest/genlayout/(.*)', api.LayoutGenerator),
    URLSpec(r'/api/latest/rmlayout', api.LayoutKiller),
])
