import cyclone.web

class IndexHandler(cyclone.web.RequestHandler):

    def get(self):
        self.render("index.html")
        
        
class StatsHandler(cyclone.web.RequestHandler):

    def get(self):
        self.render("stats.html")
