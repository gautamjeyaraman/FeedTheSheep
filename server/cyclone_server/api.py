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
        distance = data["distance"]
        area = data["area"]

        path = yield self.database.insert_path(path, layout_id, distance, area)

        defer.returnValue(self.write_json({'success': True}))


class LayoutHandler(APIBase):

    @defer.inlineCallbacks
    def get(self, number):
        layout = yield self.database.get_layout(number)
        layout = layout[0][0]
        print layout
        defer.returnValue(self.write_json({"layout": layout}))


class LayoutGenerator(APIBase):

    @defer.inlineCallbacks
    def get(self, number):
        number = int(number)
        for i in range(0, number):
            no_of_obs = random.randint(3,5)
            layout = []
            for j in range(0, no_of_obs):
                shape = random.choice(["circle", "box"])
                if shape == "circle":
                    circle = { "radius": random.randint(10, 100)}
                    circle["center"] = {"x": random.randint(10+circle["radius"], 890-circle["radius"]),
                                        "y": random.randint(10+circle["radius"], 490-circle["radius"])}
                    layout.append({"circle": circle})
                if shape == "box":
                    box = {"length": random.randint(10, 200),
                           "width": random.randint(10, 200)}
                    box["x"] = random.randint(0, 900-box["width"])
                    box["y"] = random.randint(0, 500-box["length"])
                    layout.append({"box": box})
            success = yield self.database.add_layout(layout)
        defer.returnValue({"success": success})


class LayoutKiller(APIBase):

    @defer.inlineCallbacks
    def get(self):
        success = yield self.database.rm_all_layout()
        defer.returnValue({"success": success})








