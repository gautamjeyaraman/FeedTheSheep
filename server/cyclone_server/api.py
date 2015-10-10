import json
from cyclone_server import config
from twisted.internet import defer
from cyclone_server.db.mixin import DatabaseMixin
import cyclone
import random

class APIBase(cyclone.web.RequestHandler, DatabaseMixin):

    def get_config(self):
        path = config.config_file_path()
        settings = config.parse_config(path)
        return settings

    def prepare(self):
        self.set_header("Content-Type", "application/json")
        self.set_header("Cache-Control", "no-cache")

    def write_json(self, d):
        self.set_header("Content-Type", "application/json")
        return self.write(json.dumps(d, sort_keys=True, indent=4))


class SendPathHandler(APIBase):

    @defer.inlineCallbacks
    def post(self):
        data = json.loads(self.get_argument["data"])

        path = data["path"]
        layout_id = data["layout_id"]
        distance = len(path)
        area = data["area"]

        path = yield self.database.insert_path(path, layout_id, distance, area)

        defer.returnValue(self.write_json({'success': True}))


class LayoutGenerator(APIBase):

    #@defer.inlineCallbacks
    def get(self, number):
        number = int(number)
        for i in range(0, number):
            shape = random.choice(["circle", "box"])
            pass






