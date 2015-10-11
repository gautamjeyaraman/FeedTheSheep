import cyclone.web
from twisted.internet import defer
from cyclone_server.db.mixin import DatabaseMixin


class IndexHandler(cyclone.web.RequestHandler, DatabaseMixin):
    @defer.inlineCallbacks
    def get(self):
    	_ids = yield self.database.get_all_layouts()
        self.render("index.html", _ids=_ids)


class StatsHomeHandler(cyclone.web.RequestHandler, DatabaseMixin):
    @defer.inlineCallbacks
    def get(self):
    	_ids = yield self.database.get_all_layouts()
        self.render("stats_home.html", _ids=_ids)


        
class StatsHandler(cyclone.web.RequestHandler):

    def get(self, number):
        self.render("stats.html", number=number)
